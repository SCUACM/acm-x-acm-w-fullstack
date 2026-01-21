import requests

# Define the API endpoint URL
url = "https://jsonplaceholder.typicode.com/comments/1"

try:
    # Attempt to make the API call
    response = requests.get(url, timeout=5) # Set a timeout to prevent infinite waits
    
    # Raise an exception for bad status codes (4xx or 5xx)
    response.raise_for_status()
    
    # If successful, parse and return the JSON data
    print(response.json())

except requests.exceptions.RequestException as e:
    # Handle any other general exception from the requests library
    print(f"Error: An unexpected request error occurred. {e}")