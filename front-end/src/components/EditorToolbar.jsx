import React from 'react';

const EditorToolbar = (props) => {
    const {saveDocument, docid} = props

    const handleClick = (e) =>{
      console.log(e.target.getAttribute('name'))
    }
  return (
    <div className="bg-gray-100 p-2 shadow-md">
      <div className="flex space-x-2" onClick={handleClick}>
        <button  className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-bold" name="bold" ></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-italic" name="italic"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-underline"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-link"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-list-ul"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-list-ol"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-align-left"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-align-center"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-align-right"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-align-justify"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-image"></i>
        </button>
        <button className="p-2 text-gray-700 hover:text-black">
          <i className="fas fa-code"></i>
        </button>
        <button  className="p-2 text-gray-700 hover:text-black" onClick={()=>{saveDocument(docid)}} >
            <i className="fa-regular fa-floppy-disk"></i>
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;


