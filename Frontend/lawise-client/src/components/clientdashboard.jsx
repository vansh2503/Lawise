import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserShield, FaBalanceScale, FaGavel, FaBuilding } from 'react-icons/fa';

const iconsMap = {
  "Corporate Law": <FaBuilding />,
  "Family Law": <FaUserShield />,
  "Criminal Defense": <FaGavel />,
  "Civil Litigation": <FaBalanceScale />
};

const ClientDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    address: '',
    aadharDetails: '',
    legalInfo: '',
    caseDetailsPDF: '',
    caseCategory: '',
    uploadedPhoto: null
  });
  const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const [caseCategories] = useState([
    "Corporate Law",
    "Family Law",
    "Criminal Defense",
    "Civil Litigation"
  ]);
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
    setEmoji(hour < 12 ? "🌞" : hour < 18 ? "☀️" : "🌜");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setClientInfo({ ...clientInfo, caseCategory: value });
  };

     const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Upload a JPEG or PNG image.');
      return;
    }
    setUploadedPhotoPreview(URL.createObjectURL(file));
    setClientInfo({ ...clientInfo, uploadedPhoto: file });
  };

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Upload a valid PDF.');
      return;
    }
    setClientInfo({ ...clientInfo, caseDetailsPDF: file });
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Upload a valid profile picture.');
      return;
    }
    setProfilePic(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(clientInfo).forEach(([key, value]) => formData.append(key, value));

    try {
      await axios.post('http://localhost:5000/clientinfo/clientinfo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowForm(false);
      setClientInfo({
        email: '', name: '', phoneNumber: '', address: '', aadharDetails: '',
        legalInfo: '', caseCategory: '', uploadedPhoto: null
      });
      setUploadedPhotoPreview(null);
    } catch (err) {
      alert("Error submitting form.");
      console.error(err);
    }
  };

  const handleSearchLawyers = () => {
    if (!clientInfo.caseCategory) {
      alert("Please select a category first.");
      return;
    }
    axios.get(`http://localhost:5000/api/lawyers/${encodeURIComponent(clientInfo.caseCategory)}`)
      .then(res => setLawyers(res.data))
      .catch(err => {
        alert("Error fetching lawyers.");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      {/* Top Greeting */}
      <header className="bg-white p-6 shadow flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-600">
          {greeting}, Client! {emoji}
        </h1>
        <button onClick={() => setShowForm(true)} className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
          Add Info
        </button>
      </header>

      {/* Profile Section */}
      {/*<section className="flex items-center justify-center mt-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-orange-400 shadow-md">
            {profilePic ? (
              <img src={profilePic} className="object-cover w-full h-full" alt="Profile" />
            ) : (
              <div className="text-gray-400 flex items-center justify-center h-full">No Image</div>
            )}
          </div>
          
          <input type="file" onChange={handleProfilePicUpload} accept="image/jpeg,image/png" className="text-sm" />
        </div>
        
      </section>
      */} 
    
      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-3">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Submit Info</h2>
            {['email', 'name', 'phoneNumber', 'address', 'aadharDetails', 'legalInfo'].map((field) => (
              <input
                key={field}
                name={field}
                value={clientInfo[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="w-full border p-2 rounded"
              />
            ))}
            <select value={clientInfo.caseCategory} onChange={handleCategoryChange} className="w-full border p-2 rounded">
              <option value="">Select Category</option>
              {caseCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input type="file" onChange={handlePhotoUpload} accept="image/jpeg,image/png" className="w-full border p-2 rounded" />
            <input type="file" onChange={handlePDFUpload} accept="application/pdf" className="w-full border p-2 rounded" />
            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Submit</button>
            <button onClick={() => setShowForm(false)} type="button" className="text-center w-full mt-2 text-gray-600 hover:underline">Cancel</button>
          </form>
        </div>
      )}

      {/* Browse Section */}
      <section className="mt-10 px-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Browse by Specialties</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {caseCategories.map(cat => (
            <div key={cat} onClick={() => { setClientInfo({ ...clientInfo, caseCategory: cat }); handleSearchLawyers(); }} className="bg-white rounded-xl shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition">
              <div className="text-3xl text-orange-600 mb-2">
                {iconsMap[cat] || <FaBalanceScale />}
              </div>
              <p className="text-sm font-medium text-center">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lawyer Results */}
      {lawyers.length > 0 && (
        <section className="mt-10 px-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">Matched Lawyers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map(lawyer => (
              <div key={lawyer._id} className="bg-white p-5 rounded-lg shadow border">
                <img
                  src={lawyer.uploadedPhoto ? `http://localhost:5000/uploads/${lawyer.uploadedPhoto.split('\\').pop()}` : '/default.jpg'}
                  alt="Lawyer"
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h4 className="text-lg font-bold text-gray-800">{lawyer.name}</h4>
                <p className="text-sm text-gray-600">Email: {lawyer.email}</p>
                <p className="text-sm text-gray-600">Phone: {lawyer.phoneNumber}</p>
                <p className="text-sm text-gray-600">Category: {lawyer.caseCategory}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClientDashboard;
