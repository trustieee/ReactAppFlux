import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import PageNotFound from './PageNotFound';
import CourseManager from './CourseManagerPage.js';
import AuthorManager from './AuthorManager.js';
import Header from './common/Header';
import Courses from './CoursesPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function component
function App() {
  // calling js inside jsx doesnt work without some help
  //  needs to be placed within clurly braces, and can remove the return/semicolon
  // toastify's property for 'hideProgressBar' doesn't need a true setter because the existence
  //  of the property infers truthiness
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      {/* '/' matches all routes, so it will always render*/}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" component={Courses} />
        <Route path="/course/:slug" component={CourseManager} />
        <Route path="/course" component={CourseManager} />
        <Route path="/about" component={AboutPage} />
        <Route path="/author" component={AuthorManager} />
        <Redirect from="/about-page" to="/about" />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
