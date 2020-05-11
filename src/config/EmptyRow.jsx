import React from 'react';
import {Droppable} from "react-beautiful-dnd";

const EmptyRow = ({rowIndex}) => {
  return (
    <Droppable droppableId={`emptyRow-${rowIndex}`} direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='table-split-row'
        >
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default EmptyRow;