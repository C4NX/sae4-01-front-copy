// import React, { useEffect, useState } from 'react';
// import PropTypes, { func } from 'prop-types';
// import AgendaCalendar from './AgendaCalendar';
// import useAccount from '../../hooks/useAccount';
// import Loading from '../Loading';
// import getIdFromHydraUrl from '../../services/transformers/getIdFromHydraUrl';
// import { postUnavailability } from '../../api/TakeAVetClient';

// function createBaseEditorEvent(props) {
//   return {
//     editable: true,
//     ...props,
//     isEditorEvent: true,
//   };
// }

// function createVacationEvent(vacationId, start, end) {
//   return createBaseEditorEvent({
//     id: `vacation-${vacationId}`,
//     title: 'Vacances',
//     color: 'blue',
//     start,
//     end,
//   });
// }

// function createUnavailabilityEvent(unavailabilityId, start, end) {
//   return createBaseEditorEvent({
//     id: `unavailability-${unavailabilityId}`,
//     title: 'Indisponible',
//     color: 'red',
//     start,
//     end,
//   });
// }

// function convertTZ(date, tzString) {
//   return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
// }

// function saveEvent(event) {
//   const isVacation = event.id.startsWith('vacation-');
//   const isUnavailability = event.id.startsWith('unavailability-');

//   if (isUnavailability) {
//     window.bite = event;
//     return postUnavailability({
//       lib: event.title,
//       startDate: convertTZ(event.event.event.start, 'Europe/London'),
//       endDate: convertTZ(event.event.event.end, 'Europe/London'),
//     });
//   } if (isVacation) {
//     throw new Error('Vacations are not yet implemented');
//   } else {
//     throw new Error('Unknown event type');
//   }
// }

// export default function AgendaEditor(props) {
//   const { getUser, isFullyLoggedIn } = useAccount();
//   const [agendaId, setAgendaId] = useState(undefined);
//   const [error, setError] = useState(undefined);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(undefined);
//   const [addHourUnavailability, setAddHourUnavailability] = useState(new Date().getHours());

//   const handleClick = (e) => {
//     if (e.event.event.extendedProps.isEditorEvent) {
//       console.log('isEditorEvent');
//     }

//     setSelectedEvent({
//       ...e,
//       isEditorEvent: e.event.event.extendedProps.isEditorEvent,
//       id: e.event.event.id,
//       title: e.event.event.title,
//     });
//     console.log(e);
//   };

//   const handleAddUnavailability = () => {
//     const startTime = new Date();
//     startTime.setHours(addHourUnavailability);
//     startTime.setMinutes(0);
//     startTime.setSeconds(0);

//     setEvents(
//       [
//         ...events,
//         createUnavailabilityEvent(
//           Date.now(),
//           startTime,

//           new Date(startTime.getTime() + 60 * 60 * 1000),
//         ),
//       ],
//     );
//   };

//   useEffect(() => {
//     if (isFullyLoggedIn()) {
//       const user = getUser();

//       if (!user.agenda) {
//         setError('Vous n\'avez pas encore d\'agenda. Veuillez en créer un avant de continuer.');
//       } else {
//         setAgendaId(getIdFromHydraUrl(user.agenda));
//       }
//     }
//   }, [isFullyLoggedIn(), agendaId === undefined]);

//   const handleEventDelete = () => {
//     if (!selectedEvent) {
//       alert('No event selected');
//       return;
//     }
//     if (!selectedEvent.isEditorEvent) {
//       alert('Cannot delete non-editor event');
//       return;
//     }

//     setEvents(events.filter((event) => event.id !== selectedEvent.event.event.id));
//     setSelectedEvent(undefined);
//   };

//   const handleSaveEvent = () => {
//     if (!selectedEvent) {
//       alert('No event selected');
//       return;
//     }
//     if (!selectedEvent.isEditorEvent) {
//       alert('Cannot save non-editor event');
//     }

//     saveEvent(selectedEvent)
//       .then(() => {
//         setSelectedEvent(undefined);
//         setAgendaId(undefined);
//         setEvents([]);
//       });
//   };

//   return (!agendaId || error)
//     ? <Loading error={error} centered />
//     : (
//       <>
//         <div>
//           <div className="d-flex gap-3">
//             <label htmlFor="unavailability-at" className="d-flex gap-2">
//               Indisponible à (heure) :
//               <input type="number" min={0} max={24} id="unavailability-at" value={addHourUnavailability} onChange={(e) => setAddHourUnavailability(e.target.value)} />
//             </label>
//             <button type="button" className="btn btn-success" onClick={handleAddUnavailability}>Ajouter une indisponibilité</button>
//           </div>
//           <div>
//             <p>{selectedEvent ? selectedEvent.event.event.title : 'No event selected'}</p>
//             {selectedEvent && (
//             <>
//               <button type="button" className="btn btn-danger" onClick={handleEventDelete}>Supprimer</button>
//               <button type="button" className="btn btn-secondary" onClick={() => setSelectedEvent(undefined)}>Déselectionner</button>
//               <button type="button" className="btn btn-primary" onClick={handleSaveEvent}>Enregistrer cette edition sur le serveur</button>
//             </>
//             )}
//           </div>
//         </div>
//         <AgendaCalendar agendaId={agendaId} externalEvents={events} onEventClicked={handleClick} />
//       </>
//     );
// }
