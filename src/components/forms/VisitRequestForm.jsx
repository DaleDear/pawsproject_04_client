import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  handleGetVisitTypes,
  handleGetVisitFrequencies,
  handleGetPetTypes,
  handleGetActions,
  handleCreateVisit,
} from '../handlers/visitHandler';

export const VisitRequestForm = () => {
  const [visitTypes, setVisitTypes] = useState([]);
  const [selectedVisitType, setSelectedVisitType] = useState(null);
  const [visitStartDate, setVisitStartDate] = useState('');
  const [visitEndDate, setVisitEndDate] = useState('');
  const [visitFrequencies, setVisitFrequencies] = useState([]);
  const [selectedVisitFrequency, setSelectedVisitFrequency] = useState(null);
  const [petTypes, setPetTypes] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [actions, setActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("paws_token");
      try {
        const [visitTypesData, visitFrequenciesData, petTypesData, actionsData] = await Promise.all([
          handleGetVisitTypes(token),
          handleGetVisitFrequencies(token),
          handleGetPetTypes(token),
          handleGetActions(token),
        ]);

        setVisitTypes(visitTypesData);
        setVisitFrequencies(visitFrequenciesData);
        setPetTypes(petTypesData);
        setActions(actionsData);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("paws_token");

    const visitData = {
      visit_type: selectedVisitType ? selectedVisitType.id : null,
      visit_start_date: visitStartDate,
      visit_end_date: visitEndDate,
      visit_frequency: selectedVisitFrequency ? selectedVisitFrequency.id : null,
      pet_type: selectedPetType ? selectedPetType.id : null,
      actions: selectedActions.map((action) => action.id),
    };

    try {
      const data = await handleCreateVisit(visitData, token);
      console.log("Visit request submitted:", data);
      resetForm();
      navigate('/user-visits')
    } catch (error) {
      console.error("Error submitting visit request:", error);
    }
  };

  const resetForm = () => {
    setSelectedVisitType(null);
    setVisitStartDate('');
    setVisitEndDate('');
    setSelectedVisitFrequency(null);
    setSelectedPetType(null);
    setSelectedActions([]);
  };

  const handleActionSelection = (action) => {
    if (selectedActions.some((selectedAction) => selectedAction.id === action.id)) {
      setSelectedActions(selectedActions.filter((selectedAction) => selectedAction.id !== action.id));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Request a Pet-Sitting Visit</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for visit type, start date, end date, frequency, and pet type */}
        <div className="mb-4">
          <label htmlFor="visitType" className="block mb-1">Visit Type:</label>
          <select
            id="visitType"
            value={selectedVisitType ? selectedVisitType.id : ""}
            onChange={(e) => {
              const selectedType = visitTypes.find((type) => type.id === parseInt(e.target.value));
              setSelectedVisitType(selectedType);
            }}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select visit type</option>
            {visitTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.visit_type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="visitStartDate" className="block mb-1">Start Date:</label>
          <input
            type="date"
            id="visitStartDate"
            value={visitStartDate}
            onChange={(e) => setVisitStartDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
          />
        </div>
        <div className="mb-4">
          <label htmlFor="visitEndDate" className="block mb-1">End Date:</label>
          <input
            type="date"
            id="visitEndDate"
            value={visitEndDate}
            onChange={(e) => setVisitEndDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
          />
        </div>
        <div className="mb-4">
          <label htmlFor="visitFrequency" className="block mb-1">Visit Frequency:</label>
          <select
            id="visitFrequency"
            value={selectedVisitFrequency ? selectedVisitFrequency.id : ""}
            onChange={(e) => {
              const selectedFrequency = visitFrequencies.find((frequency) => frequency.id === parseInt(e.target.value));
              setSelectedVisitFrequency(selectedFrequency);
            }}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select visit frequency</option>
            {visitFrequencies.map((frequency) => (
              <option key={frequency.id} value={frequency.id}>
                {frequency.description}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="petType" className="block mb-1">Pet Type:</label>
          <select
            id="petType"
            value={selectedPetType ? selectedPetType.id : ""}
            onChange={(e) => {
              const selectedType = petTypes.find((type) => type.id === parseInt(e.target.value));
              setSelectedPetType(selectedType);
            }}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select pet type</option>
            {petTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.pet_type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Actions:</label>
          {actions.map((action) => (
            <div key={action.id} className="mb-2">
              <input
                type="checkbox"
                id={`action_${action.id}`}
                name="actions"
                value={action.id}
                onChange={() => handleActionSelection(action)}
                checked={selectedActions.some((selectedAction) => selectedAction.id === action.id)}
                className="mr-2"
              />
              <label htmlFor={`action_${action.id}`}>{action.type}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Request</button>
      </form>
    </div>
  );
};

