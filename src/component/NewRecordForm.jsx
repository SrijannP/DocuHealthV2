// components/NewRecordForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { ID } from 'appwrite';  
import appwriteServices from '../Appwrite/config'

const NewRecordForm = ({ patientId, onRecordAdded }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let uploadedFileId = null;

      if (data.prescription[0]) {
        const res= await appwriteServices.uploadFile(data.prescription[0])
          uploadedFileId = res.$id;
          console.log("prescription uploaded");  
      }

      await appwriteServices.createPost({
        ...data,
        user_id : patientId,
        prescriptionId : uploadedFileId
      })
      .then(()=>reset())
      .then(()=>onRecordAdded()) // callback to refresh record list
    } catch (err) {
      console.error("Failed to add record", err);
    }
  };

  return (
    <div className="bg-neutral-700 p-6  hover:shadow-green-800 ring-1 hover:ring-green-700 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Add New Health Record</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium  text-gray-300">Doctor Name : </label>
          <input
            type="text"
            {...register("doctorName", { required: true })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium  text-gray-300">Appointment Date : </label>
          <input
            type="date"
            {...register("appointmentdate", { required: true })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium  text-gray-300">Remarks : </label>
          <textarea
            {...register("remarks")}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium  text-gray-300">Upload Prescription : </label>
          <input
            type="file"
            {...register("prescription")}
            className="w-full  text-gray-300 p-3"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-black"
        >
          Save Record
        </button>
      </form>
    </div>
  );
};

export default NewRecordForm;
