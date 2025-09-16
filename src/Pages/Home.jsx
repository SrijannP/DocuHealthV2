// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'


// function Home() {

//     const navigate = useNavigate()

//     const handleClick1 = async()=>{
//         navigate('/register')
//     }
//     const handleClick2 = async()=>{
//         navigate('/record')
//     }

//     return (
//         <>
//             <div className="flex items-center min-h-screen w-full bg-neutral-800 "><p>Welcome to Smart Health Records</p>
//                 Manage patient information and medical history with ease and security. Our platform simplifies the process of storing, accessing, and updating patient data through a digital interface backed by powerful cloud infrastructure.
//                 <p>Why Use This System?</p>
//                 📌 Register Patients Instantly: Capture new patient information and generate a unique QR code for each profile.
//                 📲 Scan and Access: Quickly scan a patient’s QR to instantly access their full medical profile and records.
//                 🧾 Maintain Health History: View and update past and current appointment details, prescriptions, and doctor's notes—securely stored in the cloud.
//                 <p>Key Features</p>
//                 🔐 Secure & Reliable: Built on Appwrite cloud backend to ensure privacy and data protection.
//                 🧑‍⚕️ Doctor-Friendly Interface: Fast entry of appointment records with file upload for prescriptions and remark sections.
//                 📎 QR-Enabled Access: Patients carry a unique QR that links to their medical data—no searching, no delays.
//                 <p>Get Started</p>
//                 ✳️ New Patient? Head over to the Patient Registration page to create a digital record and receive a unique QR code.
//                 ✅ Existing Patient? Scan the QR to view the profile, browse past records, and add new appointment details.
//             </div>
//             {/* <div className='bg-gray-600' onClick={handleClick1}>
//                 This is button to register.
//             </div> */}
//             {/* <div className='bg-gray-900' onClick={handleClick2}>
//                 RecordLook Up.
//             </div> */}
//         </>


//     )
// }

// export default Home

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const handleClick1 = async () => {
        navigate('/register')
    }

    const handleClick2 = async () => {
        navigate('/record')
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen w-full pt-6  px-8 bg-neutral-700 text-white">
                <h1 className="text-3xl font-bold mb-4 text-center">Welcome to DocuHeath - Smart Health Records</h1>
                
                <p className="mb-4 text-center max-w-3xl">
                    Manage patient information and medical history with ease and security.
                    Our platform simplifies the process of storing, accessing, and updating
                    patient data through a digital interface backed by powerful cloud infrastructure.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">Why Use This System?</h2>
                <ul className="list-disc list-outside pl-6 space-y-2 text-left max-w-3xl">
                    <li><strong>📌 Register Patients Instantly:</strong> Capture new patient information and generate a unique QR code for each profile.</li>
                    <li><strong>📲 Scan and Access:</strong> Quickly scan a patient’s QR to instantly access their full medical profile and records.</li>
                    <li><strong>🧾 Maintain Health History:</strong> View and update past and current appointment details, prescriptions, and doctor's notes—securely stored in the cloud.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-2">Key Features</h2>
                <ul className="list-disc list-outside pl-6 space-y-2 text-left max-w-3xl">
                    <li><strong>🔐 Secure & Reliable:</strong> Built on Appwrite cloud backend to ensure privacy and data protection.</li>
                    <li><strong>🧑‍⚕️ Doctor-Friendly Interface:</strong> Fast entry of appointment records with file upload for prescriptions and remark sections.</li>
                    <li><strong>📎 QR-Enabled Access:</strong> Patients carry a unique QR that links to their medical data—no searching, no delays.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-2">Get Started</h2>
                <ul className="list-disc list-outside pl-6 space-y-2 text-left max-w-3xl mb-8">
                    <li><strong>✳️ New Patient?</strong> Head over to the Patient Registration page to create a digital record and receive a unique QR code.</li>
                    <li><strong>✅ Existing Patient?</strong> Scan the QR to view the profile, browse past records, and add new appointment details.</li>
                </ul>

                {/* Uncomment these for navigation buttons */}
                {/* 
                <div className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer mb-4" onClick={handleClick1}>
                    Register Patient
                </div>
                <div className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer" onClick={handleClick2}>
                    Lookup Records
                </div> 
                */}
            </div>
        </>
    )
}

export default Home
