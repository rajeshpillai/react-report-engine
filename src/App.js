import React, { useState, useEffect } from 'react';
import './App.css';

import Report from './components/report';
import Header from './components/report/header';
import Footer from './components/report/footer';
import Body from './components/report/body';
import ContentHeader from './components/report/content-header';

import ToolBox from './components/toolbox';



/* Formulas */
const calculations = {
  sum: (field) => () => sum(field),
  avg: (field) => () => avg(field),
  max: (field) => () => max(field)
};


const data = {
  header: {
    title: "Header 1",
    subTitle: "Subtitle 1"
  },
  body: [
    { id: 1, name: "Rajesh", city: "Mumbai", sales: 100 },
    { id: 2, name: "Rocket Sketch", city: "Mumbai", sales: 50 },
    { id: 3, name: "Rocker Coder", city: "Mumbai", sales: 100 },
    { id: 4, name: "Rocker Doodler", city: "Kerala", sales: 300 },

  ],
  footer: {
    "title": "Copyright: Algorisys Technologies",
    sum: calculations.sum("sales"),
    avg: calculations.avg("sales"),
    max: calculations.max("sales")
  }
}

function sum(field) {
  let sum = data.body.reduce((total, current) => {
    return total + current[field];
  }, 0);

  return sum;
}

function avg(field) {
  let sum = data.body.reduce((total, current) => {
    return total + current[field];
  }, 0);

  return sum / data.body.length;
}

function max(field) {
  return Math.max(...data.body.map(d => d[field]));
}

function App() {

  const [meta, setMeta] = useState(() => {
    let meta = JSON.parse(localStorage.getItem('reportMeta'));
    return meta || {};
  });

  const [preview, togglePreview] = useState(false);

  // First load
  useEffect(() => {
  }, []);

  useEffect(() => {
    localStorage.setItem('reportMeta', JSON.stringify(meta));
  }, [meta]);

  const onBodyRendered = () => {

  }

  const onHeaderUpdate = (header) => {
    setMeta({
      ...meta,
      header: header
    });
  }

  const onBodyUpdate = (body) => {
    setMeta({
      ...meta,
      body: body
    });
  }

  const onFooterUpdate = (footer) => {
    setMeta({
      ...meta,
      footer: footer
    });
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <button className="float-right"
            onClick={() => togglePreview(!preview)} >
            {preview ? "DESIGN" : "PREVIEW"}
          </button>
          <button className="float-right" >SAVE</button>
        </div>
      </div>
      <div className="row">
        <div className="toolbox col-sm-2">
          <ToolBox />
        </div>
        <div className="col-sm">
          <Report data={data}>
            <Header preview={preview} meta={meta.header} onUpdate={onHeaderUpdate} data={data.header} />
            <ContentHeader />
            <Body preview={preview} meta={meta.body} onUpdate={onBodyUpdate} data={data.body} onRendered={onBodyRendered} />
            <Footer preview={preview} meta={meta.footer} data={data.footer} onUpdate={onFooterUpdate}
            />
          </Report>
        </div>
      </div>

    </div >
  );
}

export default App;
