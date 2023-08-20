import React,{useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import userContext from '../context/User/userContext';

function Navigation() {
    const context = useContext(userContext);

    const {isLoggedIn,uid,setIsLoggedIn} = context;

    const handleLogout = (e) =>{
        e.preventDefault();
        localStorage.removeItem('docs_store_token')
        setIsLoggedIn(false);
    }
    
  return (
    <div>
        <header className="bg-white">
        <nav className=" flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
            <div className="flex basis-1/4">
            <Link to={"/"} className="-m-1.5 p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </Link>
            </div>
            <div className="flex basis-2/4 gap-x-12">
                <div className='max-w-[720px] w-[100%] mx-auto '>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#f1f3f4]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                        className="peer h-full w-full outline-none text-sm text-gray-800 pr-2 bg-[#f1f3f4]"
                        type="text"
                        id="search"
                        placeholder="Search something.." /> 
                    </div>
                </div>
            </div>
            <div className="flex basis-1/4 justify-end">
            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a> */}
           
            {isLoggedIn ? 
            
            (<button
                className={`px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg  `}>
                <Link onClick={handleLogout} >Log out</Link>
            </button>): 
            (<>
                <button
                    className={`px-3 mx-4 py-1.5 text-sm text-gray-700 duration-100 border rounded-lg hover:border-indigo-600 active:shadow-lg `}>
                    <Link to={"/login"} >Log in</Link>
                </button>
                <button
                    className={`px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg  `}>
                    <Link to={"/signup"} >Sign in</Link>
                </button>
            </>)}
            
            {/* <div className={`${isLoggedin ? 'block' : 'hidden'}`}>
                Welcome {uid ? uid : "nouser"} 
            </div> */}
            </div>
        </nav>
        </header>
    </div>
  )
}

export default Navigation