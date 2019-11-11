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
  sum: (data, field) => sum(data, field),
  avg: (data, field) => avg(data, field),
  max: (data, field) => max(data, field)
};


const dataset = [
  { id: 1, name: "Name 1", country: "India", city: "Mumbai", sales: 100 },
  { id: 2, name: "Name 2", country: "India", city: "Mumbai", sales: 50 },
  { id: 3, name: "Name 3", country: "India", city: "Mumbai", sales: 100 },
  { id: 4, name: "Name 4", country: "India", city: "Kerala", sales: 300 },
  { id: 5, name: "Name 5", country: "India", city: "Kerala", sales: 500 },
  { id: 6, name: "Name 1", country: "US", city: "Texas", sales: 100 },
  { id: 7, name: "Name 2", country: "US", city: "Texas", sales: 50 },
  { id: 8, name: "Name 3", country: "US", city: "San Fransisco", sales: 100 },
  { id: 9, name: "Name 4", country: "UK", city: "London", sales: 300 },
  { id: 10, name: "Name 5", country: "UK", city: "Hammersmith", sales: 500 },
  { id: 11, name: "Name 5", country: "India", city: "", sales: 300 },

];

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
    sum: (data, field) => {
      console.log(`gf: before summing ${field}`, data);
      return calculations.sum(data, "sales")
    },
    avg: (data, field) => calculations.avg(data, "sales"),
    max: (data, field) => calculations.max(data, "sales")
  },
  /* to be automated */
  groupBy: ["country", "city"],

  reportFooter: {
    "title": "Copyright: Algorisys Technologies",
    sum: (data, field) => calculations.sum(data, "sales"),
    avg: (data, field) => calculations.avg(data, "sales"),
    max: (data, field) => calculations.max(data, "sales")
  },

}

function sum(reportData, field) {
  console.log(`before summing ${field}`, reportData);
  let sum = reportData.reduce((total, current) => {
    return total + current[field];
  }, 0);
  console.log(`summing ${field}`, reportData, sum);

  return sum;
}

function avg(reportData, field) {
  let sum = reportData.reduce((total, current) => {
    return total + current[field];
  }, 0);

  return sum / reportData.length;
}

function max(data, field) {
  return Math.max(...data.map(d => d[field]));
}

function App() {

  const [meta, setMeta] = useState(() => {
    let meta = JSON.parse(localStorage.getItem('reportMeta'));
    return meta || {};
  });

  const [groupedData, setGroupedData] = useState({});

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

  useEffect(() => {
    console.log('********APP DATA PROCESSING *******');
    var groupedData = window.d3.nest()
      .key(function (d) { return d.country; })
      .key(function (d) { return d.city; })
      // .rollup(function (v) {
      //   return window.d3.sum(v, function (d) { return d.sales; });
      // })
      .object(dataset);
    console.log(JSON.stringify(groupedData));

    setGroupedData(groupedData);

  }, [])

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
          <Report reportData={dataset} groupBy={data.groupBy}>
            <ReportHeader preview={preview} meta={meta.header} onUpdate={onHeaderUpdate} data={data.reportHeader} />
            <PageHeader preview={preview} meta={meta.pageHeader} onUpdate={onPageHeaderUpdate} data={data.pageHeader} />

            <GroupHeader groupBy={data.groupBy} preview={preview}
              meta={meta.groupHeader} onUpdate={onGroupHeaderUpdate}
              detailMeta={meta.body}
              groupFooterMeta={meta.groupFooter}
              reportFooterMeta={meta.reportFooter}
              data={data.groupHeader}
              groupFooterData={data.groupFooter}
              reportFooterData={data.reportFooter}
              reportData={groupedData}
              onGroupFooterUpdate={onGroupFooterUpdate}
            > </GroupHeader>

            {/* <ReportDetail preview={preview} meta={meta.body} onUpdate={onBodyUpdate} data={data.dataset} onRendered={onBodyRendered} /> */}

            {/* <GroupFooter preview={preview} meta={meta.groupFooter} data={data.groupFooter} onUpdate={onGroupFooterUpdate} /> */}
            <PageFooter preview={preview} meta={meta.pageFooter} data={data.pageFooter} onUpdate={onPageFooterUpdate} />
            <ReportFooter reportData={dataset} preview={preview} meta={meta.reportFooter} data={data.reportFooter} onUpdate={onReportFooterUpdate} />
          </Report>
        </div>
      </div>

    </div >
  );
}

export default App;
