import React from 'react';
import moment from "moment";

const DetailCell = ({property, value = ''}) => {
  const type = property.type;
  if(['NUMBER', 'CALC'].includes(type)){
    return <div className='split-table-detail split-table-detail-number'>
      {property.unitPosition === 'BEFORE' ? `${property.unit} ` : ''}
      {value}
      {property.unitPosition === 'AFTER' ? ` ${property.unit}` : ''}
    </div>;
  }else if(['MULTI_LINE_TEXT'].includes(type)){
    return <div className='split-table-detail split-table-detail-multi-line-text'>
      {value}
    </div>;
  }else if(['CHECK_BOX', 'MULTI_SELECT'].includes(type)){
    return <div className='split-table-detail split-table-detail-multi-values'>
      {value.map((v, i) => <span key={i}>{v}</span>)}
    </div>;
  }else if(['DATETIME'].includes(type)){
    return <div className='split-table-detail split-table-detail-text'>
      {moment(value).isValid() ? moment(value).format('YYYY-MM-DD HH:mm') : value}
    </div>;
  }else if(['LINK'].includes(type)){
    return <div className='split-table-detail split-table-detail-text'>
      <a
        href={(property.protocol === 'CALL' ? 'callto:' : (property.protocol === 'MAIL' ? 'mailto:' : '')) + value}
        target={property.protocol === 'WEB' ? '_blank:' :  ''}
      >
        {value}
      </a>
    </div>;
  }else{
    return <div className='split-table-detail split-table-detail-text'>
      {value}
    </div>;
  }
}
export default DetailCell;
