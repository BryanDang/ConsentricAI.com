import { Shield, Eye, FileCheck } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Trust-First Design",
    description: "Your data never leaves your device without explicit, transparent consent"
  },
  {
    icon: Eye,
    title: "Integrity-Driven AI Principles", 
    description: "Built on transparency, accountability, fairness, and human agency"
  },
  {
    icon: FileCheck,
    title: "Trustworthy Compliance",
    description: "GDPR, HIPAA, and other data protection regulations supported with integrity"
  }
];

const Trust = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trust, Integrity & Ethics
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            We believe trustworthy, ethical AI starts with transparency and putting people in complete control of their own data
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {trustFeatures.map((feature, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gradient-accent rounded-2xl text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Our Trust-First Commitment
          </h3>
          <p className="text-primary-foreground/90 text-lg max-w-3xl mx-auto">
            We're building AI that respects human agency with complete transparency and integrity. Every conversation remains private until 
            <strong className="text-primary-foreground"> all participants </strong> 
            choose to share with full trust and confidence. That's not just our technology—it's our unbreakable promise and commitment to you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trust;