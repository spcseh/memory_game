# Memory Game

A web-based memory game with increasing complexity where players must remember and repeat sequences of colors.

## Features

- **Increasing Difficulty**: Each level adds more tiles to the sequence
- **Score System**: Points increase with each completed level
- **Lives System**: 3 lives with visual feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern design with smooth animations
- **Progress Tracking**: Level, score, and lives displayed clearly

## How to Play

1. Click "Start Game" to begin
2. Watch the sequence of colored tiles that light up
3. Repeat the sequence by clicking the tiles in the same order
4. Each successful level increases the sequence length
5. You have 3 lives - game ends when all lives are lost

## Deployment Instructions


### Option 1: Deploy to Vercel

1. **Fork or upload this project to GitHub**

2. **Go to [Vercel](https://vercel.com) and sign up/login**

3. **Import your project:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Flask configuration

4. **Configure project (if needed):**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `pip install -r requirements.txt`

5. **Click "Deploy"**

6. **Your app will be live at: `https://your-project-name.vercel.app`**

### Option 2: Deploy to Render

1. **Fork or upload this project to GitHub**

2. **Go to [Render](https://render.com) and sign up/login**

3. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

4. **Configure the service:**
   - **Name**: `memory-game` (or your preferred name)
   - **Environment**: `Python 3`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: (leave empty if root)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

5. **Click "Create Web Service"**

6. **Your app will be live at: `https://your-project-name.onrender.com`**

### Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Clone the repository
git clone <your-repo-url>
cd memory_game

# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py

# Or with gunicorn for production
gunicorn app:app