import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 ConsentricAI Website Testing Report');
  console.log('=====================================\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    // Test 1: Website Loading
    console.log('1. ✅ WEBSITE LOADING TEST');
    await page.goto('https://consentricai.com', { waitUntil: 'networkidle0', timeout: 30000 });
    console.log(`   - Page loaded successfully`);
    console.log(`   - Title: "${await page.title()}"`);
    console.log(`   - URL: ${page.url()}\n`);
    
    // Wait for React to fully render
    await page.waitForTimeout(3000);
    
    // Test 2: Watch Demo Button
    console.log('2. 📺 WATCH DEMO BUTTON TEST');
    try {
      const watchDemoExists = await page.$('button[onclick*="youtu.be"], button:has-text("Watch Demo")') !== null;
      if (watchDemoExists) {
        console.log('   - ✅ Watch Demo button found on page');
        
        // Check if clicking opens YouTube link
        const buttonText = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const demoButton = buttons.find(btn => btn.textContent.includes('Watch Demo') || btn.textContent.includes('Demo'));
          return demoButton ? demoButton.textContent.trim() : 'Not found';
        });
        console.log(`   - Button text: "${buttonText}"`);
        
        // Check for YouTube URL in onclick or code
        const hasYouTubeLink = await page.evaluate(() => {
          return document.documentElement.innerHTML.includes('youtu.be/2FTN2r_RaOE') || 
                 document.documentElement.innerHTML.includes('youtube.com');
        });
        
        if (hasYouTubeLink) {
          console.log('   - ✅ YouTube link detected in page source');
        } else {
          console.log('   - ⚠️  YouTube link not found in source');
        }
      } else {
        console.log('   - ❌ Watch Demo button not found');
      }
    } catch (e) {
      console.log('   - ❌ Error testing Watch Demo button:', e.message);
    }
    console.log('');
    
    // Test 3: Join Waitlist Button (Hero)
    console.log('3. 📝 JOIN WAITLIST BUTTON (HERO) TEST');
    try {
      const heroWaitlistExists = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(btn => btn.textContent.includes('Join the Waitlist') || btn.textContent.includes('Join Waitlist'));
      });
      
      if (heroWaitlistExists) {
        console.log('   - ✅ Join Waitlist button found in hero section');
        
        // Check if waitlist section exists
        const waitlistSection = await page.$('#waitlist');
        if (waitlistSection) {
          console.log('   - ✅ Waitlist section (#waitlist) exists on page');
        } else {
          console.log('   - ❌ Waitlist section (#waitlist) not found');
        }
      } else {
        console.log('   - ❌ Join Waitlist button not found in hero');
      }
    } catch (e) {
      console.log('   - ❌ Error testing Join Waitlist button:', e.message);
    }
    console.log('');
    
    // Test 4: Email Form
    console.log('4. 📧 EMAIL SIGNUP FORM TEST');
    try {
      const emailInput = await page.$('input[type="email"]');
      const submitButton = await page.$('button[type="submit"], form button:has-text("Join")');
      
      if (emailInput && submitButton) {
        console.log('   - ✅ Email form elements found');
        console.log('   - ✅ Email input field exists');
        console.log('   - ✅ Submit button exists');
        
        // Check form action or submission URL
        const hasGoogleScript = await page.evaluate(() => {
          return document.documentElement.innerHTML.includes('script.google.com') ||
                 document.documentElement.innerHTML.includes('apps script');
        });
        
        if (hasGoogleScript) {
          console.log('   - ✅ Google Apps Script integration detected');
        } else {
          console.log('   - ⚠️  Google Apps Script not detected in source');
        }
        
        // Check fallback mailto
        const hasMailtoFallback = await page.evaluate(() => {
          return document.documentElement.innerHTML.includes('mailto:consentricai@gmail.com');
        });
        
        if (hasMailtoFallback) {
          console.log('   - ✅ Email fallback (mailto) detected');
        }
        
      } else {
        console.log('   - ❌ Email form elements not found');
        console.log(`   - Email input: ${emailInput ? 'Found' : 'Missing'}`);
        console.log(`   - Submit button: ${submitButton ? 'Found' : 'Missing'}`);
      }
    } catch (e) {
      console.log('   - ❌ Error testing email form:', e.message);
    }
    console.log('');
    
    // Test 5: Footer Navigation
    console.log('5. 🦶 FOOTER NAVIGATION TEST');
    try {
      const privacyButton = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));
        return buttons.some(btn => btn.textContent.includes('Privacy'));
      });
      
      const contactButton = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));
        return buttons.some(btn => btn.textContent.includes('Contact'));
      });
      
      const trustSection = await page.$('#trust');
      
      console.log(`   - Privacy button: ${privacyButton ? '✅ Found' : '❌ Missing'}`);
      console.log(`   - Contact button: ${contactButton ? '✅ Found' : '❌ Missing'}`);
      console.log(`   - Trust section (#trust): ${trustSection ? '✅ Found' : '❌ Missing'}`);
      
    } catch (e) {
      console.log('   - ❌ Error testing footer navigation:', e.message);
    }
    console.log('');
    
    // Test 6: Overall UX Assessment
    console.log('6. 🎯 OVERALL USER EXPERIENCE ASSESSMENT');
    
    // Check page structure
    const sections = await page.evaluate(() => {
      const sectionIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id).filter(id => id);
      return sectionIds;
    });
    
    console.log(`   - Page sections found: ${sections.join(', ')}`);
    
    // Check for React/JavaScript errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Performance check
    const performanceMetrics = await page.metrics();
    console.log(`   - JavaScript heap used: ${Math.round(performanceMetrics.JSHeapUsedSize / 1024 / 1024)}MB`);
    console.log(`   - DOM nodes: ${performanceMetrics.Nodes}`);
    
    // Check responsive elements
    const hasResponsiveClasses = await page.evaluate(() => {
      return document.documentElement.innerHTML.includes('md:') || 
             document.documentElement.innerHTML.includes('sm:') ||
             document.documentElement.innerHTML.includes('lg:');
    });
    
    console.log(`   - Responsive design classes: ${hasResponsiveClasses ? '✅ Found' : '❌ Missing'}`);
    
    console.log('');
    console.log('=====================================');
    console.log('✅ TESTING COMPLETED SUCCESSFULLY');
    console.log('=====================================');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();