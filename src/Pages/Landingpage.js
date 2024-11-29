import { useNavigate } from 'react-router-dom';
import logo from './assessment/Club.png'; // './' refers to the same directory
import mingnillaLogo from './assessment/Minglanilla.png'; // Add Mingnilla logo
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
                    <img src={logo} alt="Excellent Knights PH Logo" className="logo-img" />
                    <div className="club-name">Excellent Knights PH</div>
                </div>
            </nav>

            <div className="landing-content">
                <div className="welcome-text">
                    <img
                        src={mingnillaLogo}
                        alt="Minglanilla Logo"
                        className="minglanilla-logo"
                    />
                    <h1>Welcome to Excellent Knights PH</h1>
                    <p>Join our community of motorcycle enthusiasts, stay updated with events, and connect with other riders who share your passion.</p>
                    <div className="cta-buttons">
                        <button onClick={handleRegister}>Join Now</button>
                        <button onClick={handleLogin}>Already a Member? Log In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
