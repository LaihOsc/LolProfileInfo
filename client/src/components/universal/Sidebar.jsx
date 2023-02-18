import React from 'react'

import { AccountBox, Assessment, List } from '@mui/icons-material'
import { Divider } from '@mui/material'

export default function Sidebar({handleTabChange}) {
  return (
      <div className='w-1/6 bg-gray-900 text-gray-200 fixed h-screen'>
        <div className='h-1/6 flex justify-center items-center'><img src="https://i.pinimg.com/236x/db/d7/45/dbd74562d9c8e30188bf7c71e901ee85--teemo-chibi.jpg" alt="" /></div>
        <div className='h-4/6 w-full font-semibold text-lg'>
          <Divider className='bg-gray-200' />
          <div className='p-4'>
          <div className=' flex flex-col h-full w-full items-center text-start'>
            
            <button onClick={handleTabChange} value={'profile'} className={`w-full p-2 rounded flex items-center hover:bg-gray-800 hover:text-green-500`}><AccountBox /> &nbsp; Profile </button>
            <button onClick={handleTabChange} value={'mastery'} className={`w-full p-2 rounded flex items-center hover:bg-gray-800 hover:text-green-500`}><Assessment /> &nbsp; Mastery</button>
            <button onClick={handleTabChange} value={'matchHistory'} className={`w-full p-2 rounded flex items-center hover:bg-gray-800 hover:text-green-500`}><List /> &nbsp; Match History</button>
            
          </div>
          </div>
          
        </div>
        <div className='h-1/6 flex justify-center'>
        <Divider className="bg-gray-200" />
          <img className='h-2/3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT54eQCz8rkX77quHiTxppYgI933efvbHxxrWvDJbCx6-Bd2NNy8cOQSj3mgwIwqq_aiYI&usqp=CAU" alt="" />
        </div>
      </div>
  )
}
