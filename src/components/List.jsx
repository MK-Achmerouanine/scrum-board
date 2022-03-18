import React from 'react'

const List = ({ index, person }) => {
    return (
        <>
            <span className="number">${index + 1}</span>
            <div className="draggable" draggable="true">
                <p className="person-name">${person}</p>
                <i className="fas fa-grip-lines"></i>
            </div>
        </>
    )
}

export default List