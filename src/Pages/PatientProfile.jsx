// pages/PatientProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientInfoCard from '../component/PatientInfoCard';
import RecordList from '../component/RecordList';
import NewRecordForm from '../component/NewRecordForm';
import appwriteService from '../Appwrite/config'

const PatientProfile = () => {
  const { patientId } = useParams(); // patientId comes from URL after scanning QR
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);


  //patient konsa h
  const fetchPatientDetails = async () => {
    appwriteService.getUser(patientId)
    .then((user)=>{
        if(user){
            setPatient(user)
        }
    })
    .catch((error)=>{
      console.log("Can't find user => ");
      console.log(error);
    })
  };

  //uss patient ke posts
  const fetchRecords = async () => {
    appwriteService.getPosts(patientId)
    .then((records)=>{
        setRecords(records.documents)
        setLoading(false)
    })
    .catch((error)=>{
      console.log("Can't fetch record => ");
      console.log(error);
    })
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchRecords();   
  }, [patientId]);


  const handleRecordAdded = () => {
    fetchRecords(); // refresh list after new entry
  };



  if (loading) {
    return <div className="p-8 text-gray-700 text-lg">Loading patient profile...</div>;
  }

  return (
    <div className='bg-neutral-800'>
    <div className=" max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-green-500">Patient Profile</h1>
      <PatientInfoCard patient={patient} />
      <RecordList records={records} />
      <NewRecordForm patientId={patientId} onRecordAdded={handleRecordAdded} />
    </div>
    </div>
  );
};

export default PatientProfile;
