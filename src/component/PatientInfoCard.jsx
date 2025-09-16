// components/PatientInfoCard.jsx
import React from 'react';
import conf from '../conf/conf';

const PatientInfoCard = ({ patient }) => {
  if (!patient) return null;

  const BUCKET_ID = conf.appwriteBucketId
  const PROJECT_ID = conf.appwriteProjectId

  const qrUrl = patient.qr_id
    ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${patient.qr_id}/view?project=${PROJECT_ID}`
    : null;


  return (
    <div className="bg-neutral-700 p-6  hover:shadow-green-800 ring-1 hover:ring-green-700 rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Patient Details</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-300">
        <div><span className="font-semibold">Name:</span> {patient.name}</div>
        <div><span className="font-semibold">Age:</span> {patient.age}</div>
        <div><span className="font-semibold">Gender:</span> {patient.gender}</div>
        <div><span className="font-semibold">Contact:</span> {patient.contact}</div>
        <div><span className="font-semibold">Address:</span> {patient.address}</div>
        {/* <div><span className="font-semibold">Blood Group:</span> {patient.address}</div> */}
      </div>


      {qrUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold  text-gray-300 mb-2">Patient QR Code:</h3>
          <img src={qrUrl} alt="Patient QR Code" className="w-32 h-32 object-contain border border-gray-300 rounded" />
          <div className="mt-2">
            <a
              href={qrUrl}
              download={`QR_${patient.name}.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-black transition"
            >
              Download QR Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInfoCard;
