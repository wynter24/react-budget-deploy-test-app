import React from 'react'
import './ExtenseItem.css'
import {MdDelete, MdEdit} from 'react-icons/md'

const ExtenseItem = ({expense, handleDelet,handleAdit}) => {
    return (
      <li className='item'>
        <div className='info'>
          <span className='expense'>{expense.charge}</span>
          <span className='amount'>{expense.amount}</span>
        </div>
        <div>
          <button className='edit-btn' 
            onClick={() => {handleAdit(expense.id)}}
          >
            <MdEdit />
          </button>
          <button className='clear-btn' onClick={() => {handleDelet(expense.id)}}>
            <MdDelete/>
          </button>
        </div>
      </li>
    )
}

export default ExtenseItem