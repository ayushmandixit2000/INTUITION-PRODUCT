from pikepdf import Pdf, Name, PdfImage
import os

folder_path = '/Users/rajeshkumar/Desktop/ImagesForHack'
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path) # delete the file
        elif os.path.isdir(file_path):
            os.rmdir(file_path) # delete the folder
    except Exception as e:
        print(f"Failed to delete {file_path}. Reason: {e}")



old_pdf = Pdf.open("/Users/rajeshkumar/Desktop/Ebola.pdf")
imagenames = []
for i in range(len(old_pdf.pages)):
    page_1 = old_pdf.pages[i]
    if (list(page_1.images.keys()) != []):
        imagenames.append((list(page_1.images.keys())))
        count = 1
        for x in page_1.images.keys():
            raw_image = page_1.images[x]
            pdf_image = PdfImage(raw_image)
            pdf_image.extract_to(fileprefix='/Users/rajeshkumar/Desktop/ImagesForHack/' + 'page' + str(i) + 'image' + str(count))
            count+=1
print(imagenames)
        


