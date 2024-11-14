import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SearchExplore from './components/SearchExplore';
import CreateRequest from './components/CreateRequest';
import RequestDetail from './components/RequestDetail';
import Messaging from './components/Messaging';
import ProfileManagement from './components/ProfileManagement';
import TransactionHistory from './components/TransactionHistory';
import NotificationCenter from './components/NotificationCenter';
import FeedbackSupport from './components/FeedbackSupport';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/dashboard" element={
              <PrivateRoute guestAllowed={true}>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/search" element={
              <PrivateRoute guestAllowed={true}>
                <SearchExplore />
              </PrivateRoute>
            } />
            <Route path="/create-request" element={
              <PrivateRoute>
                <CreateRequest />
              </PrivateRoute>
            } />
            <Route path="/request/:id" element={
              <PrivateRoute guestAllowed={true}>
                <RequestDetail />
              </PrivateRoute>
            } />
            <Route path="/messages" element={
              <PrivateRoute>
                <Messaging />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfileManagement />
              </PrivateRoute>
            } />
            <Route path="/transactions" element={
              <PrivateRoute>
                <TransactionHistory />
              </PrivateRoute>
            } />
            <Route path="/notifications" element={
              <PrivateRoute>
                <NotificationCenter />
              </PrivateRoute>
            } />
            <Route path="/feedback" element={
              <PrivateRoute guestAllowed={true}>
                <FeedbackSupport />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;