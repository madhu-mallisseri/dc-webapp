import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import AboutView from 'views/AboutView';
import LoginView from 'views/LoginView';
import SignupView from 'views/SignupView';
import ForgotView from 'views/ForgotView';
import ResetView from 'views/ResetView';
import DashboardView from 'views/DashboardView';
import ProfileView from 'views/ProfileView';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route component={AboutView} path='/about' />
    <Route component={LoginView} path='/login' />
    <Route component={SignupView} path='/signup' />
    <Route component={ForgotView} path='/forgot' />
    <Route component={ResetView} path='/reset' />
    <Route component={DashboardView} path='/dashboard' />
    <Route component={ProfileView} path='/profile' />
  </Route>
);
