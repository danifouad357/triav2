import re

with open('src/components/webgl/ChromaHomographyRenderer.tsx', 'r') as f:
    content = f.read()

# Fix the wrapper
content = re.sub(
    r'<div className="relative w-full h-full overflow-hidden">',
    '<div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>',
    content
)

# Fix the videos
content = re.sub(
    r'className="hidden"',
    'style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}',
    content
)

new_canvas = """      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          left: 0,
          top: "-70px",
          width: "100%",
          height: "calc(100% + 140px)",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />"""

content = re.sub(r'<canvas[\s\S]*?/>', new_canvas, content)

with open('src/components/webgl/ChromaHomographyRenderer.tsx', 'w') as f:
    f.write(content)
