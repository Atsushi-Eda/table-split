import React from 'react';
import Space from "./Space";
import Layout from "./Layout";

const Detail = ({display, value = {}, tableProperty, spaces, onChange}) => {
  return (
    <div style={{display: display ? 'block' : 'none'}}>
      <Space
        value={value.space}
        spaces={spaces}
        onChange={onChange}
      />
      <Layout
        value={value.layout}
        tableProperty={tableProperty}
        onChange={onChange}
      />
    </div>
  );
};
export default Detail;