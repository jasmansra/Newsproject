
import spinner from '../loading.gif'


import React from 'react'

export default function Spinner() {
  return (
    <div className='text-center'>
        <img style={{height:"200px", width:"200px"}} src={spinner} alt="" />
      </div>
  )
}
