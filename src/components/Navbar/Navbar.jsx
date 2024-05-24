import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../../features/authSlice";
import { toast } from "react-toastify";
import './Navbar.css';
import { useState } from "react";



const Navbar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [menu, setMenu] = useState("shop");

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>ND Shop</h2>
      </Link>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("iphone") }}><Link style={{ textDecoration: 'none' }} to='/iphone'>iPhone</Link>{menu === "iphone" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("samsung") }}><Link style={{ textDecoration: 'none' }} to='/samsung'>Samsung</Link>{menu === "samsung" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("realme") }}><Link style={{ textDecoration: 'none' }} to='/realme'>Realme</Link>{menu === "realme" ? <hr /> : <></>}</li>
      </ul>
      {auth._id ? (
        <Links className="nav-login-cart">
          {auth.isAdmin ? (
            <div>
              <Link to="/admin/summary">
                <button>Admin</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/profile">
                <button>profile</button>
              </Link>
            </div>
          )}
          <div
            onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("Logged out!", { position: "bottom-left" });
            }}
          >
          <Link to="/">
            <button>Logout</button>
          </Link>
          </div>
          <Link to="/cart">
          <div className="nav-bag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-handbag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
            </svg>
            <span className="bag-quantity">
              <span>{cartTotalQuantity}</span>
            </span>
          </div>
          </Link>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </AuthLinks>
      )}
    </nav>
  );
}

export default Navbar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;

