import React from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import "./home.css";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

const Home = () => {
  return (
    <div className="home-style ">
      <Container maxW="xl" centerContent>
        <Box
          sx={{
            d: "flex",
            justifyContent: "center",
            padding: "3",
            bg: "white",
            w: "100%",
            m: "40px 0 15px 0",
            borderWidth: "1px",
          }}
        >
          <Text id="text-style" fontSize="32px" color="black">
            Chit-Chat
          </Text>
        </Box>
        <Box
          sx={{
            bg: "white",
            w: "100%",
            p: "4",
            borderWidth: "1px",
          }}
        >
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">SignUp</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
