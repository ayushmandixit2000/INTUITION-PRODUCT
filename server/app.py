from flask import Flask, request
from flask_cors import CORS
from processor import summarise

app = Flask(__name__)
CORS(app)

@app.route('/paperUpload', methods=['POST'])
def upload_pdf():
    # Get the PDF file from the request
    pdf_file = request.files['pdf_file']

    if pdf_file:
        # Save the PDF file to a designated directory on the server
        pdf_file.save('/Users/advait/Desktop/intuition_tests/server/papers/' + pdf_file.filename)
        output = summarise(pdf_file.filename)

        # Return a success message to the client
        return output
    else:
        # Return an error message to the client
        return 'No PDF file was uploaded.'


