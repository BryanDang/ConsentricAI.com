# Google Apps Script Setup Guide for ConsentricAI Waitlist

## Step-by-Step Manual Instructions

### Step 1: Create Google Sheet
1. Navigate to https://sheets.google.com
2. Click "+" to create a new blank spreadsheet
3. Rename the sheet to "ConsentricAI Waitlist"
4. Add headers:
   - Cell A1: "Timestamp"
   - Cell B1: "Email"

### Step 2: Open Apps Script Editor
1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. This will open the Google Apps Script editor in a new tab

### Step 3: Replace Default Code
1. Delete the existing `myFunction()` code
2. Copy and paste the provided JavaScript code (see below)
3. Save the script (Ctrl+S or Cmd+S)
4. Name your project "ConsentricAI Waitlist API"

### Step 4: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Configure deployment:
   - **Description**: "ConsentricAI Waitlist API v1"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. You may need to authorize the script - click **Authorize access**
6. Copy the **Web app URL** that appears

### Step 5: Test the Deployment
1. Open the Web app URL in a new browser tab
2. You should see: "ConsentricAI Waitlist API is running"
3. Test with a POST request (use the testing script provided)

## Important Notes

### Security Considerations
- The script validates email format
- Prevents duplicate email entries
- Returns appropriate error messages
- Logs errors for debugging

### Troubleshooting
- If authorization fails, check Google account permissions
- Ensure the Google Sheet is accessible
- Verify the deployment settings match the instructions
- Check the Apps Script execution transcript for errors

### Testing the API
Use the provided test script to verify the API works correctly before integrating with your website.