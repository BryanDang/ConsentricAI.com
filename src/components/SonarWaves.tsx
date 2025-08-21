interface SonarWavesProps {
  className?: string;
}

const SonarWaves = ({ className = "" }: SonarWavesProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Central pulse point */}
          <div className="w-4 h-4 bg-accent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
          
          {/* Sonar waves */}
          <div className="w-24 h-24 border-2 border-accent/30 rounded-full animate-sonar" />
          <div className="w-24 h-24 border-2 border-accent/30 rounded-full animate-sonar absolute top-0 left-0" style={{ animationDelay: '1s' }} />
          <div className="w-24 h-24 border-2 border-accent/30 rounded-full animate-sonar absolute top-0 left-0" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default SonarWaves;