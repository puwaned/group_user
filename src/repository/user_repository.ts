import axios from "axios";
import UserInterface from "../interface/user";

export default class UserRepository {
  getUsers = async (): Promise<UserInterface[]> => {
    const res = await axios.get("https://dummyjson.com/users");
    return res.data.users;
  };
}
