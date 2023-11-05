import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap-icons/font/bootstrap-icons.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin from '@fullcalendar/interaction';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAgenda,
  getUnavailabilityFromAgenda,
  getUpcomingEvents,
  getVacationFromAgenda, loginUrl,
} from '../../api/TakeAVetClient';
import useAccount from '../../hooks/useAccount';

const eventsColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
];

/**
 * Convert an event from the API to a FullCalendar event
 * @param apiEvent {Object} event from the API
 * @returns {{start: Date, end: Date, title: string}} event on FullCalendar format
 */
function createEventFromApi(apiEvent, colored) {
  const date = new Date(apiEvent.date);
  const startTimeDate = new Date(apiEvent.startHour);
  const endTimeDate = new Date(apiEvent.endHour);

  startTimeDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  endTimeDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

  return {
    title: `${apiEvent.type.name}`,
    start: startTimeDate,
    end: endTimeDate,
    color: colored ? eventsColors[apiEvent.type.id % eventsColors.length] : 'grey',
    data: apiEvent,
    editable: false,
  };
}

function createEventEditable(duration) {
  return {
    title: '[Position du rendez-vous]',
    start: new Date(),
    end: new Date(new Date().getTime() + duration * 60000),
    color: 'red',
    editable: true,
    durationEditable: false, // block resizing
    isMainEditable: true,
  };
}

function createEventFromUnavailabilitiesApi(unavailability) {
  return {
    title: `Indisponible: ${unavailability.lib}`,
    color: 'red',
    start: new Date(unavailability.startDate),
    end: new Date(unavailability.endDate),
    editable: false,
  };
}

function createEventFromVacationsApi(vacation) {
  return {
    title: `Vacances: ${vacation.lib}`,
    color: 'blue',
    start: new Date(vacation.startDate),
    end: new Date(vacation.endDate),
    editable: false,
  };
}

/**
 * @file AgendaCalendar.jsx
 * @description AgendaCalendar component
 * @constructor
 */
export default function AgendaCalendar(props) {
  const [eventsList, setEventsList] = useState([]);
  const setLocation = useNavigate();
  const { pathname } = useLocation();
  const [editModeEvent, setEditModeEvent] = useState(null);

  const { isFullyLoggedIn } = useAccount();

  const {
    agendaId,
    className,
    onEventClicked,
    editMode,
    editModeEventDuration,
    onEditDateChanged,
    externalEvents,
  } = props;

  // handle agenda state
  const [agendaState, setAgendaState] = useState({
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
  });

  // handle custom buttons when logged in or not
  const customButtons = isFullyLoggedIn() ? {
    newApp: {
      text: 'Prendre un rendez-vous',
      click() {
        if (pathname !== '/appointments/new') {
          setLocation('/appointments/new');
        }
      },
    },
  } : {
    loginApp: {
      text: 'Se connecter',
      click() {
        window.location.href = loginUrl();
      },
    },
  };

  // handle duration in edit mode
  useEffect(() => {
    console.log('[Agenda] Duration changed: ', editModeEventDuration);
    setEditModeEvent(createEventEditable(editModeEventDuration));
  }, [editModeEventDuration]);

  // handle abort controller
  const controller = new AbortController();
  const { signal } = controller;

  // handle events loading on agenda or mode change
  useEffect(() => {
    console.info('%cReloading events, this may take a while...', 'color: orange; font-weight: bold;');
    getAgenda(agendaId, signal)
      .then((agenda) => {
        console.log(`[Agenda] Received agenda #${agendaId}`, agenda);

        const slotMaxTime = (new Date(agenda.member.endHour)).toTimeString();
        const slotMinTime = (new Date(agenda.member.startHour)).toTimeString();

        console.log(`[Agenda] slotMinTime: ${slotMinTime}; slotMaxTime: ${slotMaxTime}; Unavailabilities: ${agenda.member.unavailabilities.length}; Vacations: ${agenda.member.vacations.length}`);

        setAgendaState({
          slotMinTime,
          slotMaxTime,
        });

        getUpcomingEvents(agendaId, signal)
          .then(async (events) => {
            // convert array to events on fullcalendar format
            const fcEvents = events.member.map((event) => createEventFromApi(event, !editMode));

            const unavailabilities = await getUnavailabilityFromAgenda(agendaId);
            const vacations = await getVacationFromAgenda(agendaId);

            console.log(`[Agenda] Received ${unavailabilities.member.length} unavailabilities from #${agendaId}`);
            console.log(`[Agenda] Received ${vacations.member.length} vacations from #${agendaId}`);

            // add unavailabilities
            fcEvents.push(
              ...unavailabilities.member.map(
                (unavailability) => createEventFromUnavailabilitiesApi(unavailability),
              ),
            );
            // add vacations
            fcEvents.push(
              ...vacations.member.map(
                (vacation) => createEventFromVacationsApi(vacation),
              ),
            );

            setEventsList(fcEvents);
          });
      });
  }, [agendaId, editMode]);

  // handle list to display
  let eventListWithEditModeEvent = (editMode && editModeEvent)
    ? [...eventsList, editModeEvent]
    : eventsList;

  // handle external events
  if (externalEvents) {
    eventListWithEditModeEvent = [...eventListWithEditModeEvent, ...externalEvents];
  }

  return (
    <div className={className}>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, bootstrap5Plugin, interactionPlugin]}
        initialView="timeGridWeek"
        themeSystem="bootstrap5"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'newApp dayGridMonth,timeGridWeek,timeGridDay',
        }}
        nowIndicator
        customButtons={customButtons}
        slotMinTime={agendaState.slotMinTime}
        slotMaxTime={agendaState.slotMaxTime}
        expandRows={false}
        firstDay={1}
        slotLabelInterval="00:30:00"
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
        allDaySlot={false}
        startParam={false}
        displayEventTime
        allDayContent={false}
        locale={frLocale}
        events={eventListWithEditModeEvent}
        editable={editMode}
        eventOverlap={false}
        eventDrop={(eventDropInfo) => {
          if (editMode) {
            const { start } = eventDropInfo.event;
            onEditDateChanged(start);
          }
        }}
        eventClick={(eventClickInfo) => {
          const { data } = eventClickInfo.event.extendedProps;
          if (onEventClicked !== undefined) {
            onEventClicked({ appointment: data, event: eventClickInfo });
          }
        }}
      />
    </div>
  );
}

AgendaCalendar.propTypes = {
  agendaId: PropTypes.number.isRequired,
  className: PropTypes.string,
  onEventClicked: PropTypes.func,
  editMode: PropTypes.bool,
  editModeEventDuration: PropTypes.number,
  externalEvents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    editable: PropTypes.bool,
  })),
  onEditDateChanged: PropTypes.func,
};

AgendaCalendar.defaultProps = {
  className: '',
  onEventClicked: undefined,
  editMode: false,
  externalEvents: [],
  editModeEventDuration: 30,
  onEditDateChanged: () => {},
};
