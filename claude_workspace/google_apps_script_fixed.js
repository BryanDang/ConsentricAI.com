// ConsentricAI Waitlist - Google Apps Script (FIXED VERSION)
// Instructions:
// 1. Create a new Google Sheet at https://sheets.google.com
// 2. Name it "ConsentricAI Waitlist" 
// 3. Go to Extensions -> Apps Script
// 4. Replace all code with this script
// 5. Save and deploy as Web App with "Anyone" access

function doPost(e) {
  try {
    // Get the active spreadsheet (the one this script is bound to)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Invalid email address'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check for duplicate emails
    const existingEmails = sheet.getRange('B:B').getValues().flat();
    if (existingEmails.includes(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Email already registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add timestamp and email to sheet
    const timestamp = new Date();
    sheet.appendRow([timestamp, email]);
    
    // Return success response
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
        message: 'Server error: ' + error.toString()
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

// Optional: Function to set up sheet headers
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getRange('A1').getValue() !== 'Timestamp') {
    sheet.getRange('A1').setValue('Timestamp');
    sheet.getRange('B1').setValue('Email');
    sheet.getRange('A1:B1').setFontWeight('bold');
  }
}