import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const TeamPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.apiBaseUrl}/lawyer/all`);
        setLawyers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lawyers:', err);
        setError('Failed to load lawyers. Please try again later.');
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8">
      <h1 className="text-6xl font-bold text-center text-blue-800 mb-10">Meet Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lawyers.length > 0 ? lawyers.map((lawyer, index) => (
          <div
            key={index}
            className={`rounded-lg shadow p-4 text-center ${
              lawyer.caseCategory === 'Corporate Law'
                ? 'bg-corporate text-white'
                : lawyer.caseCategory === 'Family Law'
                ? 'bg-family text-white'
                : lawyer.caseCategory === 'Criminal Defense'
                ? 'bg-criminal text-white'
                : lawyer.caseCategory === 'Civil Litigation'
                ? 'bg-civil text-white'
                : 'bg-white'
            }`}
          >
            <img
              src={lawyer.uploadedPhoto ? `${config.apiBaseUrl}/${lawyer.uploadedPhoto}` : '/default.jpg'}
              alt={lawyer.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default.jpg';
              }}
            />
            <h3 className="text-2xl font-semibold">{lawyer.name}</h3>
            <p className={`${lawyer.caseCategory === 'Corporate Law' || lawyer.caseCategory === 'Family Law' || lawyer.caseCategory === 'Criminal Defense' || lawyer.caseCategory === 'Civil Litigation' ? 'text-gray-200' : 'text-gray-700'}`}>{lawyer.caseCategory}</p>
            <p className={`${lawyer.caseCategory === 'Corporate Law' || lawyer.caseCategory === 'Family Law' || lawyer.caseCategory === 'Criminal Defense' || lawyer.caseCategory === 'Civil Litigation' ? 'text-gray-200' : 'text-gray-700'}`}>{lawyer.phoneNumber}</p>
          </div>
        )) : (
          <div className="col-span-3 text-center p-10">
            <p>No lawyers found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
