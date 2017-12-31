import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import LinkCreate from './components/link-create';


const App = () =>  {
  return (
    <div>
      <Header />
      <LinkCreate />
    </div>
  )
}

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});

