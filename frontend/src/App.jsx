import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateReturn from './pages/CreateReturns';
import ShowReturn from './pages/ShowReturn';
import EditReturn from './pages/EditReturn';
import DeleteReturn from './pages/DeleteReturn';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/returns/create' element={<CreateReturn />} />
      <Route path='/returns/details/:id' element={<ShowReturn />} />
      <Route path='/returns/edit/:id' element={<EditReturn />} />
      <Route path='/returns/delete/:id' element={<DeleteReturn />} />
    </Routes>
  );
};

export default App