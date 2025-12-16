import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Colecciones de Firebase
const USERS_COLLECTION = "admin_users";

// Autenticación básica
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

// Usuarios administradores
export const createAdminUser = async (email, password, userData) => {
  try {
    // 1. Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2. Actualizar perfil si hay nombre
    if (userData.name) {
      await updateProfile(userCredential.user, { displayName: userData.name });
    }

    // 3. Crear documento en Firestore
    const userDocData = {
      email,
      name: userData.name || "",
      role: userData.role || "editor",
      active: userData.active !== false,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uid: userCredential.user.uid,
    };

    await setDoc(
      doc(db, USERS_COLLECTION, userCredential.user.uid),
      userDocData
    );

    return {
      success: true,
      user: {
        id: userCredential.user.uid,
        ...userDocData,
      },
    };
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
};

export const getCurrentUser = async (userId) => {
  try {
    if (!userId) return null;

    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));

    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        uid: userDoc.id,
        ...userDoc.data(),
      };
    }

    // Si no existe en Firestore, devolver datos básicos
    const firebaseUser = auth.currentUser;
    if (firebaseUser && firebaseUser.uid === userId) {
      return {
        id: userId,
        uid: userId,
        email: firebaseUser.email,
        name: firebaseUser.displayName || "",
        role: "viewer",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const updateData = {
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    // Remover campos que no deben actualizarse directamente
    delete updateData.id;
    delete updateData.uid;
    delete updateData.email; // Email no se puede cambiar así

    await updateDoc(userRef, updateData);

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    // Nota: Esto solo elimina de Firestore, no de Authentication
    await deleteDoc(doc(db, USERS_COLLECTION, userId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getAdminUsers = async () => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      uid: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting admin users:", error);
    throw error;
  }
};

export const searchUsers = async (searchTerm) => {
  try {
    const users = await getAdminUsers();

    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const toggleUserStatus = async (userId, isActive) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      active: isActive,
      updatedAt: new Date().toISOString(),
    });

    return { success: true, active: isActive };
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};

// Verificar permisos
export const hasPermission = async (userId, requiredRole = "editor") => {
  try {
    const user = await getCurrentUser(userId);
    if (!user) return false;

    const roleHierarchy = {
      viewer: 0,
      editor: 1,
      admin: 2,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  } catch (error) {
    console.error("Error checking permission:", error);
    return false;
  }
};

// Obtener estadísticas de usuarios
export const getUserStats = async () => {
  try {
    const users = await getAdminUsers();

    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const editors = users.filter((u) => u.role === "editor").length;
    const viewers = users.filter((u) => u.role === "viewer").length;
    const active = users.filter((u) => u.active !== false).length;

    return {
      total,
      admins,
      editors,
      viewers,
      active,
      inactive: total - active,
    };
  } catch (error) {
    console.error("Error getting user stats:", error);
    throw error;
  }
};

// Cambiar contraseña (en Authentication)
export const changePassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No hay usuario autenticado");

    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
