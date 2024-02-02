import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
// import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

const Login = () => {
  const [show, SetShow] = useState(false);
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    SetShow(!show);
  };
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("form is subbmitting");
    axios
      .post("http://localhost:8080/signin", { email, password })
      .then((res) => {
        console.log(res);
        setLogInStatus({ msg: "Success", key: Math.random() });
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(res?.data));
        navigate("/chatApp/welcome");
        console.log("login successful");
      })
      .catch((error) => {
        setLogInStatus({
          msg: "Invalid email or Password",
          key: Math.random(),
        });
      });
    setLoading(false);
  };

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="Email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="Password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "Password"}
              placeholder="Enter your Password"
              value={password}
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
          Login
        </Button>
        {logInStatus && (
          <Toaster key={logInStatus?.key} message={logInStatus?.msg} />
        )}
      </VStack>
    </>
  );
};

export default Login;
