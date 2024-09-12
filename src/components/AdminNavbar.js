// components/AdminNavbar.js
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UseAuth from 'hooks/UseAuth';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setAuth } = UseAuth();  

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('role_id');
    Cookies.remove('role_name');

    setAuth({
      token: null,
      roles: [],
      isAuth: false,
    });

    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/categories" style={styles.link}>Categories</Link>
        </li>
        <li style={styles.li}>
          <Link to="/products" style={styles.link}>Products</Link>
        </li>
        <li style={styles.li}>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: { backgroundColor: "#333", padding: "1rem" },
  ul: { listStyle: "none", margin: 0, padding: 0, display: "flex", justifyContent: "space-around" },
  li: { margin: 0 },
  link: { color: "#fff", textDecoration: "none" },
  button: { color: "#fff", backgroundColor: "#d9534f", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" },
};

export default AdminNavbar;
