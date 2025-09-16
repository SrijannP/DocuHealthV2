// components/RecordList.jsx
import React from 'react';
import conf  from '../conf/conf';

const RecordList = ({ records }) => {

  const BUCKET_ID = conf.appwriteBucketId
  const PROJECT_ID = conf.appwriteProjectId

  if (!records || records.length === 0) {
    return <div className="bg-neutral-700 p-6 hover:shadow-green-800 ring-1 ring-black  hover:ring-green-700  rounded-2xl shadow-md mb-6 text-center text-gray-300">No previous records found</div>;
  }

  return (
    
    <div className="bg-neutral-700 p-6  hover:shadow-green-800 ring-1 hover:ring-green-700  rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Previous Health Records</h2>
      <ul className="space-y-4">
        {
          console.log(records)
          
        }
        {records.map((record) => (
          <li key={record.$id} className="border p-4 rounded-lg ring-1 ring-black  text-gray-300 shadow-sm bg-neutral-600">
            <p><span className="font-semibold ">Doctor:</span> {record.doctorName}</p>
            <p><span className="font-semibold">Date:</span> {new Date(record.appointmentdate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Remarks:</span> {record.remarks}</p>
            {record.prescriptionId && (
              <a
                href={`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${record.prescriptionId}/view?project=${PROJECT_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline"
              >
                View Prescription
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
