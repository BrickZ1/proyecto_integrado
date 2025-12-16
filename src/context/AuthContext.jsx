import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setError(null);

      try {
        if (firebaseUser) {
          const userData = await getCurrentUser(firebaseUser.uid);
          if (userData) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userData,
            });
          } else {
            // Usuario no tiene perfil en Firestore pero está autenticado
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || "",
              role: "viewer",
            });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error en AuthStateChanged:", err);
        setError("Error al cargar la información del usuario");
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = await getCurrentUser(userCredential.user.uid);

      const userWithData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userData,
      };

      setUser(userWithData);
      return { success: true, user: userWithData };
    } catch (err) {
      let errorMessage = "Error al iniciar sesión";

      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Email o contraseña incorrectos";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos. Intenta más tarde";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada";
          break;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (err) {
      setError("Error al cerrar sesión");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      const userData = await getCurrentUser(userCredential.user.uid);
      const userWithData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userData,
      };

      setUser(userWithData);
      return { success: true, user: userWithData };
    } catch (err) {
      let errorMessage = "Error al registrar usuario";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este email ya está registrado";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es muy débil";
          break;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const registerAdmin = async (email, password, userData) => {
    setLoading(true);
    setError(null);

    try {
      // Primero crear el usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Actualizar perfil si hay nombre
      if (userData.name) {
        await updateProfile(userCredential.user, {
          displayName: userData.name,
        });
      }

      // Luego crear el documento en Firestore
      const { createAdminUser } = await import("../services/authService");
      await createAdminUser(email, password, {
        ...userData,
        uid: userCredential.user.uid,
      });

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userData,
        },
      };
    } catch (err) {
      let errorMessage = "Error al crear usuario administrador";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este email ya está registrado";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es muy débil";
          break;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.role === "admin";
  const isEditor = user?.role === "editor" || user?.role === "admin";

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    registerAdmin,
    isAdmin,
    isEditor,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
