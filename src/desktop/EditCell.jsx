import React from 'react';
import {Text, TextArea, RadioButton, CheckBox, Dropdown, MultipleChoice, DateTime} from "@kintone/kintone-ui-component";
import moment from "moment";

const EditCell = ({property, value = '', onChange}) => {
  const type = property.type;
  if(['NUMBER', 'CALC'].includes(type)){
    return <div className='kuc-input-number'>
      {property.unitPosition === 'BEFORE' ? property.unit : ''}
      <Text
        value={value}
        isDisabled={type === 'CALC'}
        placeholder={!property.hideExpression ? property.expression : ''}
        onChange={onChange}
      />
      {property.unitPosition === 'AFTER' ? property.unit : ''}
    </div>;
  }else if(['MULTI_LINE_TEXT'].includes(type)){
    return <TextArea
      value={value}
      onChange={onChange}
    />;
  }else if(['RADIO_BUTTON', 'CHECK_BOX', 'DROP_DOWN', 'MULTI_SELECT'].includes(type)){
    const items = property.options ? Object.values(property.options).sort(
      (a, b) => (a.index < b.index) ? -1 : 1
    ).map(
      option => ({
        label: option.label,
        value: option.label
      })
    ) : [];
    if(['RADIO_BUTTON'].includes(type)){
      return <RadioButton
        name={new Date().getTime().toString(16) + Math.floor(Math.random()).toString(16)}
        items={items}
        value={value}
        onChange={onChange}
      />;
    }else if(['CHECK_BOX'].includes(type)){
      return <CheckBox
        items={items}
        value={value}
        onChange={onChange}
      />;
    }else if(['DROP_DOWN'].includes(type)){
      return <Dropdown
        items={[{
          label: '-----',
          value: ''
        }, ...items]}
        value={value}
        onChange={onChange}
      />;
    }else if(['MULTI_SELECT'].includes(type)) {
      return <MultipleChoice
        items={items}
        value={value}
        onChange={onChange}
      />;
    }
  }else if(['DATE', 'TIME', 'DROP_DOWN', 'DATETIME'].includes(type)){
    const valueDate = format => (
      moment(value, format).isValid() ? moment(value, format).toDate() : new Date(null)
    );
    if(['DATE'].includes(type)){
      const format = 'YYYY-MM-DD';
      return <DateTime
        type='date'
        dateFormat='YYYY-MM-dd'
        value={valueDate(format)}
        onChange={value => onChange(moment(value).format(format))}
      />;
    }else if(['TIME'].includes(type)){
      const format = 'HH:mm';
      return <DateTime
        type='time'
        value={valueDate(format)}
        onChange={value => onChange(moment(value).format(format))}
      />;
    }else if(['DATETIME'].includes(type)) {
      const format = 'YYYY-MM-DDTHH:mmZ';
      return <DateTime
        type='datetime'
        dateFormat='YYYY-MM-dd'
        value={valueDate(format)}
        onChange={value => onChange(moment(value).format(format))}
      />;
    }
  }else{
    return <Text
      value={value}
      onChange={onChange}
    />;
  }
}
export default EditCell;
