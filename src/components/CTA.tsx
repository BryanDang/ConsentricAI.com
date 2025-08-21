import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz4uVNjC1djHIHwkJKo5sic_04TavsCXsH3jaBZ3NAFs1yvOmV0PmHjcnmY95-7A5GQ/exec';

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          toast({
            title: "🎉 Thank you!",
            description: "You've been added to our waitlist. We'll be in touch soon.",
          });
          setEmail("");
        } else {
          toast({
            title: "⚠️ " + (result.message || 'Something went wrong'),
            description: "Please try again or contact support if the issue persists.",
            variant: "destructive"
          });
        }
      } else {
        // Fallback: Open mailto link if API is down
        window.location.href = `mailto:emailmebryand@gmail.com?subject=Waitlist Registration&body=Hi, I'd like to join the ConsentricAI waitlist.%0A%0AEmail: ${encodeURIComponent(email)}`;
        toast({
          title: "📧 Opening email client",
          description: "Since our signup system is temporarily down, we've opened your email client to register manually.",
        });
        setEmail("");
      }
      
    } catch (error) {
      console.error('Error:', error);
      // Fallback: Open mailto link for network errors too
      window.location.href = `mailto:emailmebryand@gmail.com?subject=Waitlist Registration&body=Hi, I'd like to join the ConsentricAI waitlist.%0A%0AEmail: ${encodeURIComponent(email)}`;
      toast({
        title: "📧 Opening email client",
        description: "We've opened your email client so you can register manually.",
      });
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Let's build ethical AI together
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Join thousands of researchers, healthcare professionals, and educators 
            who are reimagining how we capture and share conversations.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-3 rounded-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                variant="hero"
                className="px-8 py-3 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
                {!isSubmitting && <ChevronRight className="ml-2 w-5 h-5" />}
              </Button>
            </div>
          </form>
          
          <p className="text-primary-foreground/60 text-sm">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;