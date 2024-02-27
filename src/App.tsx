import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import UserRepository from "./repository/user_repository";
import UserHelper from "./utils/user";


function App() {
  const userRepository = new UserRepository();
  const { data } = useQuery({
    queryFn: userRepository.getUsers,
    queryKey: ["users"],
  });

  const group = UserHelper.mapUserToUserGroup(data);
  console.log(group);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
