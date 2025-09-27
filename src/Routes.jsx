import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { useAuth } from "./components/auth/AuthProvider";
import NotFound from "pages/NotFound";
import AuthPage from "./pages/auth";
import CardDetails from './pages/card-details';
import AddCreditCard from './pages/add-credit-card';
import Dashboard from './pages/dashboard';
import AddTransaction from './pages/add-transaction';

const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="*" element={<AuthPage />} />
          </RouterRoutes>
        </ErrorBoundary>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/card-details" element={<CardDetails />} />
        <Route path="/add-credit-card" element={<AddCreditCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
