import React from 'react';
import DetailCell from "./DetailCell";
import EditCell from './EditCell';

const CellChunk = ({mode, properties, column, rowData, onChange}) => {
  return <>{column.map((field, i) =>
    field ?
      mode === 'detail' ?
        <DetailCell
          key={i}
          property={properties[field]}
          value={rowData[field]}
        />:
        <EditCell
          key={i}
          property={properties[field]}
          value={rowData[field]}
          onChange={newValue => onChange(newValue, field)}
        /> :
      <React.Fragment key={i}></React.Fragment>
  )}</>
}
export default CellChunk;