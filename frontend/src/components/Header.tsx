import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/chat" className="-m-1.5 p-1.5">
            WSChat
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ?
            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
              Log out <span aria-hidden="true">&larr;</span>
            </button> :
            <></>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
