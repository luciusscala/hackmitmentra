import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Brain, AudioWaveform, Zap, Play, Download, Settings, Mic } from 'lucide-react';

const MusicAI = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart Context Analysis",
      description: "AI analyzes your video content, mood, and environment to generate perfectly matching soundtracks"
    },
    {
      icon: AudioWaveform,
      title: "Suno AI Integration",
      description: "Powered by Suno's advanced AI music generation for professional-quality tracks"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Generate and sync music with your live stream in under 30 seconds"
    },
    {
      icon: Mic,
      title: "Voice-to-Music",
      description: "Hum a melody or describe the mood - AI creates the perfect soundtrack"
    }
  ];

  const musicStyles = [
    { name: "Cinematic", color: "bg-blue-500/20 text-blue-400" },
    { name: "Ambient", color: "bg-teal-500/20 text-teal-400" },
    { name: "Electronic", color: "bg-purple-500/20 text-purple-400" },
    { name: "Jazz", color: "bg-yellow-500/20 text-yellow-400" },
    { name: "Rock", color: "bg-red-500/20 text-red-400" },
    { name: "Classical", color: "bg-green-500/20 text-green-400" }
  ];

  const recentGenerations = [
    { id: 1, title: "Morning Walk Soundtrack", style: "Ambient", duration: "2:34", status: "completed" },
    { id: 2, title: "City Exploration Beat", style: "Electronic", duration: "3:12", status: "processing" },
    { id: 3, title: "Sunset Vibes", style: "Cinematic", duration: "2:58", status: "completed" },
    { id: 4, title: "Coffee Shop Jazz", style: "Jazz", duration: "4:21", status: "completed" }
  ];

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold gradient-text">AI Music Generation</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your smart glasses footage into cinematic experiences with AI-generated soundtracks
        </p>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiFeatures.map((feature, index) => (
          <Card key={index} className="glass-card hover-glow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <feature.icon className="w-6 h-6 text-primary mr-3" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Music Generation Interface */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AudioWaveform className="w-5 h-5" />
            Generate New Soundtrack
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Style Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Music Style</h3>
            <div className="flex flex-wrap gap-2">
              {musicStyles.map((style) => (
                <Badge key={style.name} variant="outline" className={`${style.color} cursor-pointer hover-glow`}>
                  {style.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Generation Controls */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <Brain className="w-4 h-4 mr-2" />
              Auto-Generate from Video
            </Button>
            <Button variant="outline" className="flex-1">
              <Mic className="w-4 h-4 mr-2" />
              Describe Mood
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Generations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Generations</CardTitle>
          <CardDescription>Your AI-generated soundtracks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentGenerations.map((track) => (
              <div key={track.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{track.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">{track.style}</Badge>
                      <span>{track.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {track.status === 'completed' ? (
                    <>
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                      Processing...
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Integration Status */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Suno AI Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Connected to Suno API</span>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400/50">
              Active
            </Badge>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Average generation time: 15-30 seconds</p>
            <p>• Supported formats: MP3, WAV, OGG</p>
            <p>• Maximum duration: 5 minutes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicAI;