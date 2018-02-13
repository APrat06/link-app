import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Switch, Route} from 'react-router';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Signup from '../ui/Signup';
import Linka from '../ui/Link';
import notFound from '../ui/notFfound';
import Login from '../ui/Login';

const history = createHistory();
const location = history.location.pathname;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname.toLowerCase();
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    if (isUnauthenticatedPage && isAuthenticated){history.replace('/links');}
    else if (isAuthenticatedPage && !isAuthenticated){history.replace('/');}
};
export const routes = (
  <Router history = {history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/links" component={Linka}/>
      <Route path="*" component={notFound}/>
    </Switch>
  </Router>
);
Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'));
});