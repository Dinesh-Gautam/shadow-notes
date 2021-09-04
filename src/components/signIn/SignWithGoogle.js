import React from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../MainInput/inputs/elements/Button";

function SignWithGoogle() {
  const { login } = useAuth();
  return (
    <div className="sign-in-container">
      <Button attr={{ onClick: login }} text="Sign In with Google"></Button>
    </div>
  );
}

export default SignWithGoogle;
