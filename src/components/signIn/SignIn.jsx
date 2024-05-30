import React from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../MainInput/inputs/elements/Button";
import UseSvg from "../elements/UseSvg";

function SignWithGoogle() {
  const { login, anonymousLogin, currentUser } = useAuth();
  return (
    <div className="sign-in-container">
      {!currentUser && (
        <button onClick={() => anonymousLogin()}>Sign In as Guest</button>
      )}
      <span>or</span>
      <Button
        attr={{ onClick: login }}
        text={
          <>
            <span>Sign In with </span>
            <UseSvg type="google" />
          </>
        }
      />
    </div>
  );
}

export default SignWithGoogle;
