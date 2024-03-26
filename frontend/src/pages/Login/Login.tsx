import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.userId);
        alert("ログイン成功！");
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.detail || "ログインに失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setError("ログインに失敗しました。");
    }
  };

  return (
    <div className="login_container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <h1>
              <EmailIcon />
            </h1>
            <input
              placeholder="Email Address"
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="input">
            <h1>
              <PasswordIcon />
            </h1>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="login_button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
