from dotenv import load_dotenv
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import ocrService

load_dotenv()
app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'  # Create a directory named 'uploads' in your Flask project folder

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part"
    file = request.files['file']
    if file.filename == '':
        return "No selected file"
    # transform the file to an cv2 image
    cv2Img = ocrService.fileToCv2Img(file)
    # read the image and return the text
    text = ocrService.readImage(cv2Img)
    return text

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)