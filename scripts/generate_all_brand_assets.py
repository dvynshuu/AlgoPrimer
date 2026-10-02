import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PROJECT_ROOT = r"C:\CodeBase\Projects\placement-prep"
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
APP_DIR = os.path.join(PROJECT_ROOT, "src", "app")

SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E131F"/>
      <stop offset="100%" stop-color="#070A10"/>
    </linearGradient>

    <linearGradient id="leftPillarGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="60%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#7DD3FC"/>
    </linearGradient>

    <linearGradient id="rightPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>

    <radialGradient id="ambientGlow" cx="50%" cy="52%" r="40%">
      <stop offset="0%" stop-color="rgba(56, 189, 248, 0.28)"/>
      <stop offset="100%" stop-color="rgba(56, 189, 248, 0)"/>
    </radialGradient>
  </defs>

  <!-- Squircle Canvas -->
  <rect width="100" height="100" rx="22" fill="url(#bgGrad)"/>
  <rect x="1" y="1" width="98" height="98" rx="21" fill="none" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Radial Core Glow -->
  <circle cx="50" cy="52" r="32" fill="url(#ambientGlow)"/>

  <!-- The "A" Glyph -->
  <!-- Left Ascending Pillar -->
  <polygon points="22,80 34.5,80 50,36 50,18 43,18 22,80" fill="url(#leftPillarGrad)"/>

  <!-- Right Descending Pillar -->
  <polygon points="50,18 57,18 78,80 65.5,80 50,36 50,18" fill="url(#rightPillarGrad)"/>

  <!-- Prismatic Apex Cap -->
  <polygon points="43,18 57,18 50,27.5" fill="#BAE6FD"/>

  <!-- Slanted Lintel Crossbar -->
  <polygon points="34.5,52 65.5,52 69,60 31,60" fill="#FFFFFF"/>

  <!-- Negative Space Prompt Chevron &gt; -->
  <polygon points="45,53.5 51.5,56 45,58.5 47.5,58.5 53.5,56 47.5,53.5" fill="#090D16"/>

  <!-- Terminal Cursor Pulse -->
  <polygon points="56,57.5 59.5,57.5 59.5,58.8 56,58.8" fill="#38BDF8"/>
</svg>
'''

SVG_WITH_TEXT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" width="360" height="80">
  <defs>
    <linearGradient id="navLeftPillar" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="60%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#7DD3FC"/>
    </linearGradient>
    <linearGradient id="navRightPillar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <radialGradient id="navAmbientGlow" cx="50%" cy="52%" r="40%">
      <stop offset="0%" stop-color="rgba(56, 189, 248, 0.28)"/>
      <stop offset="100%" stop-color="rgba(56, 189, 248, 0)"/>
    </radialGradient>
  </defs>

  <!-- Left Icon Mark -->
  <g transform="translate(8, 8) scale(0.64)">
    <rect width="100" height="100" rx="22" fill="#0A0E17"/>
    <rect x="1" y="1" width="98" height="98" rx="21" fill="none" stroke="#1E293B" stroke-width="1.5"/>
    <circle cx="50" cy="52" r="32" fill="url(#navAmbientGlow)"/>
    <polygon points="22,80 34.5,80 50,36 50,18 43,18 22,80" fill="url(#navLeftPillar)"/>
    <polygon points="50,18 57,18 78,80 65.5,80 50,36 50,18" fill="url(#navRightPillar)"/>
    <polygon points="43,18 57,18 50,27.5" fill="#BAE6FD"/>
    <polygon points="34.5,52 65.5,52 69,60 31,60" fill="#FFFFFF"/>
    <polygon points="45,53.5 51.5,56 45,58.5 47.5,58.5 53.5,56 47.5,53.5" fill="#090D16"/>
    <polygon points="56,57.5 59.5,57.5 59.5,58.8 56,58.8" fill="#38BDF8"/>
  </g>

  <!-- Wordmark AlgoPrimer -->
  <text x="86" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.02em" fill="#F8FAFC">Algo<tspan fill="#38BDF8">Primer</tspan></text>

  <!-- Subtitle Tagline -->
  <text x="87" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" letter-spacing="0.14em" fill="#94A3B8">PROGRAMMING &amp; DSA PREPARATION</text>
</svg>
'''

def render_high_res_mark(size):
    # Render at 4x scale for super-sampled antialiasing
    super_size = max(size * 4, 1024)
    s = super_size / 100.0
    img = Image.new("RGBA", (super_size, super_size), (0, 0, 0, 0))
    
    # Outer squircle
    corner_radius = int(22 * s)
    margin = int(1 * s)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle(
        [(margin, margin), (super_size - margin, super_size - margin)],
        radius=corner_radius,
        fill=(9, 13, 22, 255) # #090D16
    )
    draw.rounded_rectangle(
        [(margin, margin), (super_size - margin, super_size - margin)],
        radius=corner_radius,
        outline=(30, 41, 59, 255), # #1E293B
        width=max(int(1.75 * s), 2)
    )
    
    # Soft ambient glow
    glow_size = int(66 * s)
    glow_img = Image.new("RGBA", (super_size, super_size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    cx, cy = super_size // 2, int(52 * s)
    glow_draw.ellipse(
        [(cx - glow_size // 2, cy - glow_size // 2), (cx + glow_size // 2, cy + glow_size // 2)],
        fill=(56, 189, 248, 55)
    )
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=int(18 * s)))
    img = Image.alpha_composite(img, glow_img)
    draw = ImageDraw.Draw(img)
    
    # Left Pillar
    draw.polygon([
        (22 * s, 80 * s),
        (34.5 * s, 80 * s),
        (50 * s, 36 * s),
        (50 * s, 18 * s),
        (43 * s, 18 * s),
        (22 * s, 80 * s)
    ], fill=(56, 189, 248, 255))
    
    # Right Pillar
    draw.polygon([
        (50 * s, 18 * s),
        (57 * s, 18 * s),
        (78 * s, 80 * s),
        (65.5 * s, 80 * s),
        (50 * s, 36 * s),
        (50 * s, 18 * s)
    ], fill=(2, 132, 199, 255))
    
    # Apex Cap
    draw.polygon([
        (43 * s, 18 * s),
        (57 * s, 18 * s),
        (50 * s, 27.5 * s)
    ], fill=(186, 230, 253, 255))
    
    # Slanted Lintel Crossbar
    draw.polygon([
        (34.5 * s, 52 * s),
        (65.5 * s, 52 * s),
        (69 * s, 60 * s),
        (31 * s, 60 * s),
    ], fill=(255, 255, 255, 255))
    
    # Negative Space Prompt Chevron ">"
    draw.polygon([
        (45 * s, 53.5 * s),
        (51.5 * s, 56 * s),
        (45 * s, 58.5 * s),
        (47.5 * s, 58.5 * s),
        (53.5 * s, 56 * s),
        (47.5 * s, 53.5 * s),
    ], fill=(9, 13, 22, 255))
    
    # Terminal Cursor Pulse
    draw.polygon([
        (56 * s, 57.5 * s),
        (59.5 * s, 57.5 * s),
        (59.5 * s, 58.8 * s),
        (56 * s, 58.8 * s),
    ], fill=(56, 189, 248, 255))
    
    return img.resize((size, size), Image.Resampling.LANCZOS)

def generate_og_image():
    # 1200 x 630 High-Resolution Open Graph Social Preview
    w, h = 1200, 630
    img = Image.new("RGBA", (w, h), (9, 13, 22, 255))
    draw = ImageDraw.Draw(img)
    
    # Subtle background grid & radial lighting
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(100, -100), (700, 500)], fill=(56, 189, 248, 28))
    glow_draw.ellipse([(700, 200), (1300, 800)], fill=(2, 132, 199, 18))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=60))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)
    
    # Subtle card container border
    draw.rectangle([(24, 24), (w - 24, h - 24)], outline=(30, 41, 59, 255), width=1)
    
    # Paste 220x220 AlgoPrimer mark on the left
    mark = render_high_res_mark(220)
    img.paste(mark, (80, 180), mark)
    
    # Typography: Text drawn with standard clean fallback
    # Title
    font_large = None
    font_med = None
    font_small = None
    try:
        font_large = ImageFont.truetype("arial.ttf", 64)
        font_med = ImageFont.truetype("arial.ttf", 28)
        font_small = ImageFont.truetype("arial.ttf", 20)
    except:
        pass
        
    text_x = 340
    # "AlgoPrimer"
    draw.text((text_x, 180), "AlgoPrimer", fill=(248, 250, 252, 255), font=font_large)
    
    # Tagline
    draw.text(
        (text_x, 260),
        "Programming, DSA & Coding Interview Preparation",
        fill=(56, 189, 248, 255),
        font=font_med
    )
    
    # Description
    draw.text(
        (text_x, 308),
        "Teach programming and problem solving from first principles,\nthen progressively move users toward technical interview readiness.",
        fill=(148, 163, 184, 255),
        font=font_small
    )
    
    # Feature Badges
    badges = [
        "108 Language Lessons",
        "20-Topic DSA Roadmap",
        "65 Core Problems",
        "Java • C++ • Python • JS",
    ]
    badge_x = text_x
    badge_y = 390
    for b in badges:
        # Approximate width
        bw = len(b) * 11 + 24
        draw.rounded_rectangle([(badge_x, badge_y), (badge_x + bw, badge_y + 36)], radius=6, fill=(15, 23, 42, 255), outline=(51, 65, 85, 255))
        draw.text((badge_x + 12, badge_y + 8), b, fill=(226, 232, 240, 255), font=font_small)
        badge_x += bw + 14
        
    return img.convert("RGB")

def main():
    print("Writing SVG assets...")
    # 1. SVGs
    with open(os.path.join(APP_DIR, "icon.svg"), "w", encoding="utf-8") as f:
        f.write(SVG_CONTENT)
    with open(os.path.join(PUBLIC_DIR, "logo.svg"), "w", encoding="utf-8") as f:
        f.write(SVG_CONTENT)
    with open(os.path.join(PUBLIC_DIR, "logo-mark.svg"), "w", encoding="utf-8") as f:
        f.write(SVG_CONTENT)
    with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(SVG_CONTENT)
    with open(os.path.join(PUBLIC_DIR, "logo-with-text.svg"), "w", encoding="utf-8") as f:
        f.write(SVG_WITH_TEXT)

    print("Generating all PNG icon sizes...")
    sizes = [
        (16, "favicon-16x16.png"),
        (32, "favicon-32x32.png"),
        (48, "favicon-48x48.png"),
        (64, "icon-64x64.png"),
        (96, "icon-96x96.png"),
        (128, "icon-128x128.png"),
        (180, "apple-icon.png"),
        (180, "apple-touch-icon.png"),
        (192, "icon-192x192.png"),
        (256, "icon-256x256.png"),
        (384, "icon-384x384.png"),
        (512, "icon-512x512.png"),
    ]

    png_images = {}
    for sz, filename in sizes:
        img = render_high_res_mark(sz)
        out_path = os.path.join(PUBLIC_DIR, filename)
        img.save(out_path, format="PNG")
        png_images[sz] = img
        print(f"Generated {filename} ({sz}x{sz})")

    # Generate multi-resolution favicon.ico
    print("Generating favicon.ico...")
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    png_images[32].save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Generated favicon.ico with 16, 32, 48 resolutions.")

    # Generate Open Graph image
    print("Generating og-image.png (1200x630)...")
    og = generate_og_image()
    og.save(os.path.join(PUBLIC_DIR, "og-image.png"), format="PNG")
    print("Generated og-image.png successfully!")

if __name__ == "__main__":
    main()
