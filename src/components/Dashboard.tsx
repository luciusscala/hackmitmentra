import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Music, 
  Video, 
  Users, 
  TrendingUp, 
  Clock,
  Play,
  Download 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Active Streams', value: '3', icon: Camera, trend: '+12%', color: 'text-primary' },
    { title: 'Videos Generated', value: '47', icon: Video, trend: '+23%', color: 'text-accent' },
    { title: 'Music Tracks', value: '52', icon: Music, trend: '+18%', color: 'text-neon-purple' },
    { title: 'Total Views', value: '1.2k', icon: Users, trend: '+34%', color: 'text-neon-pink' },
  ];

  const recentVideos = [
    {
      id: 1,
      title: 'Morning Coffee Run',
      duration: '2:34',
      status: 'processing',
      thumbnail: '/api/placeholder/300/200',
      generated: '5 min ago'
    },
    {
      id: 2,
      title: 'City Lights Walk',
      duration: '4:12',
      status: 'completed',
      thumbnail: '/api/placeholder/300/200',
      generated: '2 hours ago'
    },
    {
      id: 3,
      title: 'Sunset Beach',
      duration: '3:45',
      status: 'completed',
      thumbnail: '/api/placeholder/300/200',
      generated: '1 day ago'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-destructive';
      case 'processing': return 'bg-accent';
      case 'completed': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card hover-glow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold neon-text">{stat.value}</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <TrendingUp className="w-4 h-4 mr-1 text-primary" />
                  {stat.trend} from last week
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Live Streams */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Live Streams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-glass-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold status-live">Stream #1 - John's Glasses</h3>
                  <p className="text-sm text-muted-foreground">Started 12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor('live')} text-white`}>
                  LIVE
                </Badge>
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-1" />
                  Watch
                </Button>
              </div>
            </div>
            
            <div className="text-center py-8 text-muted-foreground">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No other active streams</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Videos */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-accent" />
            Recent Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="video-grid">
            {recentVideos.map((video) => (
              <div key={video.id} className="glass-card p-4 hover-glow">
                <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold truncate">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.generated}
                    </span>
                    <Badge className={`${getStatusColor(video.status)} text-white text-xs`}>
                      {video.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;