import re

with open('src/components/webgl/ChromaHomographyRenderer.tsx', 'r') as f:
    content = f.read()

# Replace the hidden styles
old_style = 'style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}'
new_style = 'style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.0001, pointerEvents: "none", zIndex: -1 }}'

content = content.replace(old_style, new_style)

with open('src/components/webgl/ChromaHomographyRenderer.tsx', 'w') as f:
    f.write(content)
