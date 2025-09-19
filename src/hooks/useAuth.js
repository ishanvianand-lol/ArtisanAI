import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../web/utils/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
          const data = await response.json();

          if (response.ok) {
            setUser(firebaseUser);
            setRole(data.role || "");
            setError("");
          } else {
            console.error("Backend authentication failed:", data.message);
            setUser(null);
            setError("Authentication failed. Please try again.");
          }
        } catch (err) {
          console.error("Failed to connect to backend:", err);
          setUser(firebaseUser);
          setRole("");
          setError("");
        }
      } else {
        setUser(null);
        setRole("");
        setError("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login successful:", result.user.email);
    } catch (err) {
      console.error("Firebase Sign-in failed:", err);
      if (err?.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else if (err?.code === "auth/popup-blocked") {
        setError("Popup was blocked. Please allow popups and try again.");
      } else if (err?.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (err) {
      console.error("Firebase Sign-out failed:", err);
      setError("Sign-out failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError("");
  };

  const handleContinue = () => {
    if (role) router.push(`/${role}`);
    else setError("Please select a role before continuing.");
  };

  return {
    user,
    role,
    loading,
    error,
    setError,
    handleLogin,
    handleLogout,
    handleRoleSelect,
    handleContinue,
  };
}