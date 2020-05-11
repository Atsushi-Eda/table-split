import React from 'react';
import {Label, Dropdown} from '@kintone/kintone-ui-component';
import selectItemManager from "./selectItemManager";

const Space = ({value, spaces, onChange}) => {
  return (
    <div>
      <Label text='space' />
      <Dropdown
        items={selectItemManager.createItems(spaces)}
        value={selectItemManager.getValue(spaces, value)}
        onChange={newValue => onChange('space', newValue)}
      />
    </div>
  );
};
export default Space;