import json
import os
import urllib.request

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the JSON data
with open(os.path.join(script_dir, 'achievements.json'), 'r') as f:
    data = json.load(f)

# Create the images directory if it doesn't exist
images_dir = os.path.join(script_dir, 'images')
if not os.path.exists(images_dir):
    os.makedirs(images_dir)

# Loop through the achievements and download the images
for achievement in data:
    url = achievement['url']
    identifier = achievement['identifier']
    filename = os.path.join(images_dir, f'{identifier}.png')
    try:
        urllib.request.urlretrieve(url, filename)
    except Exception as e:
        print(f'Warning: Failed to download image for achievement {identifier}: {e}')
