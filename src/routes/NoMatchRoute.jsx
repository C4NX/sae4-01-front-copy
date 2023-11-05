import React from 'react';
import BasePage from '../components/BasePage';

export default function NoMatchRoute() {
  return (
    <BasePage title="404 - Page not found" fullSizeCentered>
      <h3 className="text-center">La page que vous recherchez n'existe pas.</h3>
    </BasePage>
  );
}
