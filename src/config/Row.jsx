import React from 'react';
import {Droppable} from "react-beautiful-dnd";
import Field from "./Field";

const Row = ({rowIndex, items}) => {
  return (
    <Droppable droppableId={`row-${rowIndex}`} direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='table-split-row'
        >
          {items.map((item, index) => (
            <Field
              key={item.id}
              item={item}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default Row;