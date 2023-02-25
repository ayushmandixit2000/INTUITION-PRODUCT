import requests
from bs4 import BeautifulSoup
import requests
import nltk

paragraph = "Powerpoint Slide Header: ExpressED Improves Learning Outcomes for Children with ASD - Helps children with ASD develop the ability to recognize emotion from human expressions - Enhances their ability to communicate and socialize with people - Aids in their transition into adulthood and integration into society - Allows for greater independence and success in the workforce"

# Tokenize the paragraph into individual words
tokens = nltk.word_tokenize(paragraph)

# Perform part-of-speech tagging to identify nouns
pos_tags = nltk.pos_tag(tokens)

# Extract the nouns from the paragraph
nouns = [word for word, pos in pos_tags if pos.startswith('N')]

# Take the first noun as the summary
summary = nouns[0]

print(summary)

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
