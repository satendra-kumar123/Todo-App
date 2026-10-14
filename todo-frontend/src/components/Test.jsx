import React, { useState } from 'react'

function Test() {
    const [show , setShow] = useState(false)
    const arr = ["satebdra", "meena", "rockey", "manav"]
    function controlShow() {
        if(!show) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
  return (
    <div className='h-full w-full'>
        
        <h1>welcome to test compontent </h1>
        <button onClick={controlShow} className='bg-amber-300 rounded p-5 m-5 active:bg-amber-700'>click</button>
        {arr.map((item, idx) => (
            <h1 key={idx} className='h-max w-1/4 bg-yellow-500 text-xl font-medium m-4 p-3 rounded text-pink-800'>{item}</h1>
        ))}
    </div>
  )
}

export default Test