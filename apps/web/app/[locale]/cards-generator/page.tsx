import CardsGenerator from '../../../components/CardsGenerator/CardsGenerator';
import CardsGeneratorSettingsFrom from '../../../components/CardsGenerator/CardsGeneratorSettingsFrom';
import TheContent from "../../../components/Layout/TheContent";
import { CardsGeneratorProvider } from '../../../components/CardsGenerator/CardsGeneratorProvider';

export default function Page() {
  return (
    <TheContent>
      <CardsGeneratorProvider>
        <CardsGeneratorSettingsFrom />
        <CardsGenerator />
      </CardsGeneratorProvider>
    </TheContent>
  );
}
