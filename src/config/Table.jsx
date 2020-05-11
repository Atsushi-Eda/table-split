import React from 'react';
import IsSplit from './IsSplit';
import Detail from './Detail';

const Table = ({value = {}, table, tableProperty, spaces, onChange}) => {
  const change = (type, newValue) => onChange(table, type, newValue);
  return (
    <div className='table-split-table'>
      <div className='table-split-table-name'>{tableProperty.label}</div>
      <IsSplit
        value={value.isSplit}
        table={table}
        onChange={change}
      />
      <Detail
        display={value.isSplit}
        value={value}
        tableProperty={tableProperty}
        spaces={spaces}
        onChange={change}
      />
    </div>
  );
};
export default Table;