import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export function SignUp() {
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      console.error("パスワードが一致しません");
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          birthday,
          password,
          password_confirmation,
        }),
      });

      alert("アカウントが作成されました");
      navigate("/Login");
    } catch (error) {
      setError("アカウントを作成できませんでした...");
    }
  };

  return (
    <div className="login_container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <h1>
            <PersonIcon />
          </h1>
          <input
            placeholder="Name"
            type="text"
            onChange={handleUserNameChange}
          />
        </div>

        <div className="input">
          <h1>
            <CalendarMonthIcon />
          </h1>
          <input
            placeholder="Birth day"
            type="date"
            onChange={handleBirthdayChange}
          />
        </div>

        <div className="input">
          <h1>
            <EmailIcon />
          </h1>
          <input placeholder="Email Address" type="email" />
        </div>

        <div className="input">
          <h1>
            <PasswordIcon />
          </h1>
          <input
            placeholder="Password"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>

        <div className="input">
          <h1>
            <PasswordIcon />
          </h1>
          <input
            placeholder="Check Password"
            type="password"
            onChange={handlePasswordConfirmationChange}
          />
        </div>
      </div>

      <div className="signlogin_button">
        <button className="signup" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
