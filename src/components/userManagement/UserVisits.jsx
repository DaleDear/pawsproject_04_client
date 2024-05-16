// UserVisits.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleGetUserVisits, handleDeleteVisit } from '../handlers/visitHandler';

export const UserVisits = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchUserVisits = async () => {
      const token = localStorage.getItem('paws_token');
      const userVisits = await handleGetUserVisits(token);
      setVisits(userVisits);
    };

    fetchUserVisits();
  }, []);

  const deleteVisit = async (visitId) => {
    const token = localStorage.getItem('paws_token');
    await handleDeleteVisit(token, visitId);
    const userVisits = await handleGetUserVisits(token);
    setVisits(userVisits);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Visits</h2>
      {visits.map((visit) => (
          <div key={visit.id} className="border border-gray-300 rounded-md p-4 mb-4">
              <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p><span className="font-bold">Start Date:</span> {visit.visit_start_date}</p>
                    <p><span className="font-bold">End Date:</span> {visit.visit_end_date}</p>
                    <p><span className="font-bold">Visit Type:</span> {visit.visit_type_name}</p>
                    <p><span className="font-bold">Visit Frequency:</span> {visit.visit_frequency_description}</p>
                    <p><span className="font-bold">Pet Type:</span> {visit.pet_type_name}</p>
                    <p><span className="font-bold">Actions:</span></p>
                    <ul>
                        {visit.actions.map((action) => (
                         <li key={action.id}>{action.action_type}</li>
                        ))}
                    </ul>  
                  </div>
                  <div className="flex flex-col items-end">
                    <Link
                        to={`/user-visits/${visit.id}/edit`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Update Visit Details
                    </Link>
                    <button
                        onClick={() => deleteVisit(visit.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                    Delete Visit
                    </button>
                  </div>
              </div>
          </div>     
      ))}
      <div className="flex justify-center mt-8">
        <img src="/images/PawsLogo-image.jpg" alt="Paws and Relax Logo" className="w-40 h-auto" />
      </div>
    </div>
  );
};