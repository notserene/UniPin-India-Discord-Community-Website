import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import './index.css';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { EventRules } from './pages/EventRules';
import { EventWinners } from './pages/EventWinners';
import { Giveaways } from './pages/Giveaways';
import { GiveawayDetail } from './pages/GiveawayDetail';
import { GiveawayRules } from './pages/GiveawayRules';
import { GiveawayWinners } from './pages/GiveawayWinners';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <>
        <ScrollRestoration />
        <main className="flex-1 min-h-screen bg-[#0b0f19]">
          <NotFound />
        </main>
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventDetail /> },
      { path: "events/:id/rules", element: <EventRules /> },
      { path: "events/:id/winners", element: <EventWinners /> },
      { path: "giveaways", element: <Giveaways /> },
      { path: "giveaways/:id", element: <GiveawayDetail /> },
      { path: "giveaways/:id/rules", element: <GiveawayRules /> },
      { path: "giveaways/:id/winners", element: <GiveawayWinners /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> }
    ]
  }
], {
  basename: import.meta.env.BASE_URL
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);