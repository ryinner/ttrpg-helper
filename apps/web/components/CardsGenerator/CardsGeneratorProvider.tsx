'use client';

import { createContext, useContext, useState, type ReactNode, type SetStateAction, type Dispatch } from 'react';

const defaultSettings = {
  width: 100,
  height: 125,
  gap: 10,
  padding: 1.5
}

export const CardsGeneratorContext = createContext<{
  settings: Settings,
  setSettings: Dispatch<SetStateAction<Settings>>
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export function CardsGeneratorProvider({ children }: Props) {
  const [settings, setSettings] = useState(defaultSettings);

  return <CardsGeneratorContext.Provider value={{ settings, setSettings }}>
    {children}
  </CardsGeneratorContext.Provider>
}

export function useCardsGeneratorContext () {
  return useContext(CardsGeneratorContext)
}

interface Props {
  children: ReactNode;
}

export interface Settings {
  width: number;
  height: number;
  gap: number;
  padding: number;
}