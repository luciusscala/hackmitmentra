import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Camera, 
  Music, 
  Server,
  Key,
  Database,
  Cloud,
  Bell
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Stream Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Stream Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Default Resolution</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>1080p (1920x1080)</option>
                <option>720p (1280x720)</option>
                <option>480p (854x480)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Frame Rate</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>30 FPS</option>
                <option>60 FPS</option>
                <option>24 FPS</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bitrate</label>
              <Input placeholder="2500 kbps" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Buffer Size</label>
              <Input placeholder="5000 kb" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-start Recording</p>
              <p className="text-sm text-muted-foreground">Automatically record when streaming starts</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* AI Music Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-accent" />
            AI Music Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Suno API Key</label>
            <div className="flex gap-2">
              <Input type="password" placeholder="Enter your Suno API key..." className="flex-1" />
              <Button variant="outline">
                <Key className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Music Style</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>Auto-detect from video</option>
                <option>Ambient/Cinematic</option>
                <option>Electronic</option>
                <option>Acoustic</option>
                <option>Hip-hop</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Generation Quality</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>High Quality (slower)</option>
                <option>Standard Quality</option>
                <option>Fast Generation</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Real-time Music Generation</p>
                <p className="text-sm text-muted-foreground">Generate music while streaming (experimental)</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-sync with Video</p>
                <p className="text-sm text-muted-foreground">Automatically match music tempo to video pace</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Server Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-neon-blue" />
            Server Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">RTMP Server URL</label>
            <Input placeholder="rtmp://your-server.com/live" />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Stream Key</label>
            <div className="flex gap-2">
              <Input type="password" placeholder="Your stream key..." className="flex-1" />
              <Button variant="outline">Generate</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Server Region</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>US East (Virginia)</option>
                <option>US West (California)</option>
                <option>EU (Frankfurt)</option>
                <option>Asia Pacific (Tokyo)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Connection Protocol</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>RTMP</option>
                <option>WebRTC</option>
                <option>SRT</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage & Processing */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-neon-purple" />
            Storage & Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Storage Provider</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>Amazon S3</option>
                <option>Google Cloud Storage</option>
                <option>Azure Blob Storage</option>
                <option>Local Storage</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Video Format</label>
              <select className="w-full p-2 rounded-lg bg-input border border-border">
                <option>MP4 (H.264)</option>
                <option>WebM (VP9)</option>
                <option>MOV (ProRes)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">S3 Bucket Name</label>
            <Input placeholder="your-bucket-name" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-delete Source Files</p>
                <p className="text-sm text-muted-foreground">Delete original files after processing</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable CDN</p>
                <p className="text-sm text-muted-foreground">Use CDN for faster video delivery</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-neon-pink" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Stream Start/Stop</p>
              <p className="text-sm text-muted-foreground">Get notified when streams start or stop</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Video Processing Complete</p>
              <p className="text-sm text-muted-foreground">Notify when AI music video generation is done</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">System Errors</p>
              <p className="text-sm text-muted-foreground">Alert for system errors and failures</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button size="lg" className="hover-glow neon-glow">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;