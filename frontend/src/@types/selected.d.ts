import React from 'react';

interface SelectedContextProps {
  selectedItems: Set<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
}
