import React, { Suspense, lazy } from "react";
import { useAuth } from "./context/AuthContext";

const LazyMain = lazy(() => import("./Main"));
const SignWithGoogle = lazy(() => import("./components/signIn/SignIn"));

function App() {
  const { currentUser } = useAuth();

  return <main>{!currentUser ? <LazySignIn /> : <LazyMain />}</main>;
}

function LazySignIn() {
  return (
    <Suspense fallback={<div></div>}>
      <SignWithGoogle />
    </Suspense>
  );
}

export default App;
