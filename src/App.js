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
    { id: 1, name: "Rajesh", city: "Mumbai", sales: 100 },
    { id: 2, name: "Rocket Sketch", city: "Mumbai", sales: 50 },
    { id: 3, name: "Rocker Coder", city: "Mumbai", sales: 100 },
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
            <Header data={data.header} />
            <Body data={data.body} />
            <Footer data ={data.footer} />
          </Report>
        </div>
      </div>

    </div>
  );
}

export default App;
