import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const Sidebar = ({ isOpen, onLinkClick }) => (
  <aside className={`sidebar-custom sidebar-transition${isOpen ? ' open' : ''}`}>
    <nav className="nav flex-column nav-pills gap-2 p-3">
      <NavLink className="nav-link text-white" to="/" end onClick={onLinkClick}>Dashboard</NavLink>
      <NavLink className="nav-link text-white" to="/products" onClick={onLinkClick}>Products</NavLink>
      <NavLink className="nav-link text-white" to="/categories" onClick={onLinkClick}>Categories</NavLink>
      <NavLink className="nav-link text-white" to="/suppliers" onClick={onLinkClick}>Suppliers</NavLink>
      <NavLink className="nav-link text-white" to="/inventory" onClick={onLinkClick}>Inventory</NavLink>
      <NavLink className="nav-link text-white" to="/orders" onClick={onLinkClick}>Orders</NavLink>
      <NavLink className="nav-link text-white" to="/reports" onClick={onLinkClick}>Reports</NavLink>
      <NavLink className="nav-link text-white" to="/settings" onClick={onLinkClick}>Settings</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
