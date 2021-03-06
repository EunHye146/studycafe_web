import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Join from '../pages/Join';
import Space from '../pages/newSpace';
import Location from '../pages/Location';
import Product from '../pages/Product';
import Notice from '../pages/Notice';
import NoticeCont from '../components/Notice/NoticeCont';
import Write from '../components/Notice/Write';
import Update from '../components/Notice/Update';
import Admin from '../pages/Admin';
//import Space2 from '../pages/Space';


const Routers = () => {
    return (
        <BrowserRouter>
        <Route component={Main} path='/' exact/>
        <Route component={Join} path='/join'/>
        <Route component={Location} path='/location'/>
        <Route component={Space} path='/space'/>
        <Route component={Product} path='/product'/>
        <Route component={Notice} path='/notice' exact/>
        <Route component={NoticeCont} path='/notice/:id' exact/>
        <Route component={Write} path='/write' />
        <Route component={Update} path='/update/:id' />
        <Route component={Admin} path='/admin'/>
        </BrowserRouter>
    );
};

export default Routers;