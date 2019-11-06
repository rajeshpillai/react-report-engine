import React from 'react';
import './App.css';

import Report from './components/report';
import Header from './components/report/header';
import Footer from './components/report/footer';
import Body from './components/report/body';

import ToolBox from './components/toolbox';

const data = {
  header: {
    title: "Header 1",
    subTitle: "Subtitle 1"
  },
  body: [
    { id: 1, "name": "Rajesh", city: "Mumbai" },
    { id: 2, "name": "Rocket Sketch", city: "Mumbai" },
    { id: 3, "name": "Rocker Coder", city: "Mumbai" },
  ],
  footer: {
    "title": "Footer 1",
  }
}
function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="toolbox col-sm-2">
          <ToolBox />
        </div>
        <div className="col-sm">
          <Report>
            <Header />
            <Body />
            <Footer />
          </Report>
        </div>
      </div>

    </div>
  );
}

export default App;
