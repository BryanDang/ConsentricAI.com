// Google Apps Script for ConsentricAI Email Collection
// Paste this into your Google Apps Script editor

function doPost(e) {
  try {
    // Get the spreadsheet (replace with your spreadsheet ID)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the form data
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
    
    // Check if email already exists
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
    
    // Optional: Send confirmation email
    // sendConfirmationEmail(email);
    
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
  // Handle CORS for web requests
  return ContentService
    .createTextOutput('ConsentricAI Waitlist API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Optional: Send confirmation email function
function sendConfirmationEmail(email) {
  const subject = 'Welcome to ConsentricAI Waitlist!';
  const body = `
    Thank you for joining the ConsentricAI waitlist!
    
    We're building the trust-first way to capture conversations with ultrasonic consent signals.
    
    We'll notify you as soon as we're ready to launch.
    
    Best regards,
    The ConsentricAI Team
  `;
  
  // Uncomment to enable email sending
  // GmailApp.sendEmail(email, subject, body);
}