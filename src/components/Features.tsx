import { Lock, Users, Brain, Zap } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Trustworthy Encrypted Storage",
    description: "Military-grade encryption keeps your conversations secure and private on-device"
  },
  {
    icon: Users,
    title: "Transparent Consent Dashboard", 
    description: "Honest, simple interface for participants to grant or deny consent after conversations"
  },
  {
    icon: Brain,
    title: "Reliable AI Summaries",
    description: "Get intelligent, trustworthy insights and summaries from your consented recordings"
  },
  {
    icon: Zap,
    title: "Dependable Team Integration",
    description: "Reliable integration for research teams, healthcare, and educational settings"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for professionals who value trust, authenticity, and ethical data practices
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-card rounded-xl border hover:border-accent/30 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;