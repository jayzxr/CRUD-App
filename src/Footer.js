import React from 'react'
import './App.css'

function Footer() {

  const Position = {
    fontFamily: 'Courier New, monospace',
    fontWeight: 'bold',
    color: '#66fcf1',
    backgroundColor:'#0b0c10',
    paddingTop:'5em',
    paddingLeft:'0.7em',
    animation: 'transitionIn 3s',
    overflowX:'hidden'
  }

  return (
    <div>
      <div className='Position' style={Position}>&copy;2022CRUDdemo</div>
    </div>
  )
}

export default Footer