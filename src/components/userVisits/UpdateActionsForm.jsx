/* import React, { useState } from 'react';
import { handleUpdateActions } from '../handlers/visitHandler';

const UpdateActionsForm = ({ visitId }) => {
  const [actionIds, setActionIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('paws_token');
    await handleUpdateActions(token, visitId, actionIds);
    setActionIds([]);
  };

  const handleActionChange = (e) => {
    const actionId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setActionIds([...actionIds, actionId]);
    } else {
      setActionIds(actionIds.filter((id) => id !== actionId));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Update Actions:
        <input
          type="checkbox"
          value="1"
          onChange={handleActionChange}
        />
        Action 1
        <input
          type="checkbox"
          value="2"
          onChange={handleActionChange}
        />
        Action 2
        {/* Add more action checkboxes as needed */
     /*  </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateActionsForm;  */