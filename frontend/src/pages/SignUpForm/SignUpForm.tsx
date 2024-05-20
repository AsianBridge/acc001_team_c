import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../../api/api";
import { postACProps } from "../../types";
import { useAuthState, useUserState } from "../../store/stateManager";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [birthdayDay, setBirthdayDay] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayYear, setBirthdayYear] = useState("");
  const [residence, setResidence] = useState("");
  const { authState } = useAuthState();
  const { setUserID } = useUserState();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (authState && authState.signInDetails?.loginId && authState.userId) {
        const postACProps: postACProps = {
          birthday_day: birthdayDay,
          birthday_month: birthdayMonth,
          birthday_year: birthdayYear,
          mail_address: authState.signInDetails.loginId,
          password: authState.username,
          residence: residence,
          userId: authState.userId,
        };
        await api.postACByUserAC(postACProps);
        setUserID(authState.userId);
        navigate("/");
      }
    } catch (error) {
      console.error(`Error signing up:` + error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h6">Sign Up</Typography>
      <TextField
        label="Birthday Day"
        value={birthdayDay}
        onChange={(e) => {
          setBirthdayDay(e.target.value);
        }}
        margin="normal"
        required
      />
      <TextField
        label="Birthday Month"
        value={birthdayMonth}
        onChange={(e) => {
          setBirthdayMonth(e.target.value);
        }}
        margin="normal"
        required
      />
      <TextField
        label="Birthday Year"
        value={birthdayYear}
        onChange={(e) => {
          setBirthdayYear(e.target.value);
        }}
        margin="normal"
        required
      />
      <TextField
        label="Residence"
        value={residence}
        onChange={(e) => {
          setResidence(e.target.value);
        }}
        margin="normal"
        required
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
