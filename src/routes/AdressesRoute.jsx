import React from 'react';
import BasePage from '../components/BasePage';
import AdresseForm from '../components/Addresses/AdresseForm';

export default function AdressesRoute() {
  return (
    <BasePage title="Gérer mes adresses">
      <AdresseForm className="m-4" />
    </BasePage>
  );
}
