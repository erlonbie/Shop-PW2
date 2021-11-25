import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/slicer/userSlicer";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="float-start">
          <Link className="navbar-brand" to="/">
            Minha Loja
          </Link>
        </div>
        <div className="float-end">
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/sobre">
                  Sobre
                </Link>
              </li>
              {!user.logado && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {user.logado && (
                <li className="nav-item">
                  <a
                    onClick={handleLogout}
                    className="nav-link active"
                    href="#"
                  >
                    Logout [{user.nome}]
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
