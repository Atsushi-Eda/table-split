import React from 'react';
import {Table, Label} from '@kintone/kintone-ui-component';
import CellChunk from './CellChunk';
import moment from "moment";

export default class SplitTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: this.kintoneToKuc(props.value)};
    if(props.mode === 'edit') props.kintoneEventListener(this.handlerForCalc);
  }
  defaultRowData = Object.fromEntries(Object.entries(this.props.properties).map(
    ([fieldCode, property]) => [
      fieldCode,
      property.defaultNowValue ?
        property.type === 'DATE' ?
          moment().format('YYYY-MM-DD') :
          property.type === 'TIME' ?
            moment().format('HH:mm') : moment().format() :
        property.defaultValue
    ]
  ))
  kucToKintone = data => (
    data.map(
      row => ({
      value: Object.fromEntries(Object.entries(row).map(
          ([fieldCode, value]) => [fieldCode, {type: this.props.properties[fieldCode].type, value: value}]
        ))
      })
    )
  )
  kintoneToKuc = value => (
    value.map(
      row => (
        Object.fromEntries(Object.entries(row.value).map(
          ([fieldCode, field]) => [fieldCode, field.value]
        ))
      )
    )
  )
  handlerForCalc = () => {
    setTimeout(() => {
      const dataOfKintone = this.kintoneToKuc(kintone.app.record.get().record[this.props.tableCode].value);
      this.setState({data: dataOfKintone});
    }, 1000);
  }
  handleRowChange = ({data}) => {
    this.setState({data});
    const event = kintone.app.record.get();
    event.record[this.props.tableCode].value = this.kucToKintone(data);
    kintone.app.record.set(event);
  }
  handleCellChange = ({data, rowIndex, fieldName}) => {
    this.setState({data});
    const newValue = data[rowIndex][fieldName];
    const event = kintone.app.record.get();
    event.record[this.props.tableCode].value[rowIndex].value[fieldName].value = newValue;
    kintone.app.record.set(event);
  }
  render() {
    return (
      <Table
        columns={this.props.columns.map(column => ({
          header: <>{column.map((fieldCode, i) => <Label
            key={i}
            text={fieldCode ? this.props.properties[fieldCode].label : '-----'}
            textColor='#fff'
            isRequired={this.props.mode === 'edit' && fieldCode && this.props.properties[fieldCode].required}
          />)}</>,
          cell: ({rowIndex, onCellChange}) =>
            <CellChunk
              mode={this.props.mode}
              properties={this.props.properties}
              column={column}
              rowData={this.state.data[rowIndex]}
              onChange={(newValue, field) => onCellChange(newValue, this.state.data, rowIndex, field)}
            />
        }))}
        data={this.state.data}
        defaultRowData={this.defaultRowData}
        onRowAdd={this.handleRowChange}
        onRowRemove={this.handleRowChange}
        onCellChange={this.handleCellChange}
        actionButtonsShown={this.props.mode === 'edit'}
      />
    );
  }
}
