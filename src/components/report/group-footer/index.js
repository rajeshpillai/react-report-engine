import React, { useState, useEffect } from 'react';

function GroupFooter(props) {
  const { data, preview, meta, reportData, onUpdate } = props;
  const [rows, setRow] = useState([]);


  console.log("GroupFooter: data", reportData, data);
  // Update from parent (report meta data)
  useEffect(() => {
    setRow(meta || []);
  }, []);

  // Inform parent that rows have updated here
  useEffect(() => {
    onUpdate && onUpdate(rows);
  }, [rows]);

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDropFooter = (e, location) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`GF: ${source} dropped at ${location}`);
    let newRow = { id: +new Date() };
    setRow([...rows, newRow]);
  }

  const onDropRow = (e, location) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`GF: ${source} dropped at row ${location}`);

    let row = rows.find((r) => r.id == location);

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

  let design = (
    <div className="group-footer"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDropFooter(e, "header")}>
      <h1>Group Footer</h1>
      {
        rows.map((r) => {
          return <div key={r.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropRow(e, r.id)}
            className="row report-row edit-mode">
            {r.cols && r.cols.map((c) =>
              <div key={c.id}
                className="col-sm report-col edit-mode"
                onClick={(e) => onColClick(e, { r: r.id, c: c.id })}>
                {c.field}
              </div>
            )}
          </div>
        })

      }
    </div>
  );


  let runtime = preview && (
    <div className="group-footer">
      {
        rows.map((r) => {
          return <div key={r.id}
            className="row report-row">
            {r && r.cols && r.cols.map((c) =>
              <div key={c.id}
                className="col-sm report-col">
                {/* {c.field + ' ' + data[c.field]} */}
                {typeof data[c.field] == "function" ?
                  data[c.field](reportData, c.field).toFixed(2) : data[c.field]}
              </div>
            )}
          </div>
        })
      }
    </div>
  );

  return (
    preview ? runtime : design
  );
}

export default GroupFooter;
