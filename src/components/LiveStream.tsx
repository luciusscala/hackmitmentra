import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Camera, 
  Mic, 
  Settings, 
  Users, 
  Activity,
  Volume2,
  Signal,
  Circle,
  Square,
  Play
} from 'lucide-react';

const LiveStream = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');

  const streamStats = {
    viewers: 23,
    duration: '00:12:34',
    bitrate: '2.5 Mbps',
    resolution: '1080p',
    fps: 30
  };

  const devices = [
    {
      id: 1,
      name: 'Mantra Glasses #1',
      status: 'connected',
      battery: 85,
      signal: 'strong'
    },
    {
      id: 2,
      name: 'Mantra Glasses #2',
      status: 'disconnected',
      battery: 0,
      signal: 'none'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-primary';
      case 'streaming': return 'bg-destructive';
      case 'disconnected': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stream Control */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Live Stream Control
            {isStreaming && (
              <Badge className="bg-destructive text-white ml-auto status-live">
                LIVE
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stream Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Stream Title</label>
            <Input
              placeholder="Enter stream title..."
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
            />
          </div>

          {/* Stream Controls */}
          <div className="flex gap-4">
            <Button
              size="lg"
              className={`hover-glow ${isStreaming ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
              onClick={() => setIsStreaming(!isStreaming)}
            >
              {isStreaming ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Stop Stream
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5 mr-2" />
                  Start Stream
                </>
              )}
            </Button>

            <Button variant="outline" size="lg" className="hover-glow">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream Preview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-accent" />
              Stream Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
              {isStreaming ? (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-neon-purple/30 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 mx-auto mb-4 animate-pulse text-primary" />
                    <p className="text-lg font-semibold">Live Stream Active</p>
                    <p className="text-sm text-muted-foreground">Broadcasting from Mantra Glasses</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">Stream Offline</p>
                    <p className="text-sm text-muted-foreground">Click Start Stream to begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Stream Stats */}
            {isStreaming && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{streamStats.viewers} viewers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-accent" />
                  <span>{streamStats.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Signal className="w-4 h-4 text-neon-blue" />
                  <span>{streamStats.bitrate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="w-4 h-4 text-neon-purple" />
                  <span>{streamStats.resolution} @ {streamStats.fps}fps</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Connected Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-glass-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{device.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Battery: {device.battery}%</span>
                        <span>Signal: {device.signal}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(device.status)} text-white`}>
                    {device.status}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Audio Settings */}
            <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-glass-border">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio Settings
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Microphone</span>
                  <Badge variant="outline">ON</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Music Generation</span>
                  <Badge variant="outline">ENABLED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time Processing</span>
                  <Badge variant="outline">ACTIVE</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveStream;