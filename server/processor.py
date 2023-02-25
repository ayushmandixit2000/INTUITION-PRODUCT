import PyPDF2
import openai
import time
from pikepdf import Pdf, Name, PdfImage
import os

openai.api_key = "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"
model_engine = "text-davinci-003"
user_prompt = "Generate a powerpoint slide header and 4 bullet points that are at most 2 sentences long for this text: "

def summarise(name):

    # Open the PDF file in read binary mode
    pdf_file_download = open(f'/Users/advait/Desktop/gitpositories/INTUITION-PRODUCT/server/papers/{name}', 'rb')

    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file_download)

    # Get the total number of pages in the PDF file
    num_pages = len(pdf_reader.pages)

    # Create a text file to write the converted text
    text_file_download = open(f'/Users/advait/Desktop/gitpositories/INTUITION-PRODUCT/server/output/{name}.txt', 'w')

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
        responseTotal.append(response)

    # Close the files
    pdf_file_download.close()
    text_file_download.close()

    return responseTotal

def extract_images(name):
    folder_path = '/Users/advait/Desktop/gitpositories/INTUITION-PRODUCT/server/images'
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path) # delete the file
            elif os.path.isdir(file_path):
                os.rmdir(file_path) # delete the folder
        except Exception as e:
            print(f"Failed to delete {file_path}. Reason: {e}")

    old_pdf = Pdf.open(f"/Users/advait/Desktop/gitpositories/INTUITION-PRODUCT/server/papers/{name}")
    imagenames = []
    for i in range(len(old_pdf.pages)):
        page_1 = old_pdf.pages[i]
        if (list(page_1.images.keys()) != []):
            imagenames.append((list(page_1.images.keys())))
            count = 1
            for x in page_1.images.keys():
                raw_image = page_1.images[x]
                pdf_image = PdfImage(raw_image)
                pdf_image.extract_to(fileprefix= folder_path + '/page' + str(i) + 'image' + str(count))
                count+=1

    print(imagenames)