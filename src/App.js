import React, { useState, useEffect } from 'react';
import './App.css';

import Report from './components/report';
import ReportHeader from './components/report/report-header';
import PageHeader from './components/report/page-header';
import GroupHeader from './components/report/group-header';
import ReportDetail from './components/report/report-detail';
import GroupFooter from './components/report/group-footer';
import ReportFooter from './components/report/report-footer';
import PageFooter from './components/report/page-footer';

import ToolBox from './components/toolbox';



/* Formulas */
const calculations = {
  sum: (field) => () => sum(field),
  avg: (field) => () => avg(field),
  max: (field) => () => max(field)
};


const data = {
  reportHeader: {
    title: `DAILY SALES REPORT`,
    subTitle: "Subtitle 1"
  },
  pageHeader: {

  },
  groupHeader: {

  },
  groupFooter: {
    sum: calculations.sum("sales"),
    avg: calculations.avg("sales"),
    max: calculations.max("sales")
  },
  /* to be automated */
  groupBy: "city",
  dataset: [
    { id: 1, name: "Rajesh", city: "Mumbai", sales: 100 },
    { id: 2, name: "Rocket Sketch", city: "Mumbai", sales: 50 },
    { id: 3, name: "Rocker Coder", city: "Mumbai", sales: 100 },
    { id: 4, name: "Rocker Doodler", city: "Kerala", sales: 300 },
    { id: 5, name: "Rocker Designer", city: "Kerala", sales: 500 },

  ],

  reportFooter: {
    "title": "Copyright: Algorisys Technologies",
    sum: calculations.sum("sales"),
    avg: calculations.avg("sales"),
    max: calculations.max("sales")
  }
}

function sum(field) {
  let sum = data.dataset.reduce((total, current) => {
    return total + current[field];
  }, 0);

  return sum;
}

function avg(field) {
  let sum = data.dataset.reduce((total, current) => {
    return total + current[field];
  }, 0);

  return sum / data.dataset.length;
}

function max(field) {
  return Math.max(...data.dataset.map(d => d[field]));
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

  const onPageHeaderUpdate = (header) => {
    setMeta({
      ...meta,
      pageHeader: header
    });
  }

  const onGroupHeaderUpdate = (header) => {
    setMeta({
      ...meta,
      groupHeader: header
    });
  }

  const onBodyUpdate = (body) => {
    setMeta({
      ...meta,
      body: body
    });
  }

  const onReportFooterUpdate = (footer) => {
    setMeta({
      ...meta,
      reportFooter: footer
    });
  }

  const onPageFooterUpdate = (footer) => {
    setMeta({
      ...meta,
      pageFooter: footer
    });
  }

  const onGroupFooterUpdate = (footer) => {
    setMeta({
      ...meta,
      groupFooter: footer
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
            <ReportHeader preview={preview} meta={meta.header} onUpdate={onHeaderUpdate} data={data.reportHeader} />
            <PageHeader preview={preview} meta={meta.pageHeader} onUpdate={onPageHeaderUpdate} data={data.pageHeader} />
            <GroupHeader groupBy={data.groupBy} preview={preview}
              meta={meta.groupHeader} onUpdate={onGroupHeaderUpdate}
              detailMeta={meta.body}
              footerMeta={meta.groupFooter}
              data={data.groupHeader}
              groupFooterData={data.groupFooter}
              reportData={data.dataset}
              onGroupFooterUpdate={onGroupFooterUpdate}
            >
              {/* <ReportDetail preview={preview} meta={meta.body} onUpdate={onBodyUpdate} data={data.dataset} onRendered={onBodyRendered} /> */}
            </GroupHeader>
            {/* <GroupFooter preview={preview} meta={meta.groupFooter} data={data.groupFooter} onUpdate={onGroupFooterUpdate} /> */}
            <ReportFooter preview={preview} meta={meta.reportFooter} data={data.reportFooter} onUpdate={onReportFooterUpdate} />
            <PageFooter preview={preview} meta={meta.pageFooter} data={data.pageFooter} onUpdate={onPageFooterUpdate} />
          </Report>
        </div>
      </div>

    </div >
  );
}

export default App;
