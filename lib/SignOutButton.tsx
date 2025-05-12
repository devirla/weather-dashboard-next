"use client";
import { logout } from "./actions/auth";

const SignOutButton = () => {
  return (
    <button
      className="cursor-pointer border rounded-[25px] px-[3vw] py-[1vh]"
      onClick={() => logout()}
    >
      Log Out
    </button>
  );
};
export default SignOutButton;
