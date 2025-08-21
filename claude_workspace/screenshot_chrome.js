import { chromium } from 'playwright';

async function takeScreenshot() {
  try {
    console.log('📸 Attempting to take screenshot of Google Sheets...');
    
    // Launch a new browser instance to take screenshot
    const browser = await chromium.launch({
      headless: true // Use headless for screenshot only
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to Google Sheets
    await page.goto('https://sheets.google.com', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait a moment for page to fully load
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'claude_workspace/google_sheets_state.png',
      fullPage: true 
    });
    
    // Get page info
    const url = page.url();
    const title = await page.title();
    
    console.log('✅ Screenshot saved successfully!');
    console.log('📍 Current URL:', url);
    console.log('📋 Page Title:', title);
    
    // Check for sign-in elements
    const signInButton = await page.$('text=Sign in');
    const accountButton = await page.$('[data-ogsr-up]'); // Google account button
    
    if (signInButton) {
      console.log('🔐 Sign-in required - "Sign in" button found');
    } else if (accountButton) {
      console.log('✅ Already signed in - account button found');
    } else {
      console.log('❓ Page state unclear - manual inspection needed');
    }
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Error taking screenshot:', error.message);
  }
}

takeScreenshot();