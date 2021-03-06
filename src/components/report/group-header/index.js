import React, { useState, useEffect } from 'react';
import ReportDetail from '../report-detail';
import GroupFooter from '../group-footer';
import ReportFooter from '../report-footer';

import _ from 'lodash';

function GroupHeader({ groupBy, data, reportData, groupFooterData, reportFooterData, reportFooterMeta, onUpdate, meta, groupFooterMeta, detailMeta, preview, children, onGroupFooterUpdate }) {
  const [rows, setRow] = useState([]);
  const [groupedData, setGroupData] = useState([]);

  useEffect(() => {
    console.log('group meta: ', meta);
    setRow(meta || []);
  }, []);

  //unused: kept for ref
  useEffect(() => {
    let distinctGroup = _.uniq(_.map(reportData, groupBy));
    // Take distinct of each group by
    console.log(`*****************GroupBy ${groupBy} `, distinctGroup);
    setGroupData(distinctGroup);
  }, [groupBy])

  useEffect(() => {
    onUpdate(rows);
  }, [rows]);

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDropHeader = (e, location) => {
    e.preventDefault();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`GH: ${source} dropped at ${location}`);
    let newRow = { id: +new Date() };
    setRow([...rows, newRow]);
  }

  const onDropRow = (e, location) => {
    // Body Section: Should row be restricted to max 1 as the 
    // tow as to repeat as per the data length
    e.preventDefault();
    e.stopPropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`GH:${source} dropped at row ${location}`);

    let row = rows.find((r) => r.id == location);
    console.log('found: ', row);


    let newRows = rows.map((r) => {
      if (r.id == location) {
        r.cols = row.cols || [];
        let newCol = { id: +new Date() };
        r.cols.push(newCol);
      }
      return r;
    })

    setRow([...newRows]);
  }

  const onColClick = (e, target) => {
    //alert(JSON.stringify(target));
    // Grab the column by first grabbing the row
    let fieldName = window.prompt("Enter field name:");

    let newRows = rows.map((r) => {
      if (r.id == target.r) {
        if (r.cols) {
          r.cols.map((c) => {
            if (c.id == target.c) {
              c.field = fieldName;
            }
            return c;
          })
        }
      }
      return r;
    });

    setRow(newRows);
  }


  let design = (!preview &&
    <div className="group-header"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDropHeader(e, "header")}>
      <h1>Group Header</h1>
      {
        rows.map((r) => {
          return <div key={r.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropRow(e, r.id)}
            className="row report-row edit-mode">
            {r.cols && r.cols.map((c) =>
              <div key={'c' + c.id}
                className="col-sm report-col edit-mode"
                onClick={(e) => onColClick(e, { r: r.id, c: c.id })}>
                {c.field}
              </div>
            )}
          </div>
        })
      }
      <ReportDetail preview={preview} meta={detailMeta} />

      <GroupFooter preview={preview}
        meta={groupFooterMeta} data={groupFooterData} />

    </div>
  );


  let runtime = (preview &&
    <div className="group-header">
      {
        Object.keys(reportData).map((d) => {
          console.log("IMP: ", d, reportData[d]);
          return (
            <div>
              <h2>Group: {d}</h2>
              {
                Object.keys(reportData[d]).map((g) => {
                  return (
                    <>
                      <h2>{g}</h2>
                      <ReportDetail preview={preview} meta={detailMeta}
                        data={reportData[d][g]} />
                      <GroupFooter preview={preview}
                        reportData={reportData[d][g]}
                        meta={groupFooterMeta} data={groupFooterData} />
                    </>
                  )
                })
              }
            </div>
          )
        })}
    </div>
  );

  return (
    preview ? runtime : design
  );
}

export default GroupHeader;
