export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { 
      name, 
      email, 
      projectType, 
      budget, 
      details, 
      honeypot,
      'cf-turnstile-response': turnstileResponse
    } = data;

    // 1. Honeypot check
    if (honeypot) {
      // Silently reject bots that fill out the hidden honeypot field
      return new Response(JSON.stringify({ success: true, message: 'Message sent.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Validate required fields
    if (!name || !email || !details) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Optional: Verify Turnstile if SECRET is configured
    if (env.TURNSTILE_SECRET_KEY && turnstileResponse) {
      const formData = new FormData();
      formData.append('secret', env.TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileResponse);
      formData.append('remoteip', request.headers.get('CF-Connecting-IP') || '');

      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const verifyResponse = await fetch(verifyUrl, {
        body: formData,
        method: 'POST',
      });
      const verifyJson = await verifyResponse.json();

      if (!verifyJson.success) {
        return new Response(JSON.stringify({ success: false, error: 'Captcha verification failed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 4. Send via Resend (Requires RESEND_API_KEY in environment variables)
    const RESEND_KEY = env.RESEND_API_KEY;
    
    if (RESEND_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'triadesignteam@gmail.com',
          subject: `New Inquiry from ${name} - ${projectType || 'General'}`,
          html: `
            <h3>New Inquiry</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Details:</strong><br/>${details.replace(/\\n/g, '<br/>')}</p>
          `
        })
      });

      if (!resendResponse.ok) {
        throw new Error('Failed to send email via Resend');
      }
    }

    // 5. Success Response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
