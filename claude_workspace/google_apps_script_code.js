// Google Apps Script for ConsentricAI Email Collection
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    
    if (!email || !isValidEmail(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Invalid email address'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const existingEmails = sheet.getRange('B:B').getValues().flat();
    if (existingEmails.includes(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Email already registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const timestamp = new Date();
    sheet.appendRow([timestamp, email]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Successfully added to waitlist'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Server error'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('ConsentricAI Waitlist API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}