import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Play, 
  Download, 
  Share, 
  Music,
  Video,
  Clock,
  Eye
} from 'lucide-react';

const VideoLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'Morning Coffee Run',
      duration: '2:34',
      views: 156,
      created: '2 hours ago',
      tags: ['lifestyle', 'morning'],
      thumbnail: '/api/placeholder/400/225',
      status: 'completed'
    },
    {
      id: 2,
      title: 'City Lights Walk',
      duration: '4:12',
      views: 342,
      created: '1 day ago',
      tags: ['urban', 'night'],
      thumbnail: '/api/placeholder/400/225',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Sunset Beach Adventure',
      duration: '3:45',
      views: 789,
      created: '3 days ago',
      tags: ['nature', 'sunset'],
      thumbnail: '/api/placeholder/400/225',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Downtown Food Tour',
      duration: '5:23',
      views: 234,
      created: '5 days ago',
      tags: ['food', 'city'],
      thumbnail: '/api/placeholder/400/225',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Mountain Hiking Trail',
      duration: '6:18',
      views: 567,
      created: '1 week ago',
      tags: ['adventure', 'nature'],
      thumbnail: '/api/placeholder/400/225',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Late Night Coding Session',
      duration: '8:42',
      views: 123,
      created: '1 week ago',
      tags: ['tech', 'coding'],
      thumbnail: '/api/placeholder/400/225',
      status: 'processing'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || video.status === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Video Library
            <Badge variant="secondary" className="ml-auto">
              {videos.length} videos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('completed')}
              >
                Completed
              </Button>
              <Button
                variant={filterType === 'processing' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('processing')}
              >
                Processing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="glass-card hover-glow group">
            <div className="relative aspect-video overflow-hidden rounded-t-xl">
              {/* Thumbnail Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-neon-purple/20"></div>
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button size="lg" className="rounded-full neon-glow">
                  <Play className="w-6 h-6 fill-current" />
                </Button>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <Badge 
                  className={video.status === 'completed' ? 'bg-primary' : 'bg-accent'}
                >
                  {video.status}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {video.views}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.created}
                </span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {video.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Play className="w-3 h-3 mr-1" />
                  Play
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <Card className="glass-card">
          <CardContent className="py-16 text-center">
            <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Your video library is empty'}
            </p>
            <Button>
              <Music className="w-4 h-4 mr-2" />
              Start Creating
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoLibrary;