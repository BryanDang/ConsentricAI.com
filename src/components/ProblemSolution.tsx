const ProblemSolution = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Problem */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              The Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Current recording tools destroy trust and authenticity
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>• People become guarded when they know they're being recorded</p>
              <p>• Privacy concerns prevent authentic, trustworthy dialogue</p>
              <p>• Trust breaks down before conversations even begin</p>
              <p>• Valuable insights are lost to self-censorship and distrust</p>
            </div>
          </div>
          
          {/* Solution */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              Our Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trust-first AI that preserves authenticity and integrity
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>• Ultrasonic consent signals work transparently during conversation</p>
              <p>• On-device encryption keeps data secure, private, and trustworthy</p>
              <p>• Participants decide <em>after</em> the conversation with full transparency</p>
              <p>• No consent = no stored data, completely reliable and accountable</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;