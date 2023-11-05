import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorRoute from './routes/ErrorRoute';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../public/css/index.css';
import HomeRoute from './routes/HomeRoute';
import ContactRoute from './routes/ContactRoute';

import UserProvider from './contexts/user/Provider';
import MeRoute from './routes/MeRoute';
import FAQRoute from './routes/FAQRoute';
import ThreadReplyRoute, { loader as threadReplyLoader } from './routes/ThreadReplyRoute';
import AgendaRoute from './routes/AgendaRoute';
import AdressesRoute from './routes/AdressesRoute';
import { AllThreadReplyRoute } from './routes/AllThreadReplyRoute';
import NoMatchRoute from './routes/NoMatchRoute';
import { ThreadFormRoute } from './routes/ThreadFormRoute';
import AnimalRoute from './routes/AnimalRoute';
import BaseParentRoute from './routes/BaseParentRoute';
import NewAppointmentsSubRoute from './routes/appointments/NewAppointmentsSubRoute';
import ListAppointmentsSubRoute from './routes/appointments/ListAppointmentsSubRoute';
import DashboardRoute from './routes/DashboardRoute';
import EditorSubroute from './routes/Dashboard/EditorSubroute';
import AddAnimalFormRoute from './routes/AddAnimalFormRoute';
import ValidateSubroute from './routes/Dashboard/ValidateSubroute';
import AnimalRecapRoute from './routes/AnimalRecapRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute twitterUsername="takeavet_demo" />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '/contact',
    element: <ContactRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '/me',
    element: <MeRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '/faq',
    element: <FAQRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/faq/:threadId',
        element: <ThreadReplyRoute />,
        loader: threadReplyLoader,
      },
      {
        path: '/faq/thread/:threadId',
        element: <AllThreadReplyRoute />,
        loader: threadReplyLoader,
      },
      {
        path: '/faq/thread',
        element: <ThreadFormRoute />,
      },
    ],
  },
  {
    path: '/my/adresses',
    element: <AdressesRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '/planning',
    element: <AgendaRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '/animals',
    element: <AnimalRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/animals/addAnimal',
        element: <AddAnimalFormRoute />,
      },
    ],
  },
  {
    path: 'animal/recap/:animalId',
    element: <AnimalRecapRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '/dashboard',
    element: <BaseParentRoute title="Votre tableau de bord" splited />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardRoute />,
      },
      {
        path: '/dashboard/editor',
        element: <EditorSubroute />,
      },
      {
        path: '/dashboard/validate',
        element: <ValidateSubroute />,
      },
    ],
    errorElement: <ErrorRoute />,
  },
  {
    path: '/appointments',
    element: <BaseParentRoute title="Gestion des rendez-vous" splited />,
    children: [
      {
        path: '/appointments',
        element: <ListAppointmentsSubRoute />,
      },
      {
        path: '/appointments/new',
        element: <NewAppointmentsSubRoute />,
      },
    ],
  },
  {
    path: '*',
    element: <NoMatchRoute />,
    errorElement: <ErrorRoute />,
  },
]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
