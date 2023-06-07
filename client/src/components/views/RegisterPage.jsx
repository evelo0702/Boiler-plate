import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/user_action";
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState(0);

  const onSubmitHandler = (e) => {
    // 이벤트가 실행되지않는다면 새로고침이 안됨
    e.preventDefault();
    if (password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 동일한 값을 입력해야 합니다");
    }
    let body = {
      email: email,
      name: name,
      password: password,
      conFirmPassword: ConfirmPassword,
    };
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        navigate("/landingPage");
      } else {
        alert("회원가입에 실패했습니다");
      }
    });
  };
  return (
    <div>
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
          <label>Name</label>
          <input
            className="Password"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
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

          <label>Confirm Password</label>
          <input
            className="Password"
            type="password"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <button> 회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
