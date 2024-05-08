import {
  fetchVisitTypes,
  fetchVisitFrequencies,
  fetchPetTypes,
  fetchActions,
  createVisit,
  getVisitTypes,
  getVisitFrequencies,
  getPetTypes,
  getActions,
  getUserVisits,
  updateVisitType,
  updateVisitFrequency,
  updatePetType,
  updateActions,
  deleteVisit,
  getVisitById,
  updateVisit,
  addActionToVisit, 
  removeActionFromVisit,
  
} from '../../api/visitApi';

export const handleFetchVisitTypes = async () => {
  try {
    const data = await fetchVisitTypes();
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error fetching visit types:", error);
    // Handle the error or throw it further
    throw error;
  }
};

export const handleFetchVisitFrequencies = async () => {
  try {
    const data = await fetchVisitFrequencies();
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error fetching visit frequencies:", error);
    // Handle the error or throw it further
    throw error;
  }
};

export const handleFetchPetTypes = async () => {
  try {
    const data = await fetchPetTypes();
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error fetching pet types:", error);
    // Handle the error or throw it further
    throw error;
  }
};

export const handleFetchActions = async () => {
  try {
    const data = await fetchActions();
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error fetching actions:", error);
    // Handle the error or throw it further
    throw error;
  }
};

export const handleCreateVisit = async (visitData, token) => {
  try {
    const data = await createVisit(visitData, token);
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error creating visit:", error);
    // Handle the error or throw it further
    throw error;
  }
};

export const handleGetVisitTypes = async (token) => {
  try {
    const data = await getVisitTypes(token);
    return data;
  } catch (error) {
    console.error("Error fetching visit types:", error);
    throw error;
  }
};

export const handleGetVisitFrequencies = async (token) => {
  try {
    const data = await getVisitFrequencies(token);
    return data;
  } catch (error) {
    console.error("Error fetching visit frequencies:", error);
    throw error;
  }
};

export const handleGetPetTypes = async (token) => {
  try {
    const data = await getPetTypes(token);
    return data;
  } catch (error) {
    console.error("Error fetching pet types:", error);
    throw error;
  }
};

export const handleGetActions = async (token) => {
  try {
    const data = await getActions(token);
    return data;
  } catch (error) {
    console.error("Error fetching actions:", error);
    throw error;
  }
};

export const handleGetUserVisits = async (token) => {
  try {
    const data = await getUserVisits(token);
    return data;
  } catch (error) {
    console.error("Error fetching user visits:", error);
    throw error;
  }
};

export const handleUpdateVisitType = async (token, visitId, visitTypeId) => {
    try {
      const data = await updateVisitType(token, visitId, visitTypeId);
      return data;
    } catch (error) {
      console.error("Error updating visit type:", error);
      throw error;
    }
  };
  
  export const handleUpdateVisitFrequency = async (token, visitId, frequencyId) => {
    try {
      const data = await updateVisitFrequency(token, visitId, frequencyId);
      return data;
    } catch (error) {
      console.error("Error updating visit frequency:", error);
      throw error;
    }
  };
  
  export const handleUpdatePetType = async (token, visitId, petTypeId) => {
    try {
      const data = await updatePetType(token, visitId, petTypeId);
      return data;
    } catch (error) {
      console.error("Error updating pet type:", error);
      throw error;
    }
  };
  
  export const handleUpdateActions = async (token, visitId, actionIds) => {
    try {
      const data = await updateActions(token, visitId, actionIds);
      return data;
    } catch (error) {
      console.error("Error updating actions:", error);
      throw error;
    }
  };
  
  export const handleDeleteVisit = async (token, visitId) => {
    try {
      await deleteVisit(token, visitId);
    } catch (error) {
      console.error("Error deleting visit:", error);
      throw error;
    }
  };

  export const handleGetVisitById = async (token, visitId) => {
    try {
        const data = await getVisitById(token, visitId);
        return data;
    } catch (error) {
        console.error("Error fetching visit:", error);
        throw error;
    }
  };

  export const handleUpdateVisit = async (token, visitId, updatedData) => {
    try {
        const data = await updateVisit(token, visitId, updatedData);
        return data;
    } catch (error) {
        console.error("Error updating visit:", error);
        throw error;
    }
  };

  export const handleAddActionToVisit = async (token, visitId, actionId) => {
  try {
    const data = await addActionToVisit(token, visitId, actionId);
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error adding action to visit:", error);
    throw error;
  }
};

export const handleRemoveActionFromVisit = async (token, visitId, actionId) => {
  try {
    const data = await removeActionFromVisit(token, visitId, actionId);
    // Perform any additional logic or data manipulation
    return data;
  } catch (error) {
    console.error("Error removing action from visit:", error);
    throw error;
  }
};