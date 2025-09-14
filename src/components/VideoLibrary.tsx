import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react';

const VideoLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Fetch photos from backend API
  const { data: photosData, isLoading, error, refetch } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/photos');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds to get updates
  });

  const videos = photosData?.videos || [];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.task_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || video.status === filterType;
    return matchesSearch && matchesFilter;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="glass-card">
          <CardContent className="py-16 text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-xl font-semibold mb-2">Loading Photos</h3>
            <p className="text-muted-foreground">Fetching your photo library...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <Card className="glass-card">
          <CardContent className="py-16 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h3 className="text-xl font-semibold mb-2">Error Loading Photos</h3>
            <p className="text-muted-foreground mb-4">
              {error.message || 'Failed to load photos from the server'}
            </p>
            <Button onClick={() => refetch()}>
              <Loader2 className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Photo Library
            <Badge variant="secondary" className="ml-auto">
              {videos.length} photos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search photos by filename or ID..."
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
                variant={filterType === 'done' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('done')}
              >
                Completed
              </Button>
              <Button
                variant={filterType === 'converting' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('converting')}
              >
                Processing
              </Button>
              <Button
                variant={filterType === 'generating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('generating')}
              >
                Generating
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <Card key={video.task_id} className="glass-card hover-glow group">
            <div className="relative aspect-video overflow-hidden rounded-t-xl">
              {/* Thumbnail Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-neon-purple/20"></div>
              
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
              
              {/* Play Overlay for non-done videos */}
              {video.status !== 'done' && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" className="rounded-full neon-glow">
                    <Play className="w-6 h-6 fill-current" />
                  </Button>
                </div>
              )}
              
              {/* File Size Badge */}
              <div className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                {video.file_size_mb} MB
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <Badge 
                  className={video.status === 'done' ? 'bg-primary' : 'bg-accent'}
                >
                  {video.status}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {video.filename}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(video.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  {video.file_size_mb} MB
                </span>
              </div>
              
              {/* Task ID */}
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="outline" className="text-xs">
                  ID: {video.task_id.slice(0, 8)}...
                </Badge>
                {video.status === 'done' && (
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                    Ready
                  </Badge>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                {video.status === 'done' ? (
                  <>
                    <Button 
                      size="sm" 
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
            <h3 className="text-xl font-semibold mb-2">No photos found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Your photo library is empty'}
            </p>
            <Button>
              <Music className="w-4 h-4 mr-2" />
              Upload Photos
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoLibrary;