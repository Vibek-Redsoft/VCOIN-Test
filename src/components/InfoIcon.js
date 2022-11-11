import React from 'react'

function InfoIcon(props) {
  const {text, color} = props
  
  return (
    <div className="info-icon" data-text={text}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={color === 'white' ? "1" : "0.5"} fillRule="evenodd" clipRule="evenodd" d="M6 0C9.3115 0 12 2.6885 12 6C12 9.3115 9.3115 12 6 12C2.6885 12 0 9.3115 0 6C0 2.6885 2.6885 0 6 0ZM6 0.5C9.0355 0.5 11.5 2.9645 11.5 6C11.5 9.0355 9.0355 11.5 6 11.5C2.9645 11.5 0.5 9.0355 0.5 6C0.5 2.9645 2.9645 0.5 6 0.5ZM6.25 9H5.75V4.5H6.25V9ZM6 3C6.233 3 6.4225 3.189 6.4225 3.4225C6.4225 3.6555 6.233 3.8445 6 3.8445C5.767 3.8445 5.5775 3.6555 5.5775 3.4225C5.5775 3.189 5.767 3 6 3Z" fill={color === 'white' ? '#ffffff' : color }/>
      </svg>
    </div>
  )
}

export default InfoIcon
