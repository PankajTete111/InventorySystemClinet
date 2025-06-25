// import React from 'react';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
//       <span className="navbar-brand fw-bold fs-4 mb-0">Inventory System</span>
//       {user && (
//         <button className="btn btn-outline-light ms-auto" onClick={logout}>
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// };

// export default Navbar; 

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <div className="d-flex align-items-center">
        {/* Toggle button for small screens */}
        <button
          className="btn btn-light border me-2 d-lg-none"
          onClick={onToggleSidebar}
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <span className="navbar-brand fw-bold fs-4 mb-0">Inventory System</span>
      </div>
      {user && (
        <button className="btn btn-outline-light ms-auto" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
