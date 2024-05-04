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