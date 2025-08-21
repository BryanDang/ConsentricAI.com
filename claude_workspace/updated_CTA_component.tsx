import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // TODO: Replace this URL with your actual Google Apps Script Web App URL
  const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Welcome to the waitlist! 🎉",
          description: "Thank you for joining! We'll be in touch soon with updates.",
        });
        setEmail("");
      } else {
        // Handle specific error cases
        if (result.message === 'Email already registered') {
          toast({
            title: "Already registered",
            description: "This email is already on our waitlist. Thanks for your interest!",
            variant: "destructive",
          });
        } else if (result.message === 'Invalid email address') {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to submit your email. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-hero">
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
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                variant="hero"
                className="px-8 py-3 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </>
                )}
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