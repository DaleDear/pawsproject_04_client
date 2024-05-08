import React, { useState } from 'react';
import { handleUpdateVisitFrequency } from '../handlers/visitHandler';

const UpdateVisitFrequencyForm = ({ visitId }) => {
  const [frequencyId, setFrequencyId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('paws_token');
    await handleUpdateVisitFrequency(token, visitId, frequencyId);
    setFrequencyId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Update Visit Frequency:
        <input
          type="text"
          value={frequencyId}
          onChange={(e) => setFrequencyId(e.target.value)}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateVisitFrequencyForm;