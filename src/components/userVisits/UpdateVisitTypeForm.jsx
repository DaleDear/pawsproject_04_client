import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleGetVisitTypes, handleUpdateVisitType, handleGetVisitById } from '../handlers/visitHandler';


const UpdateVisitTypeForm = () => {
  const { visitId } = useParams();
  const [visitTypes, setVisitTypes] = useState([]);
  const [selectedVisitType, setSelectedVisitType] = useState('');

  useEffect(() => {
    const fetchVisitTypes = async () => {
      const token = localStorage.getItem('paws_token');
      const types = await handleGetVisitTypes(token);
      setVisitTypes(types);
    };

    const fetchSelectedVisitType = async () => {
      const token = localStorage.getItem('paws_token');
      const visit = await handleGetVisitById(token, visitId);
      setSelectedVisitType(visit.visit_type.id);
    };

    fetchVisitTypes();
    fetchSelectedVisitType();
  }, [visitId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('paws_token');
    await handleUpdateVisitType(token, visitId, selectedVisitType);
    // Redirect back to the visit details page or show a success message
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Visit Type</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="visitType" className="block mb-1">
            Visit Type:
          </label>
          <select
            id="visitType"
            value={selectedVisitType}
            onChange={(e) => setSelectedVisitType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select visit type</option>
            {visitTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.visit_type}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Visit Type
        </button>
      </form>
    </div>
  );
};

export default UpdateVisitTypeForm;