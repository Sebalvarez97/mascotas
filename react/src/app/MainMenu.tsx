import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../store/sessionStore";
import { ICommonProps } from "../common/components/CommonComponent";
import "./Menu.css";

export default function MainMenu(props: ICommonProps) {
  const logoutApp = async () => {
    await logout();
  }

  return (
    <div>
      <NavLink to="/info" className="menu_item btn btn-sm btn-link">Sesión</NavLink><br />
      <NavLink to="/password" className="menu_item btn btn-sm btn-link">Password</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />

      <h6 className="menu_section">Perfil</h6>
      <NavLink to="/profile" className="menu_item btn btn-sm btn-link">Editar</NavLink><br />

      <h6 className="menu_section">Mascotas</h6>
      <NavLink to="/pets" className="menu_item btn btn-sm btn-link">Lista</NavLink><br />
    </div>
  );
}
