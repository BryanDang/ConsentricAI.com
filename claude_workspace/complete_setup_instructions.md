# Complete Google Apps Script Setup for ConsentricAI Waitlist

## Overview
This guide will help you set up Google Apps Script to collect email addresses from your ConsentricAI waitlist form and store them in a Google Sheet.

## Step 1: Create Google Sheet
1. Go to https://sheets.google.com
2. Click "+" to create a new blank spreadsheet
3. Rename the sheet to "ConsentricAI Waitlist"
4. Add headers:
   - Cell A1: "Timestamp"
   - Cell B1: "Email"

## Step 2: Set Up Google Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete the existing `myFunction()` code
3. Copy and paste the code from `claude_workspace/google_apps_script_code.js`
4. Save the script (Ctrl+S or Cmd+S)
5. Name your project "ConsentricAI Waitlist API"

## Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Configure deployment:
   - **Description**: "ConsentricAI Waitlist API v1"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. You may need to authorize the script - click **Authorize access**
6. **IMPORTANT**: Copy the Web app URL that appears (you'll need this for the next step)

## Step 4: Update Your React Component
1. Run the update script:
   ```bash
   python3 claude_workspace/update_react_component.py
   ```
2. Enter your Google Apps Script Web App URL when prompted
3. The script will automatically update your CTA component with the new API integration

## Step 5: Test Your Setup
1. Test the API directly:
   ```bash
   python3 claude_workspace/test_api.py
   ```
2. Start your React development server and test the form on your website
3. Check your Google Sheet to verify emails are being collected

## What's Included

### Google Apps Script Features:
- ✅ Email validation
- ✅ Duplicate email prevention
- ✅ Automatic timestamping
- ✅ JSON API responses
- ✅ Error handling and logging
- ✅ CORS support for web requests

### React Component Updates:
- ✅ API integration with Google Apps Script
- ✅ Loading states during form submission
- ✅ User-friendly success/error messages
- ✅ Email validation and duplicate detection
- ✅ Loading spinner for better UX
- ✅ Proper error handling for network issues

### Testing Tools:
- ✅ API test script to verify functionality
- ✅ Comprehensive test cases for all scenarios
- ✅ Easy-to-use update scripts

## Files Created
- `claude_workspace/google_apps_script_code.js` - The Google Apps Script code
- `claude_workspace/updated_CTA_component.tsx` - Enhanced React component
- `claude_workspace/test_api.py` - API testing script
- `claude_workspace/update_react_component.py` - Component update script
- `claude_workspace/google_apps_script_setup_guide.md` - Detailed setup guide

## API Endpoints

### POST Request (Submit Email)
```javascript
fetch(YOUR_WEB_APP_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
})
```

**Success Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist"
}
```

**Error Responses:**
```json
{
  "success": false,
  "message": "Invalid email address"
}
```

```json
{
  "success": false,
  "message": "Email already registered"
}
```

### GET Request (Health Check)
```javascript
fetch(YOUR_WEB_APP_URL)
```

**Response:**
```
ConsentricAI Waitlist API is running
```

## Security Features
- Email format validation using regex
- Duplicate email prevention
- Error logging for debugging
- No sensitive data exposure
- CORS-enabled for web requests

## Troubleshooting

### Common Issues:
1. **Authorization failed**: Check Google account permissions
2. **Script not accessible**: Verify deployment settings ("Anyone" access)
3. **Emails not appearing**: Check the Google Sheet permissions
4. **CORS errors**: Ensure the script is deployed as a web app, not just saved

### Getting Help:
- Check the Apps Script execution transcript for detailed error logs
- Verify the Google Sheet is accessible and has the correct headers
- Test the API using the provided test script before integrating with your website

## Next Steps
1. Complete the manual setup following this guide
2. Run the update script to integrate with your React component
3. Test thoroughly using the provided testing tools
4. Monitor your Google Sheet for incoming email signups

Your ConsentricAI waitlist will be ready to collect email addresses securely and efficiently!