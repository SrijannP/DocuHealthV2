// src/pages/PatientRecord.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from '../component/QrScanner';

const PatientRecord = () => {
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      const patientId = data.split('/').pop(); // Extract ID from scanned QR
      navigate(`/profile/${patientId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-6">
      <h2 className="text-3xl font-bold text-green-500 mb-4">Scan Patient QR Code</h2>
      <div className="w-full max-w-md bg-gray-200 p-4 rounded-lg shadow-lg">
        <QrScanner onScanSuccess={handleScan} />
      </div>
    </div>
  );
};

export default PatientRecord;
