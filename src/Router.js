import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Views
import Home from './views/Home/Home';
import About from './views/About/About';
import Operations from './views/Operations/Operations';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/operations' component={Operations} />
            <Route path='/about' component={About} />
        </Switch>
    </BrowserRouter>
);
export default Router;