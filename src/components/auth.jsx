import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(err) {
        console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch(err) {
        console.error(err);
    }
  };
  
  const logout = async () => {
    try {
        await signOut(auth);
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <div>
      <input placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};
