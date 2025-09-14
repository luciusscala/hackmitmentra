import { Button } from '@/components/ui/button';
import { Play, Sparkles, Zap, Camera } from 'lucide-react';
import heroImage from '@/assets/hero-glasses-minimal.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
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
            Add newly gerated music to your songs
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto fade-in-up">
          Take a picture using MENTRA’s open-source smart glasses, let AI generate the perfect soundtrack, and automatically create cinematic visuals. The future of content creation is here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
  <Button variant="outline" size="lg" className="hover-glow">
    <Sparkles className="w-5 h-5 mr-2" />
    View Demo
  </Button>
</div>

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
  );
};

export default HeroSection;