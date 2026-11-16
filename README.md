# BloodXEditz Portfolio

A cinematic glassmorphism portfolio built with Next.js. It uses the supplied 1920x1080 wallpaper video as a looping full-screen background and loads all public channel uploads through the YouTube Data API v3 uploads playlist.

## Requirements
- Node.js 20.9+ (LTS recommended)
- YouTube Data API v3 key for the complete public uploads gallery

## Run on Windows
1. Extract the ZIP.
2. Open the `bloodxeditz-portfolio` folder in VS Code.
3. Open Terminal in that folder.
4. Run `npm install`.
5. Copy `.env.example` to `.env.local` and set `YOUTUBE_API_KEY=your_real_key`.
6. Run `npm run dev`.
7. Open http://localhost:3000.

Without an API key the portfolio itself runs, but the gallery displays setup instructions. Only public uploads are shown; private and deleted videos cannot be displayed. API responses are cached for 30 minutes.
