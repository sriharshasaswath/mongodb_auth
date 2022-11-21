import { useNavigate } from "react-router-dom";
import "./index.css";

function Home() {
  const navigate = useNavigate();

  const navigateTologin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to our website!</h1>
        <div>
          <button className="btn" onClick={navigateToRegister}>
            Register 😊
          </button>
          <button className="btn" onClick={navigateTologin}>
            Login 😊
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
