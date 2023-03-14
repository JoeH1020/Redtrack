import React, { createContext, useState } from 'react';

export interface SelectedContextProps {
    selectedItems: Set<string>;
    setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  }

export const SelectedContext = createContext<SelectedContextProps>({
    selectedItems: new Set<string>(),
    setSelectedItems: () => {},
  });