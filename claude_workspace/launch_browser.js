const { chromium } = require('playwright');

async function launchBrowser() {
  console.log('🚀 Launching visible browser window...');
  
  // Launch browser in headful mode (visible)
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ],
    slowMo: 1000 // Add delay for better visibility
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  console.log('📍 Navigating to Google Sheets...');
  await page.goto('https://sheets.google.com', { waitUntil: 'networkidle' });
  
  console.log('📸 Taking screenshot...');
  await page.screenshot({ 
    path: 'claude_workspace/google_sheets_page.png',
    fullPage: true 
  });
  
  console.log('✅ Browser window is now open and visible!');
  console.log('📍 Current URL:', page.url());
  console.log('📋 Page title:', await page.title());
  
  // Keep the browser open - don't close it
  console.log('🔄 Browser window will remain open for user interaction...');
  console.log('⚠️  Press Ctrl+C to close this script (browser will remain open)');
  
  // Keep the script running so browser stays open
  await new Promise(() => {}); // Infinite wait
}

launchBrowser().catch(console.error);