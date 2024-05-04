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