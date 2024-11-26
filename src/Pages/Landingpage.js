import { useNavigate } from 'react-router-dom';
import logo from './excellent-knights-ph.png'; // './' refers to the same directory
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Navigate to login page
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to register page
    };

    return (
        <div className="landing-container">
    <nav className="navbar">
        <div className="navbar-logo">
            <img src={logo} alt="Excellent Knights PH Logo" className="logo-img" /> {/* Logo first */}
            <div className="club-name">Excellent Knights PH</div> {/* Club name after the logo */}
        </div>
        <div className="navbar-links-left">
            <button className="login-btn" onClick={handleLogin}>
                Log In
            </button>
            <button className="register-btn" onClick={handleRegister}>
                Register
            </button>
        </div>
    </nav>
</div>
    );
}

export default LandingPage;
