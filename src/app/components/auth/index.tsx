import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Message } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { Link } from "react-router-dom";

const ModalImg = styled.img`
  width: 60%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  background: linear-gradient(135deg, #1a1a1a, #333);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  &:hover {
    transform: scale(1.05) rotate(1deg);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  }
  margin-top: 10px;
  margin-left: 10px;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
    borderRadius: "25px",
    border: "none",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    padding: theme.spacing(4),
    animation: `$fadeIn 0.5s ease forwards`,
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

// TextFieldlar uchun premium style
const StyledTextField = styled(TextField)`
  && {
    margin: 12px 0;
    width: 320px;
    border-radius: 12px;
    & label.Mui-focused {
      color: #6a0dad;
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: #bbb;
        transition: all 0.3s ease;
      }
      &.Mui-focused fieldset {
        border-color: #6a0dad;
        box-shadow: 0 0 12px rgba(106, 13, 173, 0.4);
      }
      &:hover fieldset {
        border-color: #8a2be2;
      }
    }
  }
`;

// Fab button uchun premium gradient va hover animatsiya
const GradientFab = styled(Fab)`
  && {
    margin-top: 30px;
    width: 140px;
    font-weight: bold;
    background: linear-gradient(45deg, #6a0dad, #8a2be2);
    color: #fff;
    text-transform: none;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-3px) scale(1.05);
      background: linear-gradient(45deg, #8a2be2, #6a0dad);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
    }
  }
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/

  const handleUserName = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };
  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSingupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSingupRequest = async () => {
    try {
      console.log("inputs:", memberNick, memberPassword, memberPhone);
      const isFullFil =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFullFil) throw new Error(Message.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFullFil = memberNick !== "" && memberPassword !== "";
      if (!isFullFil) throw new Error(Message.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <ModalImg src={"/img/user/auth.jpg"} alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUserName}
              />
              <TextField
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{
                  marginTop: "30px",
                  width: "120px",
                  background: "#ff9200",
                }}
                variant="extended"
                onClick={handleSingupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px" }}
          >
            <ModalImg src={"/img/user/auth.jpg"} alt="camera" />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUserName}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
