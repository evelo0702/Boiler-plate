import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  const logout = () => {
    axios.get("http://localhost:5000/api/users/logout").then((res) => {
      console.log(res.data);
      if (res.data.success) {
        navigate("/");
      } else {
        alert("로그아웃에 실패하셨습니다");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
