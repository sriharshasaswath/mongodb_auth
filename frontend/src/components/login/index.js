import "./index.css";

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <form action="http://localhost:4000/login" method="post">
          <div className="email">
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div className="email">
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
