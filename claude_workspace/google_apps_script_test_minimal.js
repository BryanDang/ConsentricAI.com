// MINIMAL TEST VERSION - Google Apps Script
// This tests if POST requests work without any sheet operations
// Replace ALL code in your Google Apps Script with this temporarily

function doPost(e) {
  try {
    // Check if we received POST data
    const hasPostData = e && e.postData && e.postData.contents;
    
    if (hasPostData) {
      const data = JSON.parse(e.postData.contents);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'POST test successful! Received email: ' + (data.email || 'no email'),
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'No POST data received',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('ConsentricAI Waitlist API is running - Test Mode')
    .setMimeType(ContentService.MimeType.TEXT);
}