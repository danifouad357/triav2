const fs = require('fs');
let code = fs.readFileSync('src/components/sections/CinematicSequence.tsx', 'utf8');

const animatePresenceStart = code.indexOf('<AnimatePresence>\n        {showDevPanel');
if (animatePresenceStart !== -1) {
    const buttonEnd = code.indexOf('</button>\n      )}');
    if (buttonEnd !== -1) {
        code = code.substring(0, animatePresenceStart) + code.substring(buttonEnd + 19);
    }
}

fs.writeFileSync('src/components/sections/CinematicSequence.tsx', code);
