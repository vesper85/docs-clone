import React from 'react'
import Card from './Card'
// import Sandbox from './Sandbox';

function DocumentCollection() {
    const arr = [1,2,3,4,5,6,7,8,9,10];
  return (
    <section className="max-w-6xl mx-auto">
        <div className="m-4 grid grid-cols-5 gap-4">
            {
                arr.map((ele)=>{
                    return(
                        <Card/>
                    )
                })
            }
        </div>
    
    </section>

  )
}

export default DocumentCollection