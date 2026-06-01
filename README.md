# FFS Virtual World
Full Frame Society — Interactive Hotspot Experience

A full-screen, static hotspot world built with vanilla HTML/CSS/JS and one Netlify serverless function. No React. No build step. No npm.

---

## Project Structure

```
ffs-virtual-world/
├── netlify.toml
├── .gitignore
├── .env.example
├── README.md
└── public/
│   ├── index.html
│   └── hero.png          ← Add this image manually
└── netlify/
    └── functions/
        └── capture-lead.js
```

---

## Setup

### 1. Add Your Hero Image
Drop `hero.png` into the `public/` folder. This is the full-screen background image the hotspots sit on top of.

### 2. Set Netlify Environment Variables
In your Netlify dashboard → Site Settings → Environment Variables, add:

| Variable | Description |
|---|---|
| `GHL_API_KEY` | From GHL → Settings → Private Integrations (starts with `pit-`) |
| `GHL_LOCATION_ID` | From GHL → Settings → Business Profile → Location ID |

### 3. Create GHL Tags
In GoHighLevel → Settings → Tags, create all of these before testing:

| Tag | Applied When |
|---|---|
| `ffs-world-visitor` | Every form submission (always added) |
| `ffs-world-starterkit-optin` | Free Lead Magnets (hotspot 7) |
| `ffs-world-audit-optin` | Main Character Brand Audit (hotspot 9) |
| `ffs-world-library-optin` | Their Library Was the Problem (hotspot 12) |

### 4. Build GHL Workflows
Create one automation workflow per tag:
- Trigger: Tag added → `ffs-world-starterkit-optin`
- Trigger: Tag added → `ffs-world-audit-optin`
- Trigger: Tag added → `ffs-world-library-optin`

Each workflow should send the corresponding free resource email. Make sure each workflow is **Published** before testing.

### 5. Deploy to Netlify
Push this repo to GitHub, connect it to Netlify, and deploy. The `netlify.toml` handles the rest.

---

## Testing Checklist

- [ ] All GHL tags exist (Settings → Tags)
- [ ] GHL workflows built and Published for each tag
- [ ] Netlify env vars set: `GHL_API_KEY` and `GHL_LOCATION_ID`
- [ ] `hero.png` added to `public/` folder
- [ ] Latest code deployed (check Netlify deploy history)
- [ ] Open Netlify function log (Logs → Functions → capture-lead) in one tab
- [ ] Click a free hotspot, submit a test email
- [ ] Confirm log shows: `Contact upserted. ID: ... | Tag: ...`
- [ ] Confirm contact appears in GHL with correct tags
- [ ] Confirm workflow email arrives within 2 minutes

---

## How It Works

**Service hotspots** (paid/info) open a right-side panel with description and a CTA link to the relevant page on fullframesociety.com.

**Free hotspots** (ids 7, 9, 12) open a centered modal with a name + email capture form. On submit, the Netlify function calls the GHL contacts upsert endpoint, tagging the contact with `ffs-world-visitor` plus the product-specific tag. GHL workflows handle delivery from there.

---

## Hotspot Reference

| ID | Product | Type | GHL Tag |
|---|---|---|---|
| 0 | Brand Spokesperson Package | Service | — |
| 1 | UGC Product Ad | Service | — |
| 2 | Faceless Podcast Episode | Service | — |
| 3 | Social Reels & Shorts | Service | — |
| 4 | The Visibility Vault | Service | — |
| 5 | About Full Frame Society | Service | — |
| 6 | Digital Products | Service | — |
| 7 | Free Lead Magnets | **Free** | `ffs-world-starterkit-optin` |
| 8 | Mini-Course Bundle | Service | — |
| 9 | Main Character Brand Audit | **Free** | `ffs-world-audit-optin` |
| 10 | DFY Consultation | Service | — |
| 11 | Live Workshop | Service | — |
| 12 | Their Library Was the Problem | **Free** | `ffs-world-library-optin` |
