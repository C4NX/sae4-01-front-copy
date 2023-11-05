import React from 'react';
import UnavailabilityMakeForm from '../Unavailability/UnavailabilityMakeForm';
import VacationMakeForm from '../Vacations/VacationMakeForm';

export default function AgendaEditForm() {
  return (
    <div className="d-flex flex-column gap-3">
      <UnavailabilityMakeForm />
      <VacationMakeForm />
    </div>
  );
}
