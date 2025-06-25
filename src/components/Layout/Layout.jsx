// import React from 'react';
// import Navbar from '../Navbar/Navbar';
// import Sidebar from '../Sidebar/Sidebar';
// import { Outlet } from 'react-router-dom';
// import '../../App.css';

// const Layout = () => {
//   return (
//     <div className="min-vh-100 bg-light">
//       <Navbar />
//       <Sidebar isOpen={true} />
//       <div className="container-fluid main-content-custom main-content-custom-lg">
//         <div className="row">
//           <div className="col-12 py-4">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout; 

import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import '../../App.css';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onLinkClick={handleCloseSidebar} />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="sidebar-overlay d-lg-none" onClick={handleCloseSidebar}></div>}
      
      {/* Always shift layout to right on large screens */}
      <div className={`main-content-custom ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 py-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
