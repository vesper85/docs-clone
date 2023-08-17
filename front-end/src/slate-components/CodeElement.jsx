// // Define a React component renderer for our code blocks.
// const CodeElement = props => {
//     return (
//       <pre {...props.attributes}>
//         <code>{props.children}</code>
//       </pre>
//     )
//   }

import React from 'react'
  
  function CodeElement(props) {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }
  // Define a React component to render leaves with bold text.
  const Leaf = props => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  }
  
export {CodeElement, DefaultElement, Leaf};

