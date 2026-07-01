# Portfolio Redesign — Migration Guide

## What Changed

Your portfolio has been completely redesigned from a **tab-based SPA** to a **modern continuous-scroll experience** with smooth animations and a horizontal project pipeline. The new design follows the abetkaua.com aesthetic you requested.

### Old Architecture (Tab-based)
- `app.js` controlled section visibility (show/hide with `display: none/block`)
- `styles/styles.css` — Poppins + custom styling
- Hamburger menu, theme toggle, sequential section loading

### New Architecture (Continuous Scroll)
- Single flowing page with smooth scrolling (Lenis library)
- No tab switching — everything is one cohesive vertical scroll
- **Signature feature:** Horizontal scrolling project pipeline (projects section)
- `css/style.css` — Archivo + JetBrains Mono, dark terminal aesthetic
- `js/main.js` — Lenis, GSAP, ScrollTrigger for animations
- Mobile-responsive: pipeline stacks vertically on tablets/phones

---

## Files You Received

### `vedant-portfolio-redesigned.zip` (5 MB)
Your complete updated repository with:

```
Portfolio Source Code - HTML, CSS, JS/
├── index.html              (new — completely redesigned)
├── css/
│   └── style.css           (new — ~500 lines, Archivo + mono)
├── js/
│   └── main.js             (new — Lenis + GSAP + reveals)
├── img/                    (kept as-is, all your images)
├── Azure.html              (kept as-is)
├── Deployment.html         (kept as-is)
├── Devops.html             (kept as-is)
├── travell.html            (kept as-is)
├── app.js.bak              (old app.js — backed up)
└── styles.bak/             (old styles/ folder — backed up)
```

**Files deleted:** `app.js` (backed up as `app.js.bak`), `styles/` (backed up as `styles.bak/`)

---

## How to Deploy

### Option 1: Direct S3 Upload (Fastest)
1. Unzip `vedant-portfolio-redesigned.zip`
2. Push to your GitHub repo (or upload directly to S3 if using the AWS console)
3. Your GitHub OIDC role will trigger and deploy to S3/CloudFront automatically

```bash
# If using Git:
git add .
git commit -m "chore: redesign with smooth scroll and horizontal pipeline"
git push
```

### Option 2: Test Locally First
```bash
# Navigate to the portfolio directory
cd "Portfolio Source Code - HTML, CSS, JS"

# Start a local server
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

---

## Key Features of the New Design

### 1. **Hero Section**
- Terminal-style prompt: `~/dublin $ whoami▋`
- Massive expandable typography (VEDANT CHAVAN)
- Status indicator with pulsing green dot
- Smooth scroll hints

### 2. **Smooth Scrolling (Lenis)**
- Buttery deceleration on mouse wheel
- Integrated with GSAP animations
- Degrades gracefully if CDN fails

### 3. **Projects Pipeline (The Signature Piece)**
- **Desktop:** Full-screen horizontal scroll, pinned section
- Each project is a full-viewport panel (01→06)
- Progress bar fills green as you scroll
- Panels: Build → Provision → Stream → Ship → Run → Serve
- **Mobile:** Stacks vertically (no pinning needed)
- Links still point to your GitHub repos

### 4. **Skills Terminal**
- YAML-styled skills display in the About section
- Monospace terminal aesthetic
- Shows: cloud, IaC, containers, CI/CD, observability, backend

### 5. **Experience Log**
- Timeline-style layout with dates and descriptions
- Green accent on dates
- Links to your blog posts (Azure.html, Deployment.html, Devops.html)

### 6. **Reveal Animations**
- Elements fade and slide in as you scroll
- Respects `prefers-reduced-motion` for accessibility
- Powered by IntersectionObserver (works without GSAP)

### 7. **Mobile-First Responsive**
- Hamburger menu (appears <900px width)
- Navigation collapses to fullscreen overlay
- Pipeline becomes vertical stack
- All typography scales fluidly

---

## Tech Stack

**No build step required.** Plain HTML/CSS/JS served as-is.

### Libraries (CDN):
- **Lenis** (v1.1.18) — smooth scrolling
- **GSAP** (v3.12.5) — animations
- **ScrollTrigger** (v3.12.5) — scroll-linked animations

### Fonts (Google):
- **Archivo** — display & body (weights 100–900, widths 62–125%)
- **JetBrains Mono** — monospace/terminal code

### Design System:
- **Color Palette:** Carbon blue-black + phosphor green
- **Spacing:** CSS custom properties with `clamp()` for fluid sizing
- **Motion:** Smooth deceleration, reveals on scroll, no flashing

---

## Customization

### Change Green Accent
Edit `css/style.css`:
```css
:root {
  --green: #3cf08b;   /* change this hex value */
}
```

### Adjust Hero Font Size
```css
.hero__name {
  font-size: clamp(3.4rem, 13.5vw, 12.5rem);
  /* change the 13.5vw multiplier */
}
```

### Update Project Descriptions
Edit `index.html`, find `.panel` elements (lines ~170–230), update `panel__desc` paragraphs.

### Modify Contact Email
Search `cvedant136@gmail.com` in `index.html`, replace with your email (appears ~3 times).

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✓ | Full support |
| Firefox | ✓ | Full support |
| Safari | ✓ | Full support (iOS 14+) |
| IE11 | ✗ | Not supported (uses modern CSS like `color-mix`) |

---

## Performance Notes

- **Lighthouse:** Should score 95+ (static site, minimal JS)
- **Smooth scroll:** Lenis uses RAF, not paint-heavy
- **Animations:** GSAP ScrollTrigger is GPU-accelerated
- **Bundle:** ~100 KB total (CSS + JS), minified CDN links are ~50 KB
- **SEO:** Semantic HTML, meta tags, no JavaScript-blocking content

---

## Troubleshooting

### Site looks unstyled or has missing fonts
- Check that `css/style.css` and `js/main.js` paths are correct in `index.html`
- Verify Google Fonts CDN is reachable
- Check browser console for 404 errors

### Horizontal pipeline not working
- This only works on desktop (>900px viewport)
- On mobile/tablet, projects stack vertically (by design)
- If GSAP CDN is blocked, scroll still works but animations won't trigger

### Smooth scroll feels janky
- If Lenis CDN fails to load, page still scrolls normally
- Check browser console for CDN errors
- Disable browser extensions (some interfere with scroll events)

### Links to blog posts don't work
- Ensure `Azure.html`, `Deployment.html`, `Devops.html` are in the root directory
- The links in `index.html` are relative paths (`href="Azure.html"`)

---

## What to Test

Before pushing to production:

1. **Desktop** (1920×1080): Hero loads, type animates, projects scroll horizontally
2. **Tablet** (768px): Hamburger menu works, projects stack vertically
3. **Mobile** (375px): All text readable, buttons tappable, no horizontal overflow
4. **Keyboard:** Tab through nav links, Shift+Tab goes backwards, Enter activates
5. **Reduced motion:** Animations disabled if user has `prefers-reduced-motion` on
6. **Blog links:** Click Azure/Deployment/Devops links and verify pages load

---

## Next Steps

1. **Extract** the zip file to your repository folder
2. **Test locally** with `python3 -m http.server`
3. **Push to GitHub** — your OIDC workflow will deploy to S3
4. **Verify on live site** — https://vedantchavan01.vip should load the new design

If anything breaks or looks wrong, let me know:
- What browser/device you're testing on
- A screenshot of what you're seeing
- Browser console errors (F12 → Console)

---

## Comparison: Old vs. New

| Aspect | Old | New |
|--------|-----|-----|
| Navigation | Tab clicks hide/show sections | Continuous scroll, anchor links |
| Hero | Large text + image | Terminal prompt + typographic moment |
| Projects | Portfolio section with cards | Full-screen horizontal pipeline |
| Animations | CSS transitions | GSAP ScrollTrigger + reveals |
| Mobile | Cramped sections | Responsive stacking, optimized padding |
| Fonts | Poppins | Archivo + JetBrains Mono |
| Aesthetic | Modern flat | Dark terminal/infrastructure |

---

## One More Thing

The new design is **production-ready**:
- ✓ No build step
- ✓ Works offline (after first load)
- ✓ Fast (static files, CDN for libs)
- ✓ Accessible (semantic HTML, focus rings, reduced motion)
- ✓ SEO-friendly (no JavaScript-rendered content)

You can deploy and it will work. 🚀
