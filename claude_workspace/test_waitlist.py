#!/usr/bin/env python3
"""
Test the Google Apps Script API for the waitlist functionality
"""
import requests
import json

GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYcC41d-I0Lfn1dZeNqY5Uk7DOp1rfqD-tvtFMbIZUcFrGVUvvoIO915msC2PHOkTM/exec'

def test_api():
    print("Testing Google Apps Script API...")
    
    test_email = "test@example.com"
    
    try:
        response = requests.post(
            GOOGLE_APPS_SCRIPT_URL,
            headers={'Content-Type': 'application/json'},
            json={'email': test_email},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"Response Text: {response.text}")
        
        if response.status_code == 200:
            try:
                result = response.json()
                print(f"JSON Response: {result}")
                
                if result.get('success'):
                    print("✅ API is working correctly!")
                else:
                    print(f"❌ API returned error: {result.get('message', 'Unknown error')}")
                    
            except json.JSONDecodeError:
                print("❌ Response is not valid JSON")
        else:
            print(f"❌ HTTP error: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")

if __name__ == "__main__":
    test_api()