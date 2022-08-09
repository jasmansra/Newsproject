import React, { Component } from 'react'
import spinner from '../loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img style={{height:"200px", width:"200px;"}} src={spinner} alt="" />
      </div>
    )
  }
}
