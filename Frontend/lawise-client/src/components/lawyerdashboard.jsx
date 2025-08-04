import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const LawyerDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [lawyerInfo, setLawyerInfo] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    address: '',
    caseCategory: '',
    uploadedPhoto: null
  });
  const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState(null);
  const [clients, setClients] = useState([]);
  const [caseCategories] = useState([
    'Corporate Law',
    'Family Law',
    'Criminal Defense',
    'Civil Litigation',
    'Intellectual Property'
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
      setEmoji("🌞");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
      setEmoji("☀️");
    } else {
      setGreeting("Good Evening");
      setEmoji("🌜");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLawyerInfo({ ...lawyerInfo, [name]: value });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
      alert('Please upload a JPEG or PNG image.');
      return;
    }
    setUploadedPhotoPreview(URL.createObjectURL(file));
    setLawyerInfo({ ...lawyerInfo, uploadedPhoto: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(lawyerInfo).forEach(([key, value]) => formData.append(key, value));

    try {
      const response = await axios.post(`${config.apiBaseUrl}/lawyer/lawyerinfo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Lawyer info submitted:', response.data);
      setShowForm(false);
      setLawyerInfo({
        email: '',
        name: '',
        phoneNumber: '',
        address: '',
        caseCategory: '',
        uploadedPhoto: null
      });
      setUploadedPhotoPreview(null);
    } catch (error) {
      console.error("Error submitting lawyer info:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setLawyerInfo(prev => ({ ...prev, caseCategory: selectedCategory }));
    fetchClients(selectedCategory);
  };

  const fetchClients = async (category) => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/clients/${encodeURIComponent(category)}`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleVideoCall = (clientEmail, clientName) => {
    // Define the meeting link (same as in the backend)
    const meetingLink = "https://meet.google.com/wty-sbdo-mqh";
    
    axios.post(`${config.apiBaseUrl}/clients/sendVideoCallLink`, {
      clientEmail,
      clientName
    }).then(() => {
      alert('📩 Video call link sent to the client.');
      // Open the meeting in a new tab for the lawyer
      window.open(meetingLink, '_blank');
    }).catch((error) => {
      console.error('Error sending email:', error);
      alert('❌ Failed to send video call link.');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 font-sans text-gray-800">
      <header className="bg-white shadow-md p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">{greeting} {emoji}, <span className="text-gray-900">Welcome Back!</span></h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          ➕ Add Info
        </button>
      </header>

      {/* Search and Category */}
      <div className="mt-8 px-10 flex flex-col md:flex-row items-center gap-4">
        <select
          value={lawyerInfo.caseCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-[300px] focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" disabled>Select case category</option>
          {caseCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="🔍 Search clients by name..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-[500px] focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Clients */}
      <main className="p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">📂 Clients in {lawyerInfo.caseCategory || "Selected Category"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div
              key={client._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={client.uploadedPhoto ? `${config.apiBaseUrl}/uploads/${client.uploadedPhoto.split('\\').pop()}` : '/default.jpg'}
                  alt="Client"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default.jpg';
                  }}
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-xl font-semibold text-indigo-700">{client.name}</h4>
                <p className="text-sm"><strong>Specialization:</strong> {client.caseCategory}</p>
                <p className="text-sm"><strong>Email:</strong> {client.email}</p>
                <p className="text-sm"><strong>Phone:</strong> {client.phoneNumber}</p>
                <button
                  onClick={() => handleVideoCall(client.email, client.name)}
                  className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
                >
                  📹 Start Video Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-300 to-indigo-400 text-white p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-2">👥 Total Clients</h3>
            <p className="text-4xl">{clients.length}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-300 to-purple-400 text-white p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-2">📅 Upcoming Appointments</h3>
            <p className="text-4xl">3</p>
          </div>
          <div className="bg-gradient-to-br from-green-300 to-blue-400 text-white p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-2">💬 Messages</h3>
            <p className="text-4xl">12</p>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">📝 Enter Your Info</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              {['email', 'name', 'phoneNumber', 'address'].map(field => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, ' $1')}
                  value={lawyerInfo[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              ))}
              <select
                name="caseCategory"
                value={lawyerInfo.caseCategory}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="" disabled>Select Case Category</option>
                {caseCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photograph</label>
                <input type="file" accept="image/jpeg,image/png" onChange={handlePhotoUpload} className="w-full border border-gray-300 rounded px-2 py-1" />
                {uploadedPhotoPreview && <img src={uploadedPhotoPreview} alt="Preview" className="w-16 h-16 mt-2 object-cover rounded" />}
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">✅ Submit</button>
              <button type="button" onClick={() => setShowForm(false)} className="w-full mt-2 text-gray-600 hover:text-gray-800">❌ Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerDashboard;
