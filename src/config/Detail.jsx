import React from 'react';
import Space from "./Space";
import Rows from "./Rows";

const Detail = ({display, value = {}, tableProperty, spaces, onChange}) => {
  return (
    <div style={{display: display ? 'block' : 'none'}}>
      <Space
        value={value.space}
        spaces={spaces}
        onChange={onChange}
      />
      <Rows
        value={value.rows}
        tableProperty={tableProperty}
        onChange={onChange}
      />
    </div>
  );
};
export default Detail;