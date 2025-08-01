import React from 'react';

// Sample data for lawyers
const lawyers = [
  { name: 'John Doe', image: '/me2_ufff.jpeg', specialization: 'Corporate Law' },
  { name: 'Jane Smith', image: '/me2_ufff.jpeg', specialization: 'Family Law' },
  { name: 'Mike Johnson', image: '/me2_ufff.jpeg', specialization: 'Criminal Defense' },
  { name: 'John Doe', image: '/me2_ufff.jpeg', specialization: 'Corporate Law' },
  { name: 'Jane Smith', image: '/me2_ufff.jpeg', specialization: 'Family Law' },
  { name: 'Mike Johnson', image: '/me2_ufff.jpeg', specialization: 'Criminal Defense' },
  { name: 'John Doe', image: '/me2_ufff.jpeg', specialization: 'Corporate Law' },
  { name: 'Jane Smith', image: '/me2_ufff.jpeg', specialization: 'Family Law' },
  { name: 'Mike Johnson', image: '/me2_ufff.jpeg', specialization: 'Criminal Defense' },
  // Additional lawyers...
];

const TeamPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8">
      <h1 className="text-6xl font-bold text-center text-blue-800 mb-10">Meet Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lawyers.map((lawyer, index) => (
          <div
            key={index}
            className={`rounded-lg shadow p-4 text-center ${
              lawyer.specialization === 'Corporate Law'
                ? 'bg-corporate text-white'
                : lawyer.specialization === 'Family Law'
                ? 'bg-family text-white'
                : lawyer.specialization === 'Criminal Defense'
                ? 'bg-criminal text-white'
                : 'bg-white'
            }`}
          >
            <img
              src={lawyer.image}
              alt={lawyer.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">{lawyer.name}</h3>
            <p className="text-gray-200">{lawyer.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
