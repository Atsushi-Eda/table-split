import React from 'react';
import {Label, RadioButton} from '@kintone/kintone-ui-component';

const IsSplit = ({value = false, table, onChange}) => {
  return (
    <div>
      <Label text='is split' />
      <RadioButton
        name={table+'-isSplit'}
        items={[{
          label: 'true', value: true
        }, {
          label: 'false', value: false
        }]}
        value={value}
        onChange={newValue => onChange('isSplit', newValue || false)}
      />
    </div>
  );
};
export default IsSplit;