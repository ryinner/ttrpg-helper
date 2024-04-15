'use client';

import { useState } from 'react';
import CardsGenerator from '../../../components/CardsGenerator/CardsGenerator';
import CardsGeneratorSettingsFrom, { defaultSettings, type changeSettingsHandler } from '../../../components/CardsGenerator/CardsGeneratorSettingsFrom';
import TheContent from "../../../components/Layout/TheContent";
import type { Settings } from '../../../components/CardsGenerator/CardsGenerator';

export default function Page() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const changeSettingsHandler: changeSettingsHandler = (e) => {
    setSettings(e.data);
  }

  return (
    <TheContent>
      <CardsGeneratorSettingsFrom onChangeSettings={changeSettingsHandler} />
      <CardsGenerator settings={settings} />
    </TheContent>
  );
}
