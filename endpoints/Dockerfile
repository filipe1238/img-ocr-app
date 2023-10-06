FROM python:3.10

# Install system dependencies
RUN apt-get update && apt-get install -y libgl1-mesa-glx tesseract-ocr

# Create app directory
WORKDIR /endpoints

# Install app dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Bundle app source
COPY . .

EXPOSE 5000
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]

