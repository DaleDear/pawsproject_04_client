import fetcher from "../components/fetcher";

export const fetchVisitTypes = () => {
  return fetcher("/visitTypes/");
};

export const fetchVisitFrequencies = () => {
  return fetcher("/visitFrequencies/");
};

export const fetchPetTypes = () => {
  return fetcher("/petTypes/");
};

export const fetchActions = () => {
  return fetcher("/actions/");
};

export const createVisit = (visitData, token) => {
  return fetch("http://localhost:8000/visits/create", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(visitData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error submitting visit request");
    }
    return response.json();
  });
};

export const getVisitTypes = (token) => {
  return fetch("http://localhost:8000/visitTypes", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching visit types");
    }
    return response.json();
  });
};

export const getVisitFrequencies = (token) => {
  return fetch("http://localhost:8000/visitFrequencies", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching visit frequencies");
    }
    return response.json();
  });
};

export const getPetTypes = (token) => {
  return fetch("http://localhost:8000/petTypes", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching pet types");
    }
    return response.json();
  });
};

export const getActions = (token) => {
  return fetch("http://localhost:8000/actions", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching actions");
    }
    return response.json();
  });
};

export const getUserVisits = (token) => {
  return fetch("http://localhost:8000/visits/my-visits", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching user visits");
    }
    return response.json();
  });
};

export const updateVisitType = (token, visitId, visitTypeId) => {
  return fetch(`http://localhost:8000/api/visits/${visitId}/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ visit_type: visitTypeId }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating visit type");
    }
    return response.json();
  });
};

export const updateVisitFrequency = (token, visitId, frequencyId) => {
  return fetch(`http://localhost:8000/api/visits/${visitId}/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ visit_frequency: frequencyId }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating visit frequency");
    }
    return response.json();
  });
};

export const updatePetType = (token, visitId, petTypeId) => {
  return fetch(`http://localhost:8000/api/visits/${visitId}/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ pet_type: petTypeId }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating pet type");
    }
    return response.json();
  });
};

export const updateActions = (token, visitId, actionIds) => {
  return fetch(`http://localhost:8000/api/visits/${visitId}/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ actions: actionIds }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating actions");
    }
    return response.json();
  });
};

export const deleteVisit = (token, visitId) => {
  return fetch(`http://localhost:8000/visits/${visitId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error deleting visit");
    }
  });
};

export const getVisitById = (token, visitId) => {
  return fetch(`http://localhost:8000/visits/${visitId}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching visit");
    }
    return response.json();
  });
};

export const updateVisit = (token, visitId, updatedData) => {
  return fetch(`http://localhost:8000/visits/${visitId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updatedData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating visit");
    }
    return response.json();
  });
};

export const addActionToVisit = async (token, visitId, actionId) => {
  try {
    const response = await fetch(`http://localhost:8000/visits/${visitId}/actions/${actionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to add action to visit');
    }

    // Return the response data if needed
    return response.json();
  } catch (error) {
    console.error('Error adding action to visit:', error.message);
    throw error;
  }
};

// Function to remove an action from a visit
export const removeActionFromVisit = async (token, visitId, actionId) => {
  try {
    const response = await fetch(`http://localhost:8000/visits/${visitId}/actions/remove/${actionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove action from visit');
    }

    // Return the response data if needed
    return response.json();
  } catch (error) {
    console.error('Error removing action from visit:', error.message);
    throw error;
  }
};