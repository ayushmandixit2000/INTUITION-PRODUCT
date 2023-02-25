from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from processor import summarise, extract_images
import os

# Replace this with the base URL of your backend API
base_url = 'http://127.0.0.1:5000/'

app = Flask(__name__)
CORS(app)

@app.route('/getSummary', methods=['POST'])
def get_summary():
    # Get the PDF file from the request
    pdf_file = request.files['pdf_file']

    if pdf_file:
        # Save the PDF file to a designated directory on the server
        pdf_file.save('/Users/advait/Desktop/gitpositories/INTUITION-PRODUCT/server/papers/' + pdf_file.filename)
        output = summarise(pdf_file.filename)
        extract_images(pdf_file.filename)

        # Return a success message to the client
        return output
    else:
        # Return an error message to the client
        return 'No PDF file was uploaded.'

# Replace this with the path to the folder containing the images
folder_path = '/Users/advait/Desktop/gitpositories/INTUITION-PRODUCT/server/images'

@app.route('/api/images/<path:image_filename>')
def serve_image(image_filename):
    return send_from_directory(folder_path, image_filename)

@app.route('/api/get_image_urls')
def get_image_urls():
    # Get the file paths of all the images in the folder
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

    image_files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and os.path.splitext(f)[1].lower() in image_extensions]
    image_filenames = [f for f in image_files]

    image_urls = [f'http://127.0.0.1:5000/api/images/{image_path}' for image_path in image_filenames]
    print(image_urls)
    # Return the image URLs as a JSON object
    return jsonify({'imageUrls': image_urls})

