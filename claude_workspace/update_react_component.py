#!/usr/bin/env python3
"""
Script to update the React CTA component with the Google Apps Script API URL
Run this after you've deployed the Google Apps Script and have the web app URL
"""

import os
import re

def update_react_component(api_url):
    """Update the React CTA component with the new API URL"""
    
    component_file_path = "/Users/admin/Documents/0 Projects/Consentric AI/ConsentricAI.com/src/components/CTA.tsx"
    updated_component_path = "/Users/admin/Documents/0 Projects/Consentric AI/ConsentricAI.com/claude_workspace/updated_CTA_component.tsx"
    
    if not os.path.exists(component_file_path):
        print(f"Error: React component file not found at {component_file_path}")
        return False
    
    if not os.path.exists(updated_component_path):
        print(f"Error: Updated component template not found at {updated_component_path}")
        return False
    
    # Read the updated component template
    with open(updated_component_path, 'r') as file:
        updated_content = file.read()
    
    # Replace the placeholder URL with the actual API URL
    updated_content = updated_content.replace('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE', api_url)
    
    # Create a backup of the original file
    backup_path = component_file_path + '.backup'
    with open(component_file_path, 'r') as original:
        with open(backup_path, 'w') as backup:
            backup.write(original.read())
    
    print(f"✅ Created backup at: {backup_path}")
    
    # Write the updated component
    with open(component_file_path, 'w') as file:
        file.write(updated_content)
    
    print(f"✅ Successfully updated React component with API URL: {api_url}")
    
    return True

def main():
    print("ConsentricAI React Component Update Script")
    print("=" * 50)
    
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
    
    success = update_react_component(api_url)
    
    if success:
        print("\n✅ React component updated successfully!")
        print("\nWhat's changed:")
        print("- Added proper API integration with Google Apps Script")
        print("- Added loading states and error handling")
        print("- Added email validation and duplicate detection")
        print("- Added user-friendly success/error messages")
        print("- Added loading spinner during form submission")
        print("\nTo test the integration:")
        print("1. Start your React development server")
        print("2. Test the waitlist form on your website")
        print("3. Check your Google Sheet to verify emails are being collected")
        print("\nTo test the API directly, run:")
        print("python3 claude_workspace/test_api.py")
    else:
        print("\n❌ Failed to update React component.")
        print("Please check the file paths and try again.")

if __name__ == "__main__":
    main()