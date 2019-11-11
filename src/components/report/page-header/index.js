import React, { useState, useEffect } from 'react';
import Text from '../../text';
import Label from '../../label';

function PageHeader({ data, onUpdate, meta, preview }) {
  const [rows, setRow] = useState([]);

  useEffect(() => {
    console.log('meta: ', meta);
    setRow(meta || []);
  }, []);

  useEffect(() => {
    onUpdate && onUpdate(rows);
  }, [rows]);

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDropHeader = (e, location) => {
    e.preventDefault();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at ${location}`);
    let newRow = { id: +new Date() };
    setRow([...rows, newRow]);
  }

  const onDropRow = (e, location) => {
    // Body Section: Should row be restricted to max 1 as the 
    e.preventDefault();
    e.stopPropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at row ${location}`);

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

  //todo: Check type of toolbox element being dropped
  const onColumnDrop = (e, row, col) => {
    e.stopPropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at row ${row}, col ${col}`);
    // Grab the column
    let targetRow = rows.find((r) => r.id == row);
    console.log('found: ', targetRow);

    let newRows = rows.map((r) => {
      if (r.id == row) {
        if (r.cols) {
          r.cols.map((c) => {
            if (c.id == col) {
              c.label = "Label";
            }
            return c;
          })
        }
      }
      return r;
    });

    setRow(newRows);

  }

  const onTextChange = (meta, value) => {
    console.log("text changed: ", meta, value);

    let targetRow = rows.find((r) => r.id == meta.r);
    console.log('found: ', targetRow);

    let newRows = rows.map((r) => {
      if (r.id == meta.r) {
        if (r.cols) {
          r.cols.map((c) => {
            if (c.id == meta.c) {
              c.label = "Label";
              c.textValue = value;
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
    <div className="content-header"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDropHeader(e, "header")}>
      <h1>Page Header</h1>
      {
        rows.map((r) => {
          return <div key={r.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropRow(e, r.id)}
            className="row cheader-row edit-mode">
            {r.cols && r.cols.map((c) =>
              <div key={'c' + c.id}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onColumnDrop(e, r.id, c.id)}
                className="col-sm cheader-col edit-mode">
                {c.label &&
                  <Text onChange={onTextChange} text={c.textValue}
                    meta={{ r: r.id, c: c.id }} />}{c.field}

              </div>
            )}
          </div>
        })

      }
    </div>
  );

  let r = rows[0];

  let runtime = (
    <div className="content-header">
      {r &&
        <div key={r.id}
          className="row report-row">
          {r && r.cols && r.cols.map((c) =>
            <div key={'c' + c.id}
              className="col-sm report-col">
              {c.label && <Label text={c.textValue} />}
              {c.field}{data[c.field]}
            </div>
          )}
        </div>
      }
    </div>
  );

  return (
    preview ? runtime : design
  );
}

export default PageHeader;
