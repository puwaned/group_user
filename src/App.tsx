import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import UserRepository from "./repository/user_repository";
import UserInterface, {
  UserGroupInterface,
  UserGroupObjectInterface,
} from "./interface/user";

function App() {
  const userRepository = new UserRepository();
  const { data } = useQuery({
    queryFn: userRepository.getUsers,
    queryKey: ["users"],
  });

  const mapUserToUserGroup = (
    users?: UserInterface[]
  ): UserGroupInterface | undefined => {
    if (!users) return;
    let initial: UserGroupInterface = {};

    for (let user of users) {
      const department = user.company.department;
      const current = initial[department];
      if (user.company.department === "Sales") {
        console.log(user);
      }
      if (current) {
        const next = mergeUserWithUserGroup(current, user);

        initial[department] = next;
        continue;
      }
      initial[department] = getGroupUser(user);
    }
    return initial;
  };

  const mergeUserWithUserGroup = (
    old: UserGroupObjectInterface,
    user: UserInterface
  ): UserGroupObjectInterface => {
    return {
      male: +(user.gender === "male") + old.male,
      female: +(user.gender === "female") + old.female,
      ageRange: getAgeRange(old.ageRange, user.age),
      hair: {
        Black: +(user.hair.color === "Black") + old.hair.Black,
        Blond: +(user.hair.color === "Blond") + old.hair.Blond,
        Chestnut: +(user.hair.color === "Chestnut") + old.hair.Chestnut,
        Brown: +(user.hair.color === "Brown") + old.hair.Brown,
      },
      addressUser: {
        ...old.addressUser,
        [`${user.firstName}${user.lastName}`]: user.address.postalCode,
      },
    };
  };

  const getAgeRange = (currentRange: string, age: number): string => {
    let [min, max] = currentRange.split("-");
    const parseMin = Number(min);
    const parseMax = Number(max);

    if (age < parseMin) {
      return [age, max].join("-");
    }
    if (age > parseMax) {
      return [min, age].join("-");
    }
    return currentRange;
  };

  const getGroupUser = (user: UserInterface): UserGroupObjectInterface => {
    return {
      male: +(user.gender === "male"),
      female: +(user.gender === "female"),
      ageRange: `${user.age}-${user.age}`,
      hair: {
        Black: +(user.hair.color === "Black"),
        Blond: +(user.hair.color === "Blond"),
        Chestnut: +(user.hair.color === "Chestnut"),
        Brown: +(user.hair.color === "Brown"),
      },
      addressUser: {
        [`${user.firstName}${user.lastName}`]: user.address.postalCode,
      },
    };
  };
  const group = mapUserToUserGroup(data);
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
