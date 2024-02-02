import React from "react"
import './App.css';
import{Routes,Route}from'react-router-dom'
import MainContainer from "./Components/mainContainer";
import Home from './Pages/home'
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/chatArea";
import CreateGroups from "./Components/createGroups";
import Users from './Components/Users';
import Groups from './Components/Groups';




const App = () => {
 
  return (
    <div className="App" >
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chatApp' element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="chat/:_id" element={ <ChatArea/>} />
          <Route path="users" element={ <Users/>} />
          <Route path="groups" element={ <Groups/>} />
          <Route path="createGroups" element={ <CreateGroups/>} />
          
        </Route >
      </Routes>
    </div>
  );
}

export default App;
