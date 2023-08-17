import React from 'react'

function Card() {
  return (
    <>
        <div className="max-w-[15rem] rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
            <img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-md h-64 dark:bg-gray-500" />
            <div className="flex flex-col justify-between p-6 space-y-8">
                Document info
            </div>
        </div>
    </>
  )
}

export default Card