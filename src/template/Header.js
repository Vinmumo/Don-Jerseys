import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from '../user/AuthModal';

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Store the current path as previous path before navigation
    if (location.pathname !== "/") {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }

    // Store previous path in state
    const previousLocation = location.state?.from || "/";
    if (location.pathname !== previousLocation) {
      setPreviousPath(previousLocation);
    }
  }, [location]);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav() {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  function openLoginModal() {
    setIsSignup(false); // Set modal for login
    setShowAuthModal(true);
  }

  function openSignupModal() {
    setIsSignup(true); // Set modal for signup
    setShowAuthModal(true);
  }

  function closeModal() {
    setShowAuthModal(false);
  }

  function handleLogout() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Clear user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if (storedUser && storedUser.id) {
      localStorage.removeItem(`${storedUser.id}_cart`);
    }

    setUser(null);
  }

  // Handle back button click
  function handleBackClick() {
    if (previousPath) {
      navigate(previousPath); // Navigate to the previous path stored in state
    } else {
      navigate("/"); // Fallback to landing page if no previous path is available
    }
  }

  return (
    <>
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={changeNav}>
              <FontAwesomeIcon icon={['fab', 'bootstrap']} className="ms-1" size="lg" />
              <span className="ms-2 h5">Don Jerseys</span>
            </Link>

            <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to="/products" className="nav-link" onClick={changeNav}>
                    Explore
                  </Link>
                </li>
              </ul>

              <div className="d-flex">
                {/* Conditionally render Back Button */}
                {showBackButton && (
                  <button type="button" className="btn btn-outline-secondary me-3" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                    Back
                  </button>
                )}

                {/* Cart Button */}
                <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                  <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                  <span className="ms-3 badge rounded-pill bg-dark">0</span>
                </button>
              </div>

              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    href="!#"
                    className="nav-link dropdown-toggle"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={['fas', 'user-alt']} />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    {user ? (
                      <>
                        <li>
                          <p className="dropdown-item">Welcome, {user.username}</p>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button className="dropdown-item" onClick={openLoginModal}>
                            Login
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={openSignupModal}>
                            Sign Up
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            <div className="d-inline-block d-lg-none">
              <button type="button" className="btn btn-outline-dark">
                <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                <span className="ms-3 badge rounded-pill bg-dark">0</span>
              </button>
              <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={closeModal} isSignup={isSignup} />
    </>
  );
}

export default Header;
