import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Play, Download, Clock, Loader2 } from 'lucide-react';

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
    // Refresh every 5 seconds
    const interval = setInterval(fetchVideos, 5000);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Photo to Video AI</h1>
          <p className="text-gray-300">Transform your photos into amazing videos with AI-generated music</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white">{videos.length}</div>
              <div className="text-gray-400">Total Videos</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400">{completedVideos.length}</div>
              <div className="text-gray-400">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-400">{processingVideos.length}</div>
              <div className="text-gray-400">Processing</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400">{totalSize.toFixed(1)} MB</div>
              <div className="text-gray-400">Total Size</div>
            </CardContent>
          </Card>
        </div>

        {/* Videos */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="w-5 h-5" />
              Your Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
                <span className="ml-2 text-white">Loading videos...</span>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-16">
                <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
                <p className="text-gray-400">Upload some photos to generate videos!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.task_id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                    <div className="aspect-video bg-gray-600 rounded-lg mb-4 relative overflow-hidden">
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
                          <Loader2 className="w-8 h-8 animate-spin text-white" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2">
                        <Badge className={`${getStatusColor(video.status)} text-white text-xs`}>
                          {video.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                        {video.file_size_mb} MB
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white truncate">{video.filename}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
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
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => window.open(`http://localhost:8000/photos/${video.task_id}/download`, '_blank')}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-500 text-gray-300 hover:bg-gray-600"
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
