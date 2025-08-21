import { chromium } from 'playwright';

async function setupGoogleSheets() {
  // Launch browser with a persistent context to maintain login
  const browser = await chromium.launch({ 
    headless: false,  // Show the browser so we can see authentication steps
    slowMo: 1000      // Slow down actions to see what's happening
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Step 1: Navigating to Google Sheets...');
    await page.goto('https://sheets.google.com');
    
    // Wait a moment for the page to load
    await page.waitForTimeout(3000);
    
    // Take a screenshot to see what we're looking at
    await page.screenshot({ path: 'claude_workspace/google_sheets_landing.png' });
    
    // Check what we see on the page
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
    // Look for common elements that indicate authentication state
    const signInButton = await page.locator('text=Sign in').first().isVisible().catch(() => false);
    const createButton = await page.locator('[aria-label*="Create"], text=Create, [data-tooltip*="Create"]').first().isVisible().catch(() => false);
    const accountButton = await page.locator('[aria-label*="Account"], [data-tooltip*="Account"]').first().isVisible().catch(() => false);
    
    console.log('\n--- Current Page Status ---');
    console.log(`Sign in button visible: ${signInButton}`);
    console.log(`Create button visible: ${createButton}`);
    console.log(`Account button visible: ${accountButton}`);
    
    // Check for authentication prompts
    if (signInButton) {
      console.log('\n🔐 AUTHENTICATION REQUIRED');
      console.log('I can see a "Sign in" button. You need to authenticate with Google.');
      console.log('Please manually sign in to Google in the browser window that opened.');
      console.log('Once you\'re signed in, press Enter in this terminal to continue...');
      
      // Wait for user input
      await new Promise(resolve => {
        process.stdin.once('data', () => {
          resolve();
        });
      });
      
      // Refresh the page after authentication
      await page.reload();
      await page.waitForTimeout(2000);
    }
    
    // Check if we're now authenticated
    const isAuthenticated = await page.locator('[aria-label*="Create"], text=Create, [data-tooltip*="Create"]').first().isVisible().catch(() => false);
    
    if (isAuthenticated) {
      console.log('\n✅ Successfully authenticated! Ready to proceed with spreadsheet creation.');
    } else {
      console.log('\n❌ Still not authenticated. Please check the browser window.');
    }
    
    // Keep the browser open for manual interaction if needed
    console.log('\nBrowser will remain open. Close it manually when done.');
    
  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'claude_workspace/error_screenshot.png' });
  }
}

setupGoogleSheets().catch(console.error);