const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting ConsentricAI website testing...\n');
  
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({ 
      headless: false, // Show browser for debugging
      slowMo: 1000,   // Slow down by 1s between actions
      defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('1️⃣ Testing website loading...');
    // Navigate to the website
    await page.goto('https://consentricai.com', { waitUntil: 'networkidle2' });
    
    console.log('✅ Website loaded successfully');
    console.log(`   Page title: ${await page.title()}`);
    
    // Wait for React to render
    await page.waitForTimeout(3000);
    
    console.log('\n2️⃣ Testing Watch Demo button...');
    try {
      // Look for Watch Demo button and click it
      const watchDemoButton = await page.waitForSelector('button:has-text("Watch Demo")', { timeout: 5000 });
      
      // Set up listener for new tab
      const newPagePromise = new Promise(resolve => browser.once('targetcreated', resolve));
      
      await watchDemoButton.click();
      
      // Wait for new tab
      const newTarget = await newPagePromise;
      const newPage = await newTarget.page();
      
      console.log('✅ Watch Demo button clicked successfully');
      console.log(`   Opened URL: ${newPage.url()}`);
      
      if (newPage.url().includes('youtu.be/2FTN2r_RaOE')) {
        console.log('✅ Correct YouTube video opened');
      } else {
        console.log('❌ Wrong URL opened');
      }
      
      await newPage.close();
    } catch (error) {
      console.log('❌ Watch Demo button test failed:', error.message);
    }
    
    console.log('\n3️⃣ Testing Join Waitlist button in hero section...');
    try {
      const joinWaitlistButton = await page.waitForSelector('button:has-text("Join the Waitlist")', { timeout: 5000 });
      
      await joinWaitlistButton.click();
      await page.waitForTimeout(2000); // Wait for scroll
      
      // Check if we scrolled to the waitlist section
      const waitlistSection = await page.$('#waitlist');
      if (waitlistSection) {
        const isInViewport = await page.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        }, waitlistSection);
        
        if (isInViewport) {
          console.log('✅ Successfully scrolled to waitlist section');
        } else {
          console.log('❌ Did not scroll to waitlist section properly');
        }
      }
    } catch (error) {
      console.log('❌ Join Waitlist button test failed:', error.message);
    }
    
    console.log('\n4️⃣ Testing email signup form...');
    try {
      // Find email input and submit button
      const emailInput = await page.waitForSelector('input[type="email"]', { timeout: 5000 });
      const submitButton = await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
      
      // Clear and fill email
      await emailInput.click({ clickCount: 3 });
      await emailInput.type('test@example.com');
      
      console.log('✅ Email input filled successfully');
      
      // Submit form
      await submitButton.click();
      await page.waitForTimeout(3000); // Wait for submission
      
      // Check for success/error messages or toast notifications
      const toastElements = await page.$$('[role="alert"], .toast, .notification');
      if (toastElements.length > 0) {
        console.log('✅ Form submission triggered notification');
        
        // Try to get notification text
        for (const toast of toastElements) {
          const text = await page.evaluate(el => el.textContent, toast);
          console.log(`   Notification: ${text}`);
        }
      } else {
        console.log('⚠️ No notification found after form submission');
      }
      
    } catch (error) {
      console.log('❌ Email form test failed:', error.message);
    }
    
    console.log('\n5️⃣ Testing footer Privacy button...');
    try {
      // Scroll to footer first
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      
      const privacyButton = await page.waitForSelector('button:has-text("Privacy")', { timeout: 5000 });
      await privacyButton.click();
      await page.waitForTimeout(2000);
      
      // Check if scrolled to trust section
      const trustSection = await page.$('#trust');
      if (trustSection) {
        const isInViewport = await page.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        }, trustSection);
        
        if (isInViewport) {
          console.log('✅ Privacy button successfully scrolled to Trust section');
        } else {
          console.log('❌ Privacy button did not scroll to Trust section properly');
        }
      }
    } catch (error) {
      console.log('❌ Privacy button test failed:', error.message);
    }
    
    console.log('\n6️⃣ Testing footer Contact button...');
    try {
      const contactButton = await page.waitForSelector('button:has-text("Contact")', { timeout: 5000 });
      await contactButton.click();
      await page.waitForTimeout(2000);
      
      // Check if scrolled to waitlist section
      const waitlistSection = await page.$('#waitlist');
      if (waitlistSection) {
        const isInViewport = await page.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        }, waitlistSection);
        
        if (isInViewport) {
          console.log('✅ Contact button successfully scrolled to waitlist section');
        } else {
          console.log('❌ Contact button did not scroll to waitlist section properly');
        }
      }
    } catch (error) {
      console.log('❌ Contact button test failed:', error.message);
    }
    
    console.log('\n7️⃣ Overall user experience assessment...');
    
    // Check page load time
    const metrics = await page.metrics();
    console.log(`   Page load metrics: ${JSON.stringify(metrics, null, 2)}`);
    
    // Check for console errors
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));
    
    console.log('✅ Testing completed successfully!');
    
  } catch (error) {
    console.error('❌ Browser automation failed:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();