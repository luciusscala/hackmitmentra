# AuraTune Frontend

Modern React web interface for the AuraTune AI music video generation system. Built with Vite, TypeScript, and Tailwind CSS.

## 🎯 Overview

The AuraTune frontend provides a beautiful, responsive web interface for viewing and managing AI-generated music videos. It connects to the AuraTune backend to display real-time processing status and allow users to download their creations.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- AuraTune backend running on port 8000
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd HackMIT_Project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Frontend will be available at `http://localhost:5173`
   - Hot reload is enabled for development

## 🎨 Features

### Core Functionality

- **Real-time Video Library**: View all processed videos with live updates
- **Processing Status**: Track video generation progress in real-time
- **Video Playback**: Built-in video player with controls
- **Download Management**: Easy download of generated videos
- **Responsive Design**: Works on desktop and mobile devices

### UI Components

- **Hero Section**: Eye-catching landing page with animated background
- **Stats Dashboard**: Real-time statistics and metrics
- **Video Grid**: Organized display of all videos
- **Status Indicators**: Visual processing status with color coding
- **Interactive Elements**: Smooth hover effects and animations

### Performance Optimizations

- **Hardware Acceleration**: CSS animations use GPU acceleration
- **Lazy Loading**: Videos load only when needed
- **Efficient Polling**: Optimized API calls every 10 seconds
- **Minimal Animations**: Simplified effects for better performance

## 🔧 Configuration

### Environment Variables

The frontend connects to the backend via hardcoded URLs. To change the backend URL:

1. **Edit API endpoints** in `src/pages/Index.tsx`:
   ```typescript
   // Change this line:
   const response = await fetch('http://localhost:8000/photos');
   
   // To your backend URL:
   const response = await fetch('https://your-backend-url.com/photos');
   ```

2. **Update download URLs** in the same file:
   ```typescript
   // Change download URLs:
   src={`http://localhost:8000/photos/${video.task_id}/download`}
   
   // To your backend URL:
   src={`https://your-backend-url.com/photos/${video.task_id}/download`}
   ```

### Customization

- **Colors**: Edit `src/index.css` for color scheme changes
- **Animations**: Modify CSS animations in `src/index.css`
- **Layout**: Update components in `src/components/`
- **Styling**: Use Tailwind CSS classes throughout

## 📁 Project Structure

```
HackMIT_Project/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Dashboard.tsx    # Stats dashboard
│   │   ├── Navigation.tsx   # Navigation bar
│   │   └── VideoLibrary.tsx # Video grid component
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Main landing page
│   │   ├── DashboardPage.tsx # Dashboard page
│   │   ├── LibraryPage.tsx  # Video library page
│   │   └── NotFound.tsx     # 404 page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── assets/              # Static assets
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   ├── index.css            # Tailwind CSS and custom styles
│   └── main.tsx             # App entry point
├── public/                  # Static public files
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🎵 Integration with Backend

### API Communication

The frontend communicates with the AuraTune backend through:

1. **Video List**: `GET /photos` - Fetches all processed videos
2. **Video Download**: `GET /photos/{task_id}/download` - Downloads specific video
3. **Status Updates**: Polls every 10 seconds for real-time updates

### Data Flow

1. **Initial Load**: Fetches all videos on component mount
2. **Real-time Updates**: Polls backend every 10 seconds
3. **Status Tracking**: Displays processing status with visual indicators
4. **Video Playback**: Streams videos directly from backend
5. **Download Handling**: Opens download links in new tabs

## 🚨 Troubleshooting

### Common Issues

1. **Videos not loading**:
   - Ensure backend is running on port 8000
   - Check browser console for CORS errors
   - Verify API endpoints are correct

2. **Slow performance**:
   - Check if too many videos are loaded
   - Verify animations are hardware-accelerated
   - Monitor network requests in dev tools

3. **Styling issues**:
   - Clear browser cache
   - Check Tailwind CSS is loaded
   - Verify custom CSS is applied

4. **Build errors**:
   - Delete `node_modules` and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Debugging

1. **Enable debug mode**:
   ```bash
   npm run dev -- --debug
   ```

2. **Check browser console**:
   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Monitor network requests

3. **Verify API connectivity**:
   ```bash
   # Test backend connection
   curl http://localhost:8000/
   
   # Test video list endpoint
   curl http://localhost:8000/photos
   ```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect to GitHub for automatic deployments
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## 🎨 Customization Guide

### Changing Colors

Edit the CSS custom properties in `src/index.css`:

```css
:root {
  --primary: 215 85% 60%;        /* Main blue color */
  --accent: 185 75% 55%;         /* Teal accent */
  --neon-cyan: 185 75% 55%;      /* Neon cyan */
  --neon-purple: 270 60% 65%;    /* Neon purple */
}
```

### Modifying Animations

Update animation keyframes in `src/index.css`:

```css
@keyframes float {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, -100px, 0); }
}
```

### Adding New Components

1. Create component in `src/components/`
2. Import and use in pages
3. Style with Tailwind CSS classes

## 📊 Performance Monitoring

### Key Metrics

- **Page Load Time**: Initial page load performance
- **API Response Time**: Backend communication latency
- **Animation FPS**: Smooth 60fps animations
- **Memory Usage**: Browser memory consumption

### Optimization Tips

1. **Use React.memo()** for expensive components
2. **Implement virtual scrolling** for large video lists
3. **Optimize images** and video thumbnails
4. **Minimize bundle size** with code splitting

## 🔒 Security

### Best Practices

- **HTTPS Only**: Always use HTTPS in production
- **Content Security Policy**: Implement CSP headers
- **Input Validation**: Validate all user inputs
- **API Security**: Use secure API endpoints

### CORS Configuration

Ensure backend CORS settings allow your frontend domain:

```python
# In backend main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Vite for fast development
- React for the UI framework
- Tailwind CSS for styling
- shadcn/ui for components
- AuraTune backend for data
