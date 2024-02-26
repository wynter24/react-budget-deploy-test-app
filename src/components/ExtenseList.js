import React from 'react'
import './ExtenseList.css'
import ExtenseItem from './ExtenseItem'
import { MdDelete } from 'react-icons/md'

const ExtenseList = ({expenses, handleDelet, handleAdit, clearItem}) => {
    return (
      <>
        <ul className='list'>
        {
          expenses.map(expense => {
            return (
              <ExtenseItem 
                expense={expense}
                key={expense.id}
                handleDelet={handleDelet}
                handleAdit={handleAdit}
              />
            )
          })
        }
        </ul>
        {expenses.length > 0 && (
          <button className='btn' onClick={clearItem}>
            목록 지우기
            <MdDelete className='btn-icon'/>
          </button>
        )}
      </>
    )
}

export default ExtenseList