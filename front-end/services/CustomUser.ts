import { User } from "next-auth";

interface CustomUser extends User {
  password: string;
}

export default CustomUser;