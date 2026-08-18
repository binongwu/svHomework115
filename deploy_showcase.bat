@echo off
echo Starting deployment to GitHub...
git add .
git commit -m "Update Lian Chen-Xi to Canva link"
git pull origin main --no-edit
git push origin HEAD:main
echo Deployment push finished. Please check Vercel dashboard.
pause
