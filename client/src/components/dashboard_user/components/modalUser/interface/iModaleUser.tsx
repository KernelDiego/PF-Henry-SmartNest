import { userInterface } from "../../../../../Redux/slice/user/user.slice";

export interface Form {
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
}

export interface HookProps {
  userByBd: userInterface;
  close: Function;
}