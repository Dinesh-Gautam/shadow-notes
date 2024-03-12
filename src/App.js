import React, { Suspense, lazy } from "react";
import { useAuth } from "./context/AuthContext";

const LazyMain = lazy(() => import("./Main"));

function App() {
  const { currentUser } = useAuth();

  return <main>{!currentUser ? <LazySignIn /> : <LazyMain />}</main>;
}
function LazySignIn() {
  const SignWithGoogle = lazy(() =>
    import("./components/signIn/SignWithGoogle")
  );
  return (
    <Suspense fallback={<div></div>}>
      <SignWithGoogle />
    </Suspense>
  );
}

export default App;
