const { chromium } = require('playwright');

async function launchChromeToSheets() {
  console.log('🚀 Launching Chrome browser to Google Sheets...');
  
  try {
    // Try to connect to existing Chrome or launch new one
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome', // Use system Chrome
      args: [
        '--no-sandbox',
        '--disable-web-security',
        '--start-maximized'
      ]
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log('📍 Navigating to Google Sheets...');
    await page.goto('https://sheets.google.com');
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'claude_workspace/google_sheets_screenshot.png'
    });
    
    console.log('✅ Success! Browser opened to Google Sheets');
    console.log('📍 URL:', page.url());
    console.log('📋 Title:', await page.title());
    
    // Keep browser open
    console.log('🔄 Browser will remain open. Press Ctrl+C to close this script.');
    
    // Wait indefinitely
    await new Promise(() => {});
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

launchChromeToSheets();