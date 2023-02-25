import PyPDF2
import openai
import time
from pptx import Presentation
from pptx.util import Inches
from pptx.dml.color import RGBColor
from pptx.util import Pt
from PIL import Image
import os

openai.api_key = "YOUR-API-KEY-HERE"
model_engine = "text-davinci-003"
user_prompt = "I want a powerpoint slide header and description from this text in 4 bullet points: "


def generate_summary(pdf_path):
    # Open the PDF file in read binary mode
    with open(pdf_path, 'rb') as pdf_file:
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfFileReader(pdf_file)

        # Get the total number of pages in the PDF file
        num_pages = pdf_reader.getNumPages()

        response_total = ""
        for page_num in range(num_pages):
            page = pdf_reader.getPage(page_num)
            text = page.extractText()
            prompt = user_prompt + text

            completion = openai.Completion.create(
                engine=model_engine,
                prompt=prompt,
                max_tokens=1024,
                n=1,
                stop=None,
                temperature=0.5,
            )

            response = completion.choices[0].text.strip()
            response_total += response + "\n"
            time.sleep(5)

    return response_total





generate_slides('/Users/someshsahu/Downloads/dryrun5.ppt')
os.system("open /Users/someshsahu/Downloads/dryrun5.ppt")