import { Microscope, Heart, GraduationCap, Lightbulb } from "lucide-react";

const useCases = [
  {
    icon: Microscope,
    title: "Research",
    description: "Capture authentic participant responses with trust-based methodology"
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Record patient consultations with transparent consent and complete privacy protection"
  },
  {
    icon: GraduationCap,
    title: "Education", 
    description: "Document learning interactions while building and maintaining student trust"
  },
  {
    icon: Lightbulb,
    title: "Startups",
    description: "Preserve breakthrough moments in team sessions with complete transparency"
  }
];

const UseCases = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Use Cases
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by integrity-focused professionals across industries
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="group p-8 bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
                <useCase.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {useCase.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;