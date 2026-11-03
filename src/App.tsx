/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { SiteLayout } from './components/layout/SiteLayout';
import { NotFoundView } from './components/layout/RouteArchitectureShell';
import { HomePage } from './pages/HomePage';

// Code-split secondary routes while keeping HomePage eager for immediate LCP
const ServicesPage = React.lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ApproachPage = React.lazy(() =>
  import('./pages/ApproachPage').then((m) => ({ default: m.ApproachPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = React.lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

function RouteLoadingFallback() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="mx-auto min-h-[70vh] max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="h-4 w-40 rounded bg-[#E7E6E0]" />
      <div className="mt-4 h-10 w-3/4 max-w-2xl rounded bg-[#E7E6E0]" />
      <div className="mt-4 h-5 w-1/2 max-w-xl rounded bg-[#E7E6E0]" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <React.Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/approach" element={<ApproachPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundView />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

