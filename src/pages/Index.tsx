import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Play, Download, Clock, Loader2, Sparkles, Zap, Camera } from 'lucide-react';
import heroImage from '@/assets/hero-glasses-minimal.jpg';

const Index = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get videos directly from backend storage
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:8000/photos');
        const data = await response.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    // Refresh every 10 seconds
    const interval = setInterval(fetchVideos, 10000);
    return () => clearInterval(interval);
  }, []);

  const completedVideos = videos.filter(video => video.status === 'done');
  const processingVideos = videos.filter(video => video.status !== 'done');
  const totalSize = videos.reduce((sum, video) => sum + video.file_size_mb, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'bg-green-500';
      case 'converting': return 'bg-yellow-500';
      case 'generating': return 'bg-blue-500';
      case 'merging': return 'bg-purple-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-bg"></div>
        
        {/* Simplified Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="particle bg-primary"
              style={{
                left: `${Math.random() * 100}%`,
                width: '3px',
                height: '3px',
                animationDelay: `${i * 4}s`,
                animationDuration: '20s'
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="mb-8 relative">
              <img 
                src={heroImage} 
                alt="Smart Glasses AI Music Video Generation" 
                className="w-full h-64 object-cover rounded-xl neon-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 fade-in-up">
              <span className="gradient-text">AuraTune</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-light mb-8 neon-text fade-in-up">
              Add original composed music to your pictures
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto fade-in-up">
            Take a picture using MENTRA's open-source smart glasses, let AI generate the perfect soundtrack, and automatically create cinematic visuals. The future of content creation is here.
            </p>


            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="glass-card p-6 hover-glow">
                <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Music Generation</h3>
                <p className="text-muted-foreground">Suno AI creates perfect soundtracks automatically</p>
              </div>
              <div className="glass-card p-6 hover-glow">
                <Zap className="w-12 h-12 text-neon-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Processing</h3>
                <p className="text-muted-foreground">FFmpeg merges video and audio in real-time</p>
              </div>
              <div className="glass-card p-6 hover-glow">
                <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Streaming</h3>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats and Videos Section */}
      <div className="container mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-glow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold neon-text">{videos.length}</div>
              <div className="text-muted-foreground">Total Videos</div>
            </CardContent>
          </Card>
          <Card className="glass-card hover-glow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">{completedVideos.length}</div>
              <div className="text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="glass-card hover-glow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-neon-purple">{processingVideos.length}</div>
              <div className="text-muted-foreground">Processing</div>
            </CardContent>
          </Card>
          <Card className="glass-card hover-glow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">{totalSize.toFixed(1)} MB</div>
              <div className="text-muted-foreground">Total Size</div>
            </CardContent>
          </Card>
        </div>

        {/* Videos */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-accent" />
              Your Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Loading videos...</span>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-16">
                <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
                <p className="text-muted-foreground">Upload some photos to generate videos!</p>
              </div>
            ) : (
              <div className="video-grid">
                {videos.map((video) => (
                  <div key={video.task_id} className="glass-card p-4 hover-glow group relative">
                    <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
                      {video.status === 'done' ? (
                        <video 
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        >
                          <source src={`http://localhost:8000/photos/${video.task_id}/download`} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2">
                        <Badge className={`${getStatusColor(video.status)} text-white text-xs`}>
                          {video.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs">
                        {video.file_size_mb} MB
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold truncate">{video.filename}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(video.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-xs">
                          {video.task_id.slice(0, 8)}...
                        </span>
                      </div>
                      
                      {video.status === 'done' && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            className="flex-1 video-button"
                            onClick={() => window.open(`http://localhost:8000/photos/${video.task_id}/download`, '_blank')}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="video-button"
                            onClick={() => window.open(`http://localhost:8000/photos/${video.task_id}/download`, '_blank')}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
