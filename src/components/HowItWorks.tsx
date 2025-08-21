import { Radio, Shield, Unlock } from "lucide-react";

const steps = [
  {
    icon: Radio,
    title: "Emit ultrasonic signal",
    description: "ConsentricAI broadcasts an invisible ultrasonic consent signal during the conversation"
  },
  {
    icon: Shield,
    title: "Secure on-device recording", 
    description: "Everything is encrypted locally on your device. No cloud, no third parties"
  },
  {
    icon: Unlock,
    title: "Unlock only with consent",
    description: "Recordings stay locked until all participants give explicit consent after the fact"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to ethical conversation capture
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-2xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                <step.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;