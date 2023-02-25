import requests
from bs4 import BeautifulSoup
import requests
import nltk


url = "https://en.wikipedia.org/wiki/jesus"

# Fetch the HTML content of the webpage
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

# Find the infobox table on the page
infobox = soup.find('table', {'class': 'infobox'})

if infobox is not None:
    # Find the first image in the infobox
    img = infobox.find('img')

    if img is not None:
        # If an image is found, print its URL
        img_url = 'https:' + img['src']
        print("The URL of the image in the infobox is:", img_url)
    else:
        # If no image is found in the infobox, print a message
        print("No image found in the infobox.")
else:
    # If no infobox is found on the page, print a message
    print("No infobox found on the page.")


url = img_url

response = requests.get(url)

if response.status_code == 200:
    # If the GET request is successful, write the image content to a file
    open("image.jpg", "wb").write(response.content)
    print("Image downloaded successfully!")
else:
    # If the GET request is not successful, print an error message
    print("Failed to download image.")
