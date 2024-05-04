import { useState, useEffect } from "react";

export const VisitRequestForm = () => {
  const [visitType, setVisitType] = useState({ id: "", visit_type: "" });
  const [visitStartDate, setVisitStartDate] = useState("");
  const [visitEndDate, setVisitEndDate] = useState("");
  const [visitFrequency, setVisitFrequency] = useState({ id: "", description: "" });
  const [petType, setPetType] = useState({ id: "", pet_type: "" });
  const [actions, setActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);

  const visitTypeOptions = [
    { id: "1", name: "In-home visit" },
    { id: "2", name: "Outside-home: leash walk" },
  ];
    
  const fetchActions = async () => {
    try {
      const response = await fetch("/api/actions/");
      if (response.ok) {
        const data = await response.json();
        // Update actions state to hold objects with both id and name
        setActions(data.map(action => ({ id: action.id, name: action.name })));
      } else {
        console.error("Failed to fetch actions", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const handleActionSelection = (actionId) => {
    const selectedAction = actions.find(action => action.id === actionId);
    if (!selectedAction) return;
    if (selectedActions.includes(actionId)) {
      setSelectedActions(selectedActions.filter((id) => id !== actionId));
    } else {
      setSelectedActions([...selectedActions, selectedAction]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("paws_token");

    console.log("Request Payload:", {
      visit_type: visitType.id,
      visit_start_date: visitStartDate,
      visit_end_date: visitEndDate,
      visit_frequency: visitFrequency.id,
      pet_type: petType.id,
      actions: selectedActions.map(action => action.id),
    });

    try {
      const response = await fetch("http://localhost:8000/visits/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          visit_type: visitType.id,
          visit_start_date: visitStartDate,
          visit_end_date: visitEndDate,
          visit_frequency: visitFrequency.id,
          pet_type: petType.id,
          actions: selectedActions.map(action => action.id),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Visit request submitted:", data);
        // Reset form fields after successful submission
        setVisitType({ id: "", visit_type: "" });
        setVisitStartDate("");
        setVisitEndDate("");
        setVisitFrequency({ id: "", description: "" });
        setPetType({ id: "", pet_type: "" });
        setSelectedActions([]);
      } else {
        console.error("Error submitting visit request:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting visit request:", error);
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
            value={visitType.id}
            onChange={(e) => setVisitType({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
          >
            <option value="">Select visit type</option>
            {visitTypeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
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
              value={visitFrequency.id}
              onChange={(e) => setVisitFrequency({ id: e.target.value, visit_frequency: e.target.options[e.target.selectedIndex].text })}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
            >
              <option value="">Select visit frequency</option>
                {/* Render visit frequency options */}
              <option value="One visit per day">One visit per day</option>
              <option value="Two visits per day">Two visits per day</option>
            </select>
        </div>
        <div className="mb-4">
          <label htmlFor="petType" className="block mb-1">Pet Type:</label>
          <select
            id="petType"
            value={petType.id}
                      onChange={(e) => setPetType({ id: e.target.value, pet_type: e.target.options[e.target.selectedIndex].text })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
          >
            <option value="">Select pet type</option>
            {/* Render pet type options */}
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Turtle">Turtle</option>
              <option value="Fish">Fish</option>
              <option value="Hamster">Hamster</option>
              <option value="Guinea Pig">Guinea Pig</option>
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
                checked={selectedActions.includes(action)}
                className="mr-2"
              />
              <label htmlFor={`action_${action.id}`}>{action.name}</label>
            </div>
          ))}
          <div>
            <input
              type="checkbox"
              id="action_check_refill"
              name="actions"
              value="check_refill"
              onChange={() => handleActionSelection("check_refill")}
              checked={selectedActions.includes("check_refill")}
            />
            <label htmlFor="action_check_refill">   Check/refill food and water</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="action_brush_hair"
              name="actions"
              value="brush_hair"
              onChange={() => handleActionSelection("brush_hair")}
              checked={selectedActions.includes("brush_hair")}
            />
            <label htmlFor="action_brush_hair">  Brush hair</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="action_give_medications"
              name="actions"
              value="give_medications"
              onChange={() => handleActionSelection("give_medications")}
              checked={selectedActions.includes("give_medications")}
            />
            <label htmlFor="action_give_medications">  Give medications as directed</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="action_give_treats"
              name="actions"
              value="give_treats"
              onChange={() => handleActionSelection("give_treats")}
              checked={selectedActions.includes("give_treats")}
            />
            <label htmlFor="action_give_treats">  Give treats</label>
          </div>
        </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Request</button>
        </form>
    </div>
  );
};
//////////////////////original below this line
import { useState, useEffect } from "react";

export const VisitRequestForm = () => {
  const [visitType, setVisitType] = useState("");
  const [visitStartDate, setVisitStartDate] = useState("");
  const [visitEndDate, setVisitEndDate] = useState("");
  const [visitFrequency, setVisitFrequency] = useState("");
  const [petType, setPetType] = useState("");
  const [actions, setActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  

  const fetchActions = async () => {
    
    try {
      const response = await fetch("/api/actions/");
      
      if (response.ok) {
        const data = await response.json();
        setActions(data); // Set actions from backend response
      } else {
        console.error("Failed to fetch actions", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  // Function to handle selection of actions
  const handleActionSelection = (actionId) => {
    if (selectedActions.includes(actionId)) {
      setSelectedActions(selectedActions.filter((id) => id !== actionId));
    } else {
      setSelectedActions([...selectedActions, actionId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("paws_token");

     console.log("Request Payload:", {
        visit_type: visitType,
        visit_start_date: visitStartDate,
        visit_end_date: visitEndDate,
        visit_frequency: visitFrequency,
        pet_type: petType,
        actions: selectedActions,
    });

    try {
      const response = await fetch("http://localhost:8000/visits/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          visit_type: visitType,
          visit_start_date: visitStartDate,
          visit_end_date: visitEndDate,
          visit_frequency: visitFrequency,
          pet_type: petType,
          actions: selectedActions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Visit request submitted:", data);
        // Reset form fields after successful submission
        setVisitType("");
        setVisitStartDate("");
        setVisitEndDate("");
        setVisitFrequency("");
        setPetType("");
        setSelectedActions([]);
      } else {
        console.error("Error submitting visit request:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting visit request:", error);
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
          value={visitType}
          onChange={(e) => setVisitType(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
        >
          <option value="">Select visit type</option>
            {/* Render visit type options */}
            <option value="In-Home Visit">In-home visit</option>
            <option value="Outside-Walking">Outside-home: leash walk</option>
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
          value={visitFrequency}
          onChange={(e) => setVisitFrequency(e.target.value)}
          required
           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
        >
          <option value="">Select visit frequency</option>
            {/* Render visit frequency options */}
            <option value="One visit per day">One visit per day</option>
            <option value="Two visits per day">Two visits per day</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="petType" className="block mb-1">Pet Type:</label>
        <select
          id="petType"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"  
        >
          <option value="">Select pet type</option>
            {/* Render pet type options */}
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Turtle">Turtle</option>
            <option value="Fish">Fish</option>
            <option value="Hamster">Hamster</option>
            <option value="Guinea Pig">Guinea Pig</option>
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
                onChange={() => handleActionSelection(action.id)}
                checked={selectedActions.includes(action.id)}
                className="mr-2"
              />
              <label htmlFor={`action_${action.id}`}>{action.name}</label>
            </div>
          ))}
          <div>
            <input
              type="checkbox"
              id="action_check_refill"
              name="actions"
              value="check_refill"
              onChange={() => handleActionSelection("check_refill")}
              checked={selectedActions.includes("check_refill")}
            />
            <label htmlFor="action_check_refill">   Check/refill food and water</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="action_brush_hair"
              name="actions"
              value="brush_hair"
              onChange={() => handleActionSelection("brush_hair")}
              checked={selectedActions.includes("brush_hair")}
            />
            <label htmlFor="action_brush_hair">  Brush hair</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="action_give_medications"
              name="actions"
              value="give_medications"
              onChange={() => handleActionSelection("give_medications")}
              checked={selectedActions.includes("give_medications")}
            />
            <label htmlFor="action_give_medications">  Give medications as directed</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="action_give_treats"
              name="actions"
              value="give_treats"
              onChange={() => handleActionSelection("give_treats")}
              checked={selectedActions.includes("give_treats")}
            />
            <label htmlFor="action_give_treats">  Give treats</label>
          </div>
        </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Request</button>
        </form>
    </div>
  );
};
////////////////dynamic visitTypes, Freq, petTypes
import { useState, useEffect } from "react";

export const VisitRequestForm = () => {
  const [visitType, setVisitType] = useState([]);
  const [visitStartDate, setVisitStartDate] = useState("");
  const [visitEndDate, setVisitEndDate] = useState("");
  const [visitFrequency, setVisitFrequency] = useState([]);
  const [petType, setPetType] = useState([]);
  const [actions, setActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  
const fetchVisitTypes = async () => {
  try {
    const response = await fetch("/api/visit-types/");
    if (response.ok) {
      const data = await response.json();
      setVisitTypes(data);
    } else {
      console.error("Failed to fetch visit types", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching visit types:", error);
  }
};

const fetchVisitFrequencies = async () => {
  try {
    const response = await fetch("/api/visit-frequencies/");
    if (response.ok) {
      const data = await response.json();
      setVisitFrequencies(data);
    } else {
      console.error("Failed to fetch visit frequencies", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching visit frequencies:", error);
  }
};

const fetchPetTypes = async () => {
  try {
    const response = await fetch("/api/pet-types/");
    if (response.ok) {
      const data = await response.json();
      setPetTypes(data);
    } else {
      console.error("Failed to fetch pet types", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching pet types:", error);
  }
};

useEffect(() => {
  fetchVisitTypes();
  fetchVisitFrequencies();
  fetchPetTypes();
  fetchActions();
}, []);

const handleActionSelection = (actionId) => {
    if (selectedActions.includes(actionId)) {
      setSelectedActions(selectedActions.filter((id) => id !== actionId));
    } else {
      setSelectedActions([...selectedActions, actionId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("paws_token");

     console.log("Request Payload:", {
        visit_type: visitType,
        visit_start_date: visitStartDate,
        visit_end_date: visitEndDate,
        visit_frequency: visitFrequency,
        pet_type: petType,
        actions: selectedActions,
    });

    try {
      const response = await fetch("http://localhost:8000/visits/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          visit_type: visitType,
          visit_start_date: visitStartDate,
          visit_end_date: visitEndDate,
          visit_frequency: visitFrequency,
          pet_type: petType,
          actions: selectedActions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Visit request submitted:", data);
        // Reset form fields after successful submission
        setVisitType("");
        setVisitStartDate("");
        setVisitEndDate("");
        setVisitFrequency("");
        setPetType("");
        setSelectedActions([]);
      } else {
        console.error("Error submitting visit request:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting visit request:", error);
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
          value={visitType.id}
          onChange={(e) => setVisitType({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select visit type</option>
          {visitTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
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
          value={visitFrequency.id}
          onChange={(e) => setVisitFrequency({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select visit frequency</option>
          {visitFrequencies.map((frequency) => (
            <option key={frequency.id} value={frequency.id}>
              {frequency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="petType" className="block mb-1">Pet Type:</label>
        <select
         id="petType"
         value={petType.id}
         onChange={(e) => setPetType({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
         required
         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
       >
         <option value="">Select pet type</option>
         {petTypes.map((type) => (
           <option key={type.id} value={type.id}>
             {type.name}
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
                 onChange={() => handleActionSelection(action.id)}
                 checked={selectedActions.some((selectedAction) => selectedAction.id === action.id)}
                 className="mr-2"
               />
               <label htmlFor={`action_${action.id}`}>{action.name}</label>
             </div>
           ))}
        </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Request</button>
        </form>
    </div>
  );
};

/////////////////////////// original code before the added structure
/* import { useState, useEffect } from "react";
import fetcher from './components/fetcher';

export const VisitRequestForm = () => {
  const [visitTypes, setVisitTypes] = useState([]);
  const [selectedVisitType, setSelectedVisitType] = useState(null);
  const [visitStartDate, setVisitStartDate] = useState("");
  const [visitEndDate, setVisitEndDate] = useState("");
  const [visitFrequencies, setVisitFrequencies] = useState([]);
  const [selectedVisitFrequency, setSelectedVisitFrequency] = useState(null);
  const [petTypes, setPetTypes] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [actions, setActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);


  // ... (fetchVisitTypes, fetchVisitFrequencies, fetchPetTypes, fetchActions functions remain the same)
const fetchVisitTypes = async () => {
  try {
    const data = await fetcher("/visitTypes/");
    setVisitTypes(data);
  } catch (error) {
    console.error("Error fetching visit types:", error);
  }
};

  const fetchVisitFrequencies = async () => {
  try {
    const data = await fetcher("/visitFrequencies/");
    setVisitFrequencies(data);
  } catch (error) {
    console.error("Error fetching visit frequencies:", error);
  }
};
  const fetchPetTypes = async () => {
  try {
    const data = await fetcher("/petTypes/");
    setPetTypes(data);
  } catch (error) {
    console.error("Error fetching pet types:", error);
  }
};

  const fetchActions = async () => {
  try {
    const data = await fetcher("/actions/");
    setActions(data);
  } catch (error) {
    console.error("Error fetching actions:", error);
  }
};

  useEffect(() => {
    fetchVisitTypes();
    fetchVisitFrequencies();
    fetchPetTypes();
    fetchActions();
  }, []);


  const handleActionSelection = (action) => {
    if (selectedActions.some((selectedAction) => selectedAction.id === action.id)) {
      setSelectedActions(selectedActions.filter((selectedAction) => selectedAction.id !== action.id));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("paws_token");

    console.log("Request Payload:", {
      visit_type: selectedVisitType ? selectedVisitType.id : null,
      visit_start_date: visitStartDate,
      visit_end_date: visitEndDate,
      visit_frequency: selectedVisitFrequency ? selectedVisitFrequency.id : null,
      pet_type: selectedPetType ? selectedPetType.id : null,
      actions: selectedActions.map((action) => action.id),
    });

    try {
      const response = await fetch("http://localhost:8000/visits/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          visit_type: selectedVisitType ? selectedVisitType.id : null,
          visit_start_date: visitStartDate,
          visit_end_date: visitEndDate,
          visit_frequency: selectedVisitFrequency ? selectedVisitFrequency.id : null,
          pet_type: selectedPetType ? selectedPetType.id : null,
          actions: selectedActions.map((action) => action.id),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Visit request submitted:", data);
        // Reset form fields after successful submission
        setSelectedVisitType(null);
        setVisitStartDate("");
        setVisitEndDate("");
        setSelectedVisitFrequency(null);
        setSelectedPetType(null);
        setSelectedActions([]);
      } else {
        console.error("Error submitting visit request:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting visit request:", error);
    }
  }; */

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
                {type.name}
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
                {frequency.name}
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
                {type.name}
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
              <label htmlFor={`action_${action.id}`}>{action.name}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Request</button>
      </form>
    </div>
  );
};