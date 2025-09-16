import React, { useState } from 'react'
import axios from 'axios'
import appwriteService from '../Appwrite/config'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'

function Register() {

    const [formData, setFormData] = useState(
        {
            name: "",
            age: "",
            gender: "",
            contact: "",
            address: "",
        }
    )
    // const [qrval, setQrval] = useState("")
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const [qrUrl, setQrUrl] = useState('');
    const [fileId, setFileId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const response = await fetch("http://localhost:5000/submit", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(dataF),
        //     mode: 'cors',
        // })
        // .then(response=>response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error("Error hai:",error))


        //y kaam krrha tha
        // try {
        //     const response = await axios.post('http://127.0.0.1:5000/submit', formData);
        //     console.log(response.data)
        //     setQrval(response.data)
        //     handleReg();
        // } catch (error) {
        //     console.error("There was an error submitting the form!", error);
        // }


        //trying to get rid of python
        const patientId = crypto.randomUUID(); // Unique ID
        const qrData = `https://yourwebsite.com/user/${patientId}`;

        try {
            const qrDataUrl = await QRCode.toDataURL(qrData);

            const blob = await (await fetch(qrDataUrl)).blob();
            const file = new File([blob], `${patientId}.png`, { type: 'image/png' });


            const fileResponse = await appwriteService.uploadFile(file);
            console.log(`before ${fileResponse.$id}`);
            setQrUrl(qrDataUrl);
            setFileId(fileResponse.$id);
            console.log(`after ${fileId}`);
            
            

            await handleReg(patientId,fileResponse.$id);
        }

        catch (error) {
            console.error('QR Upload Failed:', error);
        }
    }

    const handleReg = async (patientId,qrfileId) => {
        try {
            console.log(`file id is ${fileId}`);
            
            await appwriteService.createUser({
                ...formData,
                age : parseInt(formData.age),
                patient_id: patientId,
                qr_id: qrfileId,
            });

            // ✅ Navigate to profile page with correct ID
            navigate(`/profile/${patientId}`);
        } catch (err) {
            console.error("Appwrite user creation failed:", err);
        }
    }


    //return krna h

    return (
        <div className="flex justify-center  items-center min-h-screen w-full bg-neutral-800 ">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full border-2 flex justify-center border-green-700 shadow-green-700 shadow-0 m-4">
                <div className='w-2/3'>
                    <h2 className="text-3xl text-green-700 font-bold mb-6  text-center">Patient Registration</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border  bg-gray-300  border-gray-300 rounded"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-2 border  bg-gray-300 border-gray-300 rounded"
                            required
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border  bg-gray-300 border-gray-300 rounded"
                            required
                        >
                            <option value="" >Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact Number"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full p-2 border  bg-gray-300 border-gray-300 rounded"
                            required
                        />
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border  bg-gray-300 border-gray-300 rounded"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 rounded hover:bg-black hover:border-green-700"
                        >
                            Register Patient
                        </button>
                    </form>
                </div>
                <div className='m-4  w-1/3 flex items-center justify-center max-[820px]:hidden'>
                    <img className='w-full ' src="../../Resources/doctor_logo_2.png" alt="Doctor Logo" />
                </div>
            </div>
        </div>
    )
}

export default Register