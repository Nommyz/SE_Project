from PIL import Image, ImageFont, ImageDraw

# Global Variables
FONT_FILE = ImageFont.truetype(r'Back-end/CertificateGenerator/font/Lato-Italic.ttf', 120) #change the font here
FONT_COLOR = "#000000"
template_dir = 'Back-end/CertificateGenerator/template/template2.png'
out_dir = "./Back-end/CertificateGenerator/out/"  # Modify if your output directory should be different
template = Image.open(template_dir)
WIDTH, HEIGHT = template.size

def make_certificates(name):
    '''Function to save certificates as a .png file'''
   
    image_source = Image.open(template_dir)
    draw = ImageDraw.Draw(image_source)

    # Finding the width of the text 
    name_width = draw.textlength(name, font=FONT_FILE)

    # Placeholder for name_height (or calculate differently if needed)
    name_height = 100  

    # Placing it in the center, then making some adjustments if somewhere else set value here.
    draw.text(((WIDTH - name_width) / 2, (HEIGHT - name_height) / 2 - 30), name, fill=FONT_COLOR, font=FONT_FILE)

    # Saving the certificates in a different directory.
    image_source.save(out_dir + name +".png")
    print('Saving Certificate of:', name)      

if __name__ == "__main__":

    names = ['Mr.ohm', "Full Name"]
    for name in names:
        make_certificates(name)

    print(len(names), "certificates done.")

