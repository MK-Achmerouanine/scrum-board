import React from 'react'

export const Card = ({ task, onDragStart }) => {
    return (
        <div key={task.name}
            onDragStart={(e) => onDragStart(e, task.name)}
            draggable
            className="draggable"
            style={{
                backgroundColor: task.bgcolor
            }}
        >
            {task.name}
        </div>
    )
}
