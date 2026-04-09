import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = (email, password) => supabase.auth.signUp({ email, password });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  // function readUsers() {
  //   try {
  //     const raw = localStorage.getItem("users");
  //     const parsed = raw ? JSON.parse(raw) : [];
  //     return Array.isArray(parsed) ? parsed : [];
  //   } catch {
  //     return [];
  //   }
  // }

  // function signUp(email, password) {
  //   const users = readUsers();

  //   if (users.find((u) => u.email === email)) {
  //     return { success: false, error: "Email already exists" };
  //   }
  //   const newUser = { email, password };
  //   users.push(newUser);
  //   localStorage.setItem("users", JSON.stringify(users));
  //   localStorage.setItem("currentUserEmail", email);
  //   setUser({ email });

  //   return { success: true };
  // }

  // function login(email, password) {
  //   const users = readUsers();
  //   const user = users.find(
  //     (u) => u.email === email && u.password === password
  //   );

  //   if (!user) {
  //     return { success: false, error: "Invalid email or password" };
  //   }

  //   localStorage.setItem("currentUserEmail", email);
  //   setUser({ email });

  //   return { success: true };
  // }

  // function logout() {
  //   localStorage.removeItem("currentUserEmail");
  //   setUser(null);
  // }

  return (
    <AuthContext.Provider value={{ signUp, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
