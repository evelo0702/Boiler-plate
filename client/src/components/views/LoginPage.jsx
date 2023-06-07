import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/user_action";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);

  const onSubmitHandler = (e) => {
    // 이벤트가 실행되지않는다면 새로고침이 안됨
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        navigate("/landingPage");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div
      className="LoginPage"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          className="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button> Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
