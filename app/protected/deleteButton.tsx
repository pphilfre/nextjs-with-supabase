'use client';

import React from 'react';

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const handleClick = async () => {
    await onDelete(id);
  };

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteButton;