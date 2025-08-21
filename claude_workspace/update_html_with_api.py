#!/usr/bin/env python3
"""
Script to update the HTML file with the Google Apps Script API URL
Run this after you've deployed the Google Apps Script and have the web app URL
"""

import os
import re

def update_html_file(api_url):
    """Update the HTML file with the new API URL"""
    
    html_file_path = "/Users/admin/Documents/0 Projects/Consentric AI/ConsentricAI.com/sandbox/concentric-ai-landing.html"
    
    if not os.path.exists(html_file_path):
        print(f"Error: HTML file not found at {html_file_path}")
        return False
    
    # Read the current HTML file
    with open(html_file_path, 'r') as file:
        html_content = file.read()
    
    # Look for the GOOGLE_APPS_SCRIPT_URL constant
    # This pattern matches our current URL placeholder
    pattern = r"const GOOGLE_APPS_SCRIPT_URL = ['\"]([^'\"]*)['\"];"
    
    # Find current API URL
    match = re.search(pattern, html_content)
    if match:
        current_url = match.group(1)
        print(f"Found current API URL: {current_url}")
        
        # Replace with new URL
        updated_content = html_content.replace(current_url, api_url)
        
        # Write back to file
        with open(html_file_path, 'w') as file:
            file.write(updated_content)
        
        print(f"✅ Successfully updated HTML file with new API URL: {api_url}")
        return True
    else:
        print("❌ Could not find fetch URL pattern in HTML file")
        print("You may need to manually update the API URL in the JavaScript code")
        return False

def main():
    print("ConsentricAI HTML Update Script")
    print("=" * 40)
    
    print("Please enter your Google Apps Script Web App URL:")
    api_url = input("URL: ").strip()
    
    if not api_url:
        print("Error: No URL provided")
        return
    
    if not api_url.startswith("https://script.google.com/"):
        print("Warning: URL doesn't look like a Google Apps Script URL")
        print("Expected format: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec")
        confirm = input("Continue anyway? (y/n): ").strip().lower()
        if confirm != 'y':
            return
    
    success = update_html_file(api_url)
    
    if success:
        print("\n✅ HTML file updated successfully!")
        print("You can now test your waitlist form on the website.")
        print("\nTo test the API directly, run:")
        print("python3 claude_workspace/test_api.py")
    else:
        print("\n❌ Failed to update HTML file automatically.")
        print(f"Please manually update the fetch URL in index.html to: {api_url}")

if __name__ == "__main__":
    main()