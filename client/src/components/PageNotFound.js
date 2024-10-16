import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      Page Not Found. 
      <Link to="/dashboard">
        <button>Go to Home Page</button>
      </Link>
    </div>
    
  )
}

export default PageNotFound;
