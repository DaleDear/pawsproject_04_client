import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleGetVisitById, handleUpdateVisit, handleGetVisitTypes, handleGetVisitFrequencies, handleGetPetTypes, handleGetActions, handleAddActionToVisit, handleRemoveActionFromVisit } from '../handlers/visitHandler';

export const EditVisitDetails = () => {
  const { visitId } = useParams();
  const navigate = useNavigate();
  const [visit, setVisit] = useState(null);
  const [updatedVisit, setUpdatedVisit] = useState(null);
  const [visitTypes, setVisitTypes] = useState([]);
  const [visitFrequencies, setVisitFrequencies] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [actions, setActions] = useState([]);
  const token = localStorage.getItem('paws_token');
    
  useEffect(() => {
    const fetchVisitDetails = async () => {
      //const token = localStorage.getItem('paws_token');
      const visitDetails = await handleGetVisitById(token, visitId);
      setVisit(visitDetails);
      setUpdatedVisit({
        ...visitDetails,
        actions: visitDetails.actions.map((action) => action.action),
      });  
    };

    const fetchVisitTypes = async () => {
      //const token = localStorage.getItem('paws_token');
      const types = await handleGetVisitTypes(token);
      setVisitTypes(types);
    };

    const fetchVisitFrequencies = async () => {
      //const token = localStorage.getItem('paws_token');
      const frequencies = await handleGetVisitFrequencies(token);
      setVisitFrequencies(frequencies);
    };

    const fetchPetTypes = async () => {
      //const token = localStorage.getItem('paws_token');
      const types = await handleGetPetTypes(token);
      setPetTypes(types);
    };

    const fetchActions = async () => {
      //const token = localStorage.getItem('paws_token');
      const availableActions = await handleGetActions(token);
      setActions(availableActions);
    };

    fetchVisitDetails();
    fetchVisitTypes();
    fetchVisitFrequencies();
    fetchPetTypes();
    fetchActions();
  }, [visitId, token]);

  const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (type === 'checkbox') {
    const actionId = parseInt(value);
    let updatedActions = [...updatedVisit.actions]; // Create a copy of the actions array

    if (checked) {
      // If checkbox is checked, add the action ID to the updatedActions array
      updatedActions.push(actionId);
      // Add the action to the visit
      handleAddActionToVisit(token, visitId, actionId); // Call handleAddActionToVisit
    } else {
      // If checkbox is unchecked, remove the action ID from the updatedActions array
      updatedActions = updatedActions.filter((id) => id !== actionId);
      // Remove the action from the visit
      handleRemoveActionFromVisit(token, visitId, actionId); // Call handleRemoveActionFromVisit
    }

    setUpdatedVisit({
      ...updatedVisit,
      actions: updatedActions,
    });
  } else {
    setUpdatedVisit({
      ...updatedVisit,
      [name]: value,
    });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const token = localStorage.getItem('paws_token');
    // Convert action objects to action IDs
    const actionIds = updatedVisit.actions.map((action) => action.id);
    const updatedVisitData = {
        ...updatedVisit,
        actions: actionIds,
    };
    await handleUpdateVisit(token, visitId, updatedVisitData);
    navigate('/user-visits');
  };
    
  if (!visit) {
  return <div>Loading...</div>;
}

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Visit Details</h2>
          {updatedVisit && (
              <form onSubmit={handleSubmit}>
                  {/* Render input fields for each visit detail */}
                  {/* Example: */}
                  <div className="mb-4">
                      <label htmlFor="visitStartDate" className="block mb-1">
                          Start Date:
                      </label>
                      <input
                          type="date"
                          id="visit_start_date"
                          name="visit_start_date"
                          value={updatedVisit.visit_start_date}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                      />
                  </div>
                  <div className="mb-4">
                      <label htmlFor="visitEndDate" className="block mb-1">
                          End Date:
                      </label>
                      <input
                          type="date"
                          id="visit_end_date"
                          name="visit_end_date"
                          value={updatedVisit.visit_end_date}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                      />
                  </div>
                  <div className="mb-4">
                      <label htmlFor="visitType" className="block mb-1">
                          Visit Type:
                      </label>
                      <select
                          id="visit_type"
                          name="visit_type"
                          value={updatedVisit.visit_type}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                      >
                          <option value="">Select Visit Type</option>
                          {visitTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                  {type.visit_type}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className="mb-4">
                      <label htmlFor="visitFrequency" className="block mb-1">
                          Visit Frequency:
                      </label>
                      <select
                          id="visit_frequency"
                          name="visit_frequency"
                          value={updatedVisit.visit_frequency}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                      >
                          <option value="">Select Visit Frequency</option>
                          {visitFrequencies.map((frequency) => (
                              <option key={frequency.id} value={frequency.id}>
                                  {frequency.description}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className="mb-4">
                      <label htmlFor="petType" className="block mb-1">
                          Pet Type:
                      </label>
                      <select
                          id="pet_type"
                          name="pet_type"
                          value={updatedVisit.pet_type}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                      >
                          <option value="">Select Pet Type</option>
                          {petTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                  {type.pet_type}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className="mb-4">
                      <label className="block mb-1">Visit Actions:</label>
                      {actions.map((action) => (
                          <div key={action.id}>
                              <label>
                                  <input
                                      type="checkbox"
                                      name="actions"
                                      value={action.id}
                                      checked={updatedVisit.actions.includes(action.id)}
                                      onChange={handleInputChange}
                                  />
                                  {action.type}
                              </label>
                          </div>
                      ))}
                  </div>
                  {/* ... */}
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      Save Changes
                  </button>
              </form>
          )}          
    </div>
  );
};