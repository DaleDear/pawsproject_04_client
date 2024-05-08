import React, { useState } from 'react';
import { handleUpdatePetType } from '../handlers/visitHandler';

const UpdatePetTypeForm = ({ visitId }) => {
  const [petTypeId, setPetTypeId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('paws_token');
    await handleUpdatePetType(token, visitId, petTypeId);
    setPetTypeId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Update Pet Type:
        <input
          type="text"
          value={petTypeId}
          onChange={(e) => setPetTypeId(e.target.value)}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdatePetTypeForm;