import React from 'react';
import {Label} from '@kintone/kintone-ui-component';
import {DragDropContext} from 'react-beautiful-dnd';
import Row from "./Row";
import EmptyRow from "./EmptyRow";

const Rows = ({value, tableProperty, onChange}) => {
  const itemsChunks = value.map(row => row.map(field => ({id: field, content: tableProperty.fields[field].label})));
  const onDragEnd = ({draggableId, source, destination}) => {
    const newValue = value.map(row => [...row]);
    const sourceRowIndex = source.droppableId.replace(/[^0-9]/g, '');
    const destinationRowIndex = destination.droppableId.replace(/[^0-9]/g, '');
    newValue[sourceRowIndex].splice(source.index, 1);
    if(destination.droppableId.includes('emptyRow')){
      newValue.splice(destinationRowIndex, 0 , [draggableId]);
    }else{
      newValue[destinationRowIndex].splice(destination.index, 0, draggableId);
    }
    if(!newValue[sourceRowIndex].length) newValue.splice(sourceRowIndex, 1);
    onChange('rows', newValue);
  }
  return (
    <div>
      <Label text='rows' />
      <DragDropContext onDragEnd={onDragEnd}>
        {itemsChunks.map((items, rowIndex) =>
          <React.Fragment key={rowIndex}>
            <EmptyRow rowIndex={rowIndex} />
            <Row
              rowIndex={rowIndex}
              items={items}
            />
          </React.Fragment>
        )}
        <EmptyRow rowIndex={value.length} />
      </DragDropContext>
    </div>
  );
}
export default Rows;