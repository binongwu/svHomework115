@echo off
echo Starting deployment to GitHub...
git add .
git commit -m "Auto deploy update"
git pull origin main --no-edit
git push origin HEAD:main
echo Deployment push finished. Please check Vercel dashboard.
pause
