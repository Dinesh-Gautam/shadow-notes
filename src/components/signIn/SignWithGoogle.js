import React from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../MainInput/inputs/elements/Button";

function SignWithGoogle() {
  const { login } = useAuth();
  return <Button attr={{ onClick: login }} text="Sign with Google"></Button>;
}

export default SignWithGoogle;
