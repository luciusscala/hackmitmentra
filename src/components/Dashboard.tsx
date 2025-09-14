import { useQuery } from '@tanstack/react-query';
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
  Download,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface DashboardProps {
  onViewAll?: () => void;
}

const Dashboard = ({ onViewAll }: DashboardProps) => {
  // Fetch real data from backend
  const { data: photosData, isLoading } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/photos');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      return response.json();
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const videos = photosData?.videos || [];
  const completedVideos = videos.filter(video => video.status === 'done');
  const processingVideos = videos.filter(video => video.status !== 'done');
  const totalSize = videos.reduce((sum, video) => sum + video.file_size_mb, 0);

  const stats = [
    { title: 'Total Videos', value: videos.length.toString(), icon: Video, trend: `+${videos.length}`, color: 'text-primary' },
    { title: 'Completed', value: completedVideos.length.toString(), icon: Music, trend: `+${completedVideos.length}`, color: 'text-accent' },
    { title: 'Processing', value: processingVideos.length.toString(), icon: Camera, trend: `+${processingVideos.length}`, color: 'text-neon-purple' },
    { title: 'Total Size', value: `${totalSize.toFixed(1)} MB`, icon: Users, trend: `+${totalSize.toFixed(1)}MB`, color: 'text-neon-pink' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-primary';
      case 'converting': return 'bg-accent';
      case 'generating': return 'bg-yellow-500';
      case 'merging': return 'bg-blue-500';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

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

      {/* Recent Videos */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-accent" />
              Recent Videos
              <Badge variant="secondary">{videos.length} total</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewAll}
              className="flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <div className="py-16 text-center">
              <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
              <p className="text-muted-foreground mb-4">Upload some photos to generate videos!</p>
              <Button onClick={onViewAll}>
                <Video className="w-4 h-4 mr-2" />
                Go to Library
              </Button>
            </div>
          ) : (
            <div className="video-grid">
              {videos.slice(0, 3).map((video) => (
                <div key={video.task_id} className="glass-card p-4 hover-glow">
                  <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
                    {/* Video Preview */}
                    {video.status === 'done' ? (
                      <video 
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        preload="metadata"
                      >
                        <source src={`http://localhost:8000/photos/${video.task_id}/download`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    )}
                    
                    <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                      {video.file_size_mb} MB
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${getStatusColor(video.status)} text-white text-xs`}>
                        {video.status}
                      </Badge>
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
                        ID: {video.task_id.slice(0, 8)}...
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {video.status === 'done' ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => window.open(`http://localhost:8000/photos/${video.task_id}/download`, '_blank')}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(`http://localhost:8000/photos/${video.task_id}/download`, '_blank')}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1" disabled>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Processing...
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;