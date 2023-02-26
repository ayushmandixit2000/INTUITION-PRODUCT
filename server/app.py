from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from processor import summarise, extract_images, generate_slides
import os
import io
from chatbot import do_conversation

app = Flask(__name__)
CORS(app)

# Define the root directory of your application
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))

# Define the path to the papers directory relative to the root directory
PAPERS_DIR = os.path.join(ROOT_DIR, 'papers')

# Define the path to the images directory relative to the root directory
IMAGES_DIR = os.path.join(ROOT_DIR, 'images')

@app.route('/getSummary', methods=['POST'])
def get_summary():
    pdf_file = request.files['pdf_file']

    if pdf_file:
        # Save the PDF file to the papers directory
        pdf_file.save(os.path.join(PAPERS_DIR, pdf_file.filename))
        output = summarise(pdf_file.filename)
        extract_images(pdf_file.filename)

        # Return a success message to the client
        return output
    else:
        # Return an error message to the client
        return 'No PDF file was uploaded.'

@app.route('/getPPT', methods=['POST'])
def generate_pptx():
    # Get the list of objects from the request body
    my_list = request.json.get('my_list')

    prs = generate_slides(my_list)

    # Save the PowerPoint presentation to a file
    pptx_file = io.BytesIO()
    prs.save(pptx_file)
    pptx_file.seek(0)

    # Return the PowerPoint file as a download
    return send_file(pptx_file, download_name='my_pptx.pptx', as_attachment=True)

@app.route('/api/images/<path:image_filename>')
def serve_image(image_filename):
    return send_from_directory(IMAGES_DIR, image_filename)

@app.route('/api/get_image_urls')
def get_image_urls():
    # Get the file paths of all the images in the images directory
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

    image_files = [f for f in os.listdir(IMAGES_DIR) if os.path.isfile(os.path.join(IMAGES_DIR, f)) and os.path.splitext(f)[1].lower() in image_extensions]
    image_filenames = [f for f in image_files]

    # Construct the image URLs relative to the root directory
    image_urls = [f'{request.host_url}api/images/{image_path}' for image_path in image_filenames]

    # Return the image URLs as a JSON object
    return jsonify({'imageUrls': image_urls})

@app.route('/talkToMe', methods=['POST'])
def talk_to_me():
    # Get the user's message
    user_message = request.json['userInput']

    # Get the bot's response
    bot_response = do_conversation(user_message)

    # Return the bot's response as a JSON object
    return jsonify({'botResponse': bot_response})