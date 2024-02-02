import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
// import { Backdrop } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

const Signup = () => {
  const [show, SetShow] = useState(false);
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  // const [confirmpassword, SetConfirmPassword] =  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");
  const [loading, setLoading] = useState(false);

  useState();
  const [password, SetPassword] = useState();

  const navigate = useNavigate();
  const handleClick = () => {
    SetShow(!show);
  };
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("form is subbmitting");
    axios
      .post("https://fullstack-chat-app-y7gz.onrender.com/signup", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setSignInStatus({ msg: "success", key: Math.random() });
        navigate("/chatApp/welcome");
        localStorage.setItem("userInfo", JSON.stringify(res?.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={(e) => {
            SetName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="Password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
     
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
      {signInStatus ? (
        <Toaster key={signInStatus?.key} message={signInStatus?.msg} />
      ) : null}
    </VStack>
  );
};

export default Signup;
