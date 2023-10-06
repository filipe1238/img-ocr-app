# OCR app for extracting text from images

## Description
This is a simple OCR app that extracts text from images. It uses the Tesseract OCR engine and the pytesseract wrapper for Python. The app is built using the Flask framework. The app has a simple UI that allows the user to upload an image and then displays the extracted text from the image.

## Installation with Docker (requires linux/macOS)
1. Clone the repository
2. Go to the backend directory
3. Run `docker build -t img-endpoints .`
    3.1. If you are using macOS, it's required to adapt the apt-get command in the Dockerfile to use brew instead
4. Go to the frontend directory
5. Run `docker build -t img-client .`
6. Navigate to the root directory
7. Run `docker-compose up`
8. Go to http://localhost:3000/ in your browser

## Installation without Docker
1. Clone the repository
2. Go to the backend directory
3. Run `pip install -r requirements.txt`
4. Run `python app.py`
5. Go to the frontend directory
6. Run `npm install`
7. Run `npm start`
8. Go to http://localhost:3000/ in your browser

## Libraries used
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [pytesseract](https://pypi.org/project/pytesseract/)
- [React Image Crop](https://www.npmjs.com/package/react-image-crop)
- [Axios](https://www.npmjs.com/package/axios)
