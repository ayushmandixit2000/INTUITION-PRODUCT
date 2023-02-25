import PyPDF2
from io import StringIO
import io
from urllib.request import urlopen, Request
from PyPDF2 import PdfFileReader
import openai
import time

openai.api_key = "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"
model_engine = "text-davinci-003"
user_prompt = "I want a powerpoint slide header and description from this text in 4 bullet points: "

def summarise(name):

    # Open the PDF file in read binary mode
    pdf_file_download = open(f'/Users/advait/Desktop/intuition_tests/server/papers/{name}', 'rb')

    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file_download)

    # Get the total number of pages in the PDF file
    num_pages = len(pdf_reader.pages)

    # Create a text file to write the converted text
    text_file_download = open(f'/Users/advait/Desktop/intuition_tests/server/output/{name}.txt', 'w')

    responseTotal = []
    for page_num in range(num_pages):
        page = pdf_reader.pages[page_num]
        text = page.extract_text()
        print("new page \n",text)
        text_file_download.write(text)
        prompt = user_prompt + text

        completion = openai.Completion.create(
            engine = model_engine,
            prompt = prompt,
            max_tokens = 1024,
            n = 1,
            stop = None,
            temperature = 0.5,
        )

        response = completion.choices[0].text
        print(response + "\n")
        time.sleep(5)
        responseTotal.append(response)

    # Close the files
    pdf_file_download.close()
    text_file_download.close()

    return responseTotal
