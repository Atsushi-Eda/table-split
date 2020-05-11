import React from 'react';
import {Button} from '@kintone/kintone-ui-component';
import Table from './Table';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.formatSavedValue(props.savedValue, props.tables),
    }
  }
  formatSavedValue = (savedValue, tables) => {
    tables.forEach(table => {
      if(!savedValue[table.code]) savedValue[table.code] = {layout: [[]]};
      const fieldsSavedInForm = table.fields.map(field => field.code);
      savedValue[table.code].layout = savedValue[table.code].layout.map(
        row => row.filter(
          field => fieldsSavedInForm.includes(field)
        )
      ).filter((row, index) => (!index || row.length>0));
      const fieldsSavedInPlugin = (savedValue[table.code] && Array.isArray(savedValue[table.code].layout)) ? savedValue[table.code].layout.flat() : [];
      savedValue[table.code].layout[0].push(
        ...table.fields.filter(
          field => !fieldsSavedInPlugin.includes(field.code)
        ).map(field => field.code)
      );
    });
    return savedValue;
  }
  onChange = (tableCode, type, newValue) => {
    const value = {...this.state.value};
    if(!value[tableCode]) value[tableCode] = {};
    value[tableCode][type] = newValue;
    this.setState({value});
  }
  save = () => {
    kintone.plugin.app.setConfig({
      tables: JSON.stringify(this.state.value)
    });
  }
  render() {
    return (
      <div>
        {this.props.tables.map((table) =>
          <Table
            key={table.code}
            value={this.state.value[table.code]}
            table={table.code}
            tableProperty={this.props.tableProperties[table.code]}
            spaces={this.props.spaces}
            onChange={this.onChange}
          />
        )}
        <Button text='save' type='submit' onClick={this.save} />
      </div>
    );
  }
}
