#!/usr/bin/env python3
"""
Test script for ConsentricAI Google Apps Script API
Run this after deploying your Google Apps Script to verify it works correctly.
"""

import requests
import json

def test_api(web_app_url):
    """Test the Google Apps Script API with various scenarios"""
    
    print("Testing ConsentricAI Waitlist API")
    print("=" * 50)
    
    # Test 1: GET request (should return status message)
    print("Test 1: GET request")
    try:
        response = requests.get(web_app_url)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        print()
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    # Test 2: Valid email submission
    print("Test 2: Valid email submission")
    test_email = "test@example.com"
    try:
        response = requests.post(
            web_app_url,
            json={"email": test_email},
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        print()
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    # Test 3: Duplicate email (should be rejected)
    print("Test 3: Duplicate email submission")
    try:
        response = requests.post(
            web_app_url,
            json={"email": test_email},
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        print()
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    # Test 4: Invalid email format
    print("Test 4: Invalid email format")
    try:
        response = requests.post(
            web_app_url,
            json={"email": "invalid-email"},
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        print()
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    # Test 5: Missing email field
    print("Test 5: Missing email field")
    try:
        response = requests.post(
            web_app_url,
            json={},
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        print()
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    print("All tests completed!")
    print("Check your Google Sheet to verify the valid email was added.")
    return True

def main():
    print("ConsentricAI API Test Script")
    print("Please enter your Google Apps Script Web App URL:")
    web_app_url = input("URL: ").strip()
    
    if not web_app_url:
        print("Error: No URL provided")
        return
    
    if not web_app_url.startswith("https://script.google.com/"):
        print("Warning: URL doesn't look like a Google Apps Script URL")
        confirm = input("Continue anyway? (y/n): ").strip().lower()
        if confirm != 'y':
            return
    
    test_api(web_app_url)

if __name__ == "__main__":
    main()