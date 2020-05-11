import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Root from './Root';
import {Connection, App} from '@kintone/kintone-js-sdk';
const kintoneApp = new App(new Connection);

(PLUGIN_ID => {
  Promise.all([
    kintoneApp.getFormFields({
      app: kintone.app.getId(),
      isPreview: true
    }),
    kintoneApp.getFormLayout({
      app: kintone.app.getId(),
      isPreview: true
    }),
  ]).then(([{properties}, {layout}]) => {
    render(
      <Root
        savedValue={JSON.parse(kintone.plugin.app.getConfig(PLUGIN_ID).tables || '{}')}
        tables={layout.filter(row => row.type === 'SUBTABLE')}
        tableProperties={Object.fromEntries(Object.entries(properties).filter(([_, property]) => property.type === 'SUBTABLE'))}
        spaces={layout.map(row => row.fields).flat().filter(field => (field && field.type === 'SPACER')).map(field => field.elementId)}
      />,
      document.getElementById('plugin-config-root')
    );
  });
})(kintone.$PLUGIN_ID);