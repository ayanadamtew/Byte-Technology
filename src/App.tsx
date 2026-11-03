/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BYTE_NAVIGATION_ITEMS } from './config/navigation';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { SiteLayout } from './components/layout/SiteLayout';
import {
  RouteArchitectureShell,
  NotFoundView,
} from './components/layout/RouteArchitectureShell';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            {BYTE_NAVIGATION_ITEMS.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteArchitectureShell route={route} />}
              />
            ))}
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
