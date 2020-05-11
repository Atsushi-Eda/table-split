import React from 'react';
import {Draggable} from "react-beautiful-dnd";

const Field = ({item, index}) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='table-split-field'
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};
export default Field;