import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1 pt-24 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}