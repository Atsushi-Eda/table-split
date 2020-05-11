import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Label} from '@kintone/kintone-ui-component';
import {Connection, App} from '@kintone/kintone-js-sdk';
import SplitTable from "./SplitTable";
const kintoneApp = new App(new Connection);

(PLUGIN_ID => {
  const tableSplitConfigs = JSON.parse(kintone.plugin.app.getConfig(PLUGIN_ID).tables);
  kintone.events.on([
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
  ], event => {
    kintoneApp.getFormFields({
      app: kintone.app.getId()
    }).then(({properties}) => {
      const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
      Object.entries(tableSplitConfigs).forEach(([tableCode, tableSplitConfig]) => {
        const property = properties[tableCode];
        if(!property) return;
        if(!tableSplitConfig.isSplit) return;
        kintone.app.record.setFieldShown(tableCode, false);
        const space = kintone.app.record.getSpaceElement(tableSplitConfig.space);
        if(!space) return;
        const columns = transpose(tableSplitConfig.layout);
        const domRoot = document.createElement('div');
        domRoot.id = 'table-split-plugin-' + tableCode;
        space.appendChild(domRoot);
        ReactDOM.render(
          <div>
            <Label text={property.label} />
            <SplitTable
              mode={event.type === 'app.record.detail.show' ? 'detail' : 'edit'}
              value={event.record[tableCode].value}
              tableCode={tableCode}
              properties={property.fields}
              columns={columns}
            />
          </div>,
          domRoot
        );
      });
    });
  });
})(kintone.$PLUGIN_ID);
