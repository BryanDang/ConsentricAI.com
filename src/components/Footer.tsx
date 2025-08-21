const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-primary mb-2">ConsentricAI</h3>
            <p className="text-muted-foreground">
              The trust-first way to capture conversations
            </p>
          </div>
          
          <div className="flex space-x-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2024 ConsentricAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;