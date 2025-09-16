from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
from io import BytesIO
from appwrite.client import Client
from appwrite.services.storage import Storage
import uuid

app = Flask(__name__)
CORS(app)

# Appwrite configuration
client = Client()
client.set_endpoint("https://cloud.appwrite.io/v1")  # Change if self-hosted
client.set_project("your_project_id") 
client.set_key("your_api_key")

storage = Storage(client)



@app.route('/submit', methods=['OPTIONS'])
def handle_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response


@app.route('/submit', methods=['POST'])
def handle_form():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    # name = data.get("name")
    # age = data.get("age")
    # gender = data.get("gender")
    # contact = data.get("contact")
    # address = data.get("address")

    patient_id = str(uuid.uuid4())  # Example: "e4f98db1-9c52-4c3e-89c2-021b6a6b6dcd"

    # Generate a unique URL for the patient
    details_url = f"https://yourwebsite.com/user/{patient_id}"
    # Generate QR code

    qr = qrcode.make(details_url)

    # Convert to byte stream
    qr_bytes = BytesIO()
    qr.save(qr_bytes, format="PNG")
    qr_bytes.seek(0)

    # Upload QR to Appwrite Storage
    response = storage.create_file("your_bucket_id", "unique()", qr_bytes)

    return jsonify({"message": "QR code created successfully!", "qr_id": response['$id'], "patient_id": patient_id }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

