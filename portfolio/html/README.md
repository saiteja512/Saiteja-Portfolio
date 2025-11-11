# Santhosh Daravath — Portfolio

GitHub: https://github.com/SanthoshDaravath

This is a lightweight, responsive portfolio scaffold tailored for Santhosh Daravath.

What I changed to make it more effective
- Clear hero with resume and LinkedIn CTAs.
- Social links in the header (GitHub, LinkedIn).
- Project card with a modal for details and clear action buttons.
- Improved meta description for basic SEO.
- Subtle canvas background with respect for prefers-reduced-motion.
- Accessible modal (ESC to close) and smoother UX (smooth scroll, current year).

Files
- `index.html` — main single-page portfolio
- `css/styles.css` — theme and responsive styles
- `js/script.js` — interactivity: menu, particles, modal, smooth scroll

Resume
------
 - Place your resume PDF at `html/Santhosh-Resume.pdf` to enable the "View Resume" button on the site. If your resume is currently in your Downloads folder (for example `C:\Users\santh\Downloads\Santhosh Resume.pdf`), you can copy it into the project with a VS Code task we've added.

Quick copy (one-click in VS Code)
1. Open the Command Palette (Ctrl+Shift+P) → "Tasks: Run Task" → choose "Copy Resume into site".
2. The task will copy `$env:USERPROFILE\Downloads\Santhosh Resume.pdf` to `html/Santhosh-Resume.pdf`.

Or run the PowerShell command manually (adjust path if needed):

```powershell
Copy-Item -Path "$env:USERPROFILE\Downloads\Santhosh Resume.pdf" -Destination "$env:USERPROFILE\OneDrive\Desktop\portfolio\html\Santhosh-Resume.pdf" -Force
```

How to customize (quick)
- Replace `resume.pdf` in the site root with your actual resume.
- Replace social links (header) with your real profiles.
- Update project details and add screenshots or live demo links inside the project modal.
- If you want a working contact form, replace the contact form `action` with a Formspree endpoint:

  1. Go to https://formspree.io/ and create a form to get your endpoint.
  2. Replace the `action` on the `<form>` in `index.html` with the Formspree URL (e.g. `https://formspree.io/f/xxxxx`).

Accessibility & performance notes
- The particle background honors `prefers-reduced-motion` and will not run if the user opts out.
- Keep images optimized and avoid very large files to preserve load performance.

Deploy
- Deploy to Vercel or Netlify by connecting your repo—static site is supported out-of-the-box.

Search engines & social sharing
-------------------------------
- I added basic SEO and social metadata to `index.html` (Open Graph, Twitter card, canonical link) and a small JSON-LD Person block. This improves how your site appears in search results and when shared on social media.
- I also added `robots.txt` and `sitemap.xml` in the `html/` folder. When you deploy, make sure these files are published at the site root (they help crawlers discover your pages).

To get listed on Google (recommended):
1. Deploy the site to a public URL (GitHub Pages, Netlify, or Vercel). I can add a GitHub Actions workflow to publish `html/` to GitHub Pages if you'd like.
2. Sign in to Google Search Console and add your site (use the deployed URL). Submit the `sitemap.xml` URL to speed up indexing.
3. Optionally request reindexing after major changes.

If you'd like, note that a GitHub Actions workflow has been added to this repository to publish the `html/` folder to GitHub Pages on push to `main`.

- Workflow path: `.github/workflows/deploy.yml` — it uploads the `html/` folder as a Pages artifact and deploys it via the official Pages actions. The workflow runs on pushes to `main` and can be triggered manually from the Actions tab.
- I can also create a small Open Graph image at `html/assets/og-image.png` (I can add a placeholder SVG if you want).

Generate corrected PDF resume
----------------------------
If the displayed PDF title still shows an old name in the browser, you can regenerate a fresh PDF with the correct name/metadata using the included HTML template and script.

1. Optional: edit `html/resume_template.html` to customize the resume content.
2. Run the VS Code task: Command Palette → "Tasks: Run Task" → choose "Generate Resume PDF". This runs `scripts/generate_resume.ps1` which attempts to use Microsoft Edge or Chrome headless to produce `html/Santhosh-Resume.pdf`.
3. If neither browser is installed on PATH, the script opens the template in your default browser so you can Print → Save as PDF manually.

Notes:
- The generated PDF will be saved as `html/Santhosh-Resume.pdf` and the site already links to that.
- If you want me to generate a fancier resume layout or include more sections, tell me what to add and I can update `resume_template.html`.

Want me to:
- Wire the contact form to Formspree/Netlify Forms and add serverless form handling?
- Add screenshots and a demo page for the Spam Detector project and link a repo?
- Tweak visual style (lighter theme, more contrast, or a bold color palette)?
- I also expanded skills and related topics in the live site to highlight core areas (Algorithms, ML, Android, Databases, DevOps).

Additionally, I added backend and full-stack technologies to the Skills section:
- React (front-end framework)
- Spring Boot (Java backend)
- SQL / MySQL (relational databases)

Tell me which next step you'd like and I'll implement it:
- Wire the contact form to Formspree/Netlify Forms and add serverless form handling (recommended).
- Add screenshots and a demo page for the Spam Detector project and link a GitHub repo.
- Replace the SVG avatar with your photo and optimize images.
- Create a printable resume page and a light/dark theme toggle.

Sample app scaffold
-------------------
I added a minimal scaffold under `sample-app/`:

- `sample-app/server` — placeholder Spring Boot app with a simple `/api/ping` endpoint (small `pom.xml` and `DemoApplication.java`). Use this as a starting point or replace with a generated Spring Boot project from start.spring.io.
- `sample-app/client` — minimal React app placeholder (`package.json`, `src/App.js`) which fetches `/api/ping`.

Run locally (quick):
1. For the server, generate a Spring Boot project or use the placeholder. From `sample-app/server` run with Maven:

  mvn spring-boot:run

2. For the client, from `sample-app/client` run:

  npm install
  npm start

Set up a proxy or enable CORS in Spring Boot so the client can call `/api/ping`.

If you'd like, I can fully scaffold runnable projects (real Maven structure and CRA) and wire a demo—say "scaffold app" and I'll add the full runnable skeleton.
