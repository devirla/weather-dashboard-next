"use client";

import { login } from "./actions/auth";

const SignInButton = () => {
  return (
    <button
      className="text-white bg-brand cursor-pointer  rounded-[25px] px-[3vw] py-[1vh] "
      onClick={() => login()}
    >
      Log In
    </button>
  );
};
export default SignInButton;
