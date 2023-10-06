from PIL import Image
import pytesseract
import numpy as np
import re
import cv2
import utils.resize as resize

def preprocess_for_ocr(image):
    # gray scale
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # sharpen
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    image = cv2.filter2D(image, -1, kernel)
    #  noise removal
    image = cv2.fastNlMeansDenoising(image, h=30)

    return image


def _imgToText(img):
    text = pytesseract.image_to_string(img)
    # arr = text.split('\n')[0:-1]
    # result = '\n'.join(arr)

    # format the text
    textFormated = re.sub(r'(\n){2,}', '\n', text)
    return textFormated


def readImage(img):
    # img = cv2.imread('uploads/screenshot.png')

    img = preprocess_for_ocr(img)
    # save the image
    img = resize.resizeImg(img, 200)
    return _imgToText(img)

def fileToCv2Img(file):
    img = Image.open(file.stream)
    return np.array(img)
