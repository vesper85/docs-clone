import React from 'react'

function Card({title, data}) {
  return (
    <>
        <div className="max-w-[15rem] rounded-sm shadow-md dark:bg-gray-900 dark:text-gray-100">
            <img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-sm h-64 dark:bg-gray-500" />
            <div className="flex flex-col p-4 text-xs">
              <div className="font-semibold">Title of the Document</div> 
              <div className='text-gray-400'>logo and date created</div>
            </div>
        </div>
    </>
  )
}

export default Card