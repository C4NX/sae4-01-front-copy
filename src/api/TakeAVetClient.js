import HydraResult from './hydra/HydraResult';

export const SITE_URL = 'http://localhost:8000';
export const API_URL = `${SITE_URL}/api`;

export default function isApiAvailable() {
  return fetch(`${API_URL}/`)
    .then((res) => res.status === 200)
    .catch(() => false);
}

/**
 * Get the hydra description from the hydra json object
 * @param {*} hydraJson the hydra json object
 * @returns the hydra description or "Missing hydra description"
 */
function getHydraDescriptionError(hydraJson) {
  if (hydraJson === undefined) { return 'Undefined hydra array'; }
  return hydraJson['hydra:description'] ?? 'Missing hydra description';
}

/**
 * Handle the status of the response and throw an error if the status is in codeArray
 * or if the status is 422 with the additional hydra description
 * @param {*} res the response of the fetch
 * @param {*} codes a dictionary of status code and their description
 * @returns async function
 */
function handleStatus(res, codes) {
  // hydra error
  if (res.status === 422 || res.status === 500) {
    return res.json().then((jsonRes) => {
      const err = new Error(getHydraDescriptionError(jsonRes));
      err.data = jsonRes;
      throw err;
    });
  }

  // eslint-disable-next-line no-prototype-builtins
  if (codes !== undefined && codes !== null && codes.hasOwnProperty(res.status)) {
    const err = new Error(`${res.status} : ${codes[res.status]}`);
    err.code = res.status;
    throw err;
  }

  // if the status is in the 200 range, return the response
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  // else throw an error
  const err = new Error(`${res.status} : ${res.statusText}`);
  err.code = res.status;
  throw err;
}

/**
 * Get all vets from the API and return a promise with the vets or an error
 * @returns async function
 */
export async function getAllVeterinary() {
  return fetch(`${API_URL}/vetos`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAllAppointmentTypes() {
  return fetch(`${API_URL}/type_appointments`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

/**
 * Get all the agendas from the API and return a promise with the agendas or an error
 * @returns async function
 */
export async function getAllAgenda() {
  return fetch(`${API_URL}/agendas`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAllThread(page) {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('page', (+page ?? 1).toString());

  return fetch(`${API_URL}/threads?${urlSearchParams}`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function getAllTypeAnimal() {
  return fetch(`${API_URL}/type_animals`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function getTypeAnimal(id) {
  return fetch(`${API_URL}/type_animals/${id}`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function getMyAddresses() {
  return fetch(`${API_URL}/me/addresses`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getMyAppointments(showValidated = false) {
  return fetch(`${API_URL}/me/appointments?show_validated=${showValidated}`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function patchAppointment(appointmentId, data) {
  return fetch(`${API_URL}/appointments/${appointmentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function postUnavailability(data) {
  return fetch(`${API_URL}/unavailabilities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function postVacation(data) {
  return fetch(`${API_URL}/vacations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function takeAppointment(data) {
  return fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, {}))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function updateUser(userId, data) {
  return fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function updateThread(threadId, data) {
  return fetch(`${API_URL}/threads/${threadId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function saveThread(data) {
  return fetch(`${API_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function saveAnimal(data) {
  return fetch(`${API_URL}/animals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function saveAddress(insert, id, data) {
  return fetch(`${API_URL}/addresses${!insert ? `/${id}` : ''}`, {
    method: insert ? 'POST' : 'PATCH',
    headers: {
      'Content-Type': insert ? 'application/json' : 'application/merge-patch+json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 401: 'Vous devez être connecté pour accéder à cette page.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getOneThread(id) {
  return fetch(`${API_URL}/threads/${id}`)
    .then((res) => handleStatus(res, { 404: 'Aucun thread trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function replyToThread(replyMessage, threadId) {
  return fetch(`${API_URL}/thread_replies`, {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      description: replyMessage,
      thread: `/api/threads/${threadId}`,
    }),
  }).then((res) => handleStatus(res, { }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function getAllReplyFrom(threadId, page) {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('page', (+page ?? 1).toString());

  return fetch(`${API_URL}/thread_replies/from/${threadId}?${urlSearchParams}`)
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
window.getAllReplyFrom = getAllReplyFrom;
/**
 * Get an agenda by its id from the API and return a promise with the agenda or an error
 * @param {number} id the id of the agenda to get
 * @param signal the signal to cancel the request
 * @returns async function
 */
export async function getAgenda(id, signal = null) {
  return fetch(`${API_URL}/agendas/${id}`, { signal })
    .then((res) => handleStatus(res, { 404: 'Aucun agenda trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getUnavailabilityFromAgenda(agendaId) {
  return fetch(`${API_URL}/unavailabilities/from/${agendaId}/`)
    .then((res) => handleStatus(res, { 404: 'Aucun agenda trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getVacationFromAgenda(agendaId) {
  return fetch(`${API_URL}/vacations/from/${agendaId}/`)
    .then((res) => handleStatus(res, { 404: 'Aucun agenda trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAnimal(animalId) {
  return fetch(`${API_URL}/animals/${animalId}`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucun animal trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAnimalImages(animalId) {
  return fetch(`${API_URL}/animals/${animalId}/images`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucun animal trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAllAnimalAsVet(userId) {
  return fetch(`${API_URL}/animals/from/${userId}/`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucun animal trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function getAllAnimalAsClient() {
  return fetch(`${API_URL}/me/animals`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucun animal trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAllRecapsFromAnimal(animalId, page) {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('page', (+page ?? 1).toString());

  return fetch(`${API_URL}/animal_records/from/${animalId}?${page}`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucun animal trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getClient(clientId) {
  return fetch(`${API_URL}/users/${clientId}`)
    .then((res) => handleStatus(res, { 404: 'Aucun animal trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}
export async function getAddress(addressId) {
  return fetch(`${API_URL}/addresses/${addressId}`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucune adresse trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function deleteAddress(addressId) {
  return fetch(`${API_URL}/addresses/${addressId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 404: 'Aucune adresse trouvé avec cet identifiant.' }))
    .then((res) => res.status === 204);
}

/**
 * Get the current user from the API and return a promise with the user or an error
 * @param {*} onUnauthorized callback function to call if the user is not authenticated
 * @returns async function
 */
export async function getMe(onUnauthorized) {
  return fetch(`${API_URL}/me`, {
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 401 && onUnauthorized !== undefined) {
        onUnauthorized();
      }
      handleStatus(res, { 401: 'User is not authenticated, please login.' });
      return res;
    })
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function registerUser(email, password, lastName, firstName, isHusbandry) {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isHusbandry,
      email,
      password,
      lastName,
      firstName,
    }),
  })
    .then((res) => handleStatus(res, {
      400: 'The email address is already used by another account.',
    }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export function loginUrl() {
  return `${SITE_URL}/auth/login?redirect=${window.location.href}`;
}

export function registerUrl() {
  return `${SITE_URL}/auth/register?redirect=${window.location.href}`;
}

export function logoutUrl() {
  return `${SITE_URL}/auth/logout?redirect=${window.location.href}`;
}

export function adminUrl() {
  return `${SITE_URL}/admin`;
}

export function avatarUrl(userId) {
  return `${API_URL}/users/${userId}/avatar`;
}

export function avatarUploadUrl() {
  return `${API_URL}/me/avatar`;
}

export function animalImageUploadUrl(animalId) {
  return `${API_URL}/animals/${animalId}/image`;
}

export function uploadFromInput(url, input) {
  const formData = new FormData();
  formData.append('file', input.files[0]);
  return fetch(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
}

export function deleteImageFromAnimal(animalId, imageId) {
  return fetch(`${API_URL}/animals/${animalId}/image/${imageId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => handleStatus(res, { 404: 'Aucune image trouvée avec cet identifiant.' }));
}

// export async function loginUser(email, password) {
//   return fetch(`${API_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     credentials: 'include',
//     // mode: 'no-cors',
//   })
//     .then((res) => handleStatus(res, {
//       401: 'The email address or the password is incorrect.',
//     }))
//     .then((res) => res.json())
//     .then((res) => res.user);
// }

export async function logoutUser() {
  return fetch(`${SITE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => handleStatus(res, {}))
    .then((res) => res.status === 200); // TODO: may change in the future
}

/**
 * Get the upcoming events from the API and return a promise with the events or an error
 * @param agendaId the id of the agenda to get the events from
 * @returns {Promise<HydraResult>} async function
 */
export async function getUpcomingEvents(agendaId, signal = null) {
  return fetch(`${API_URL}/agendas/${agendaId}/upcoming`, { signal })
    .then((res) => handleStatus(res, { 404: 'Aucun agenda trouvé avec cet identifiant.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function getAppointmentsThisHour() {
  return fetch(`${API_URL}/appointments/current/hour`, { credentials: 'include' })
    .then((res) => handleStatus(res, { 404: 'Aucun rendez-vous trouvé.' }))
    .then((res) => res.json())
    .then((res) => new HydraResult(res));
}

export async function subscribeToNewsletter(email) {
  return fetch(`${API_URL}/newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => handleStatus(res, {}))
    .then((res) => res.json())
    .then((res) => res.id);
}

export function toBaseUrl(partUrl) {
  return `${SITE_URL}${partUrl}`;
}
