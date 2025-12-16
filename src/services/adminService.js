import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const USERS_COLLECTION = "admin_users";
const ACTIVITY_COLLECTION = "admin_activities";

// Obtener todos los usuarios administradores
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

// Obtener usuario por ID
export const getUserById = async (userId) => {
  try {
    if (!userId) throw new Error("ID de usuario requerido");

    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        uid: docSnap.id,
        ...docSnap.data(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Crear nuevo usuario administrador
export const createUser = async (userData) => {
  try {
    // Validar datos básicos
    if (!userData.email) {
      throw new Error("Email requerido");
    }

    if (!userData.role) {
      throw new Error("Rol requerido");
    }

    const userWithMetadata = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: userData.active !== false,
      lastLogin: null,
    };

    const docRef = await addDoc(
      collection(db, USERS_COLLECTION),
      userWithMetadata
    );

    // Registrar actividad
    await logActivity({
      action: "USER_CREATED",
      userId: docRef.id,
      details: `Usuario ${userData.email} creado con rol ${userData.role}`,
      metadata: { email: userData.email, role: userData.role },
    });

    return {
      success: true,
      id: docRef.id,
      ...userWithMetadata,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (userId, userData) => {
  try {
    if (!userId) throw new Error("ID de usuario requerido");

    const docRef = doc(db, USERS_COLLECTION, userId);

    // Verificar que existe
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Usuario no encontrado");
    }

    const updateData = {
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    // Remover campos que no deben actualizarse
    delete updateData.id;
    delete updateData.uid;
    delete updateData.email; // Email no se puede cambiar aquí
    delete updateData.createdAt;

    await updateDoc(docRef, updateData);

    // Registrar actividad
    await logActivity({
      action: "USER_UPDATED",
      userId: userId,
      details: `Usuario ${docSnap.data().email} actualizado`,
      metadata: { updates: Object.keys(userData) },
    });

    return {
      success: true,
      id: userId,
      ...updateData,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (userId) => {
  try {
    if (!userId) throw new Error("ID de usuario requerido");

    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Usuario no encontrado");
    }

    const userEmail = docSnap.data().email;

    await deleteDoc(docRef);

    // Registrar actividad
    await logActivity({
      action: "USER_DELETED",
      userId: userId,
      details: `Usuario ${userEmail} eliminado`,
      metadata: { email: userEmail },
    });

    return { success: true, id: userId, email: userEmail };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Buscar usuarios
export const searchUsers = async (searchTerm) => {
  try {
    const allUsers = await getAdminUsers();

    return allUsers.filter(
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

// Cambiar estado de usuario (activar/desactivar)
export const toggleUserStatus = async (userId, isActive) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Usuario no encontrado");
    }

    await updateDoc(docRef, {
      active: isActive,
      updatedAt: new Date().toISOString(),
    });

    const userEmail = docSnap.data().email;
    const action = isActive ? "USER_ACTIVATED" : "USER_DEACTIVATED";

    // Registrar actividad
    await logActivity({
      action,
      userId: userId,
      details: `Usuario ${userEmail} ${isActive ? "activado" : "desactivado"}`,
      metadata: { email: userEmail, active: isActive },
    });

    return { success: true, id: userId, active: isActive };
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};

// Registrar actividad de administrador
export const logActivity = async (activityData) => {
  try {
    const activityWithMetadata = {
      ...activityData,
      timestamp: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    };

    await addDoc(collection(db, ACTIVITY_COLLECTION), activityWithMetadata);

    return { success: true };
  } catch (error) {
    console.error("Error logging activity:", error);
    // No lanzar error para no afectar la operación principal
  }
};

// Obtener actividades recientes
export const getRecentActivities = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, ACTIVITY_COLLECTION),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.slice(0, limitCount).map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting activities:", error);
    throw error;
  }
};

// Obtener estadísticas de administración
export const getAdminStats = async () => {
  try {
    // Obtener usuarios
    const users = await getAdminUsers();

    // Obtener actividades
    const activities = await getRecentActivities(1000); // Obtener muchas para estadísticas

    // Calcular estadísticas de usuarios
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.active !== false).length;
    const adminUsers = users.filter((u) => u.role === "admin").length;
    const editorUsers = users.filter((u) => u.role === "editor").length;
    const viewerUsers = users.filter((u) => u.role === "viewer").length;

    // Calcular actividades por tipo
    const activityCounts = {};
    activities.forEach((activity) => {
      const action = activity.action;
      activityCounts[action] = (activityCounts[action] || 0) + 1;
    });

    // Calcular actividades por día (últimos 7 días)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const activitiesByDay = {};
    last7Days.forEach((day) => {
      activitiesByDay[day] = activities.filter(
        (a) => a.timestamp && a.timestamp.startsWith(day)
      ).length;
    });

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        byRole: {
          admin: adminUsers,
          editor: editorUsers,
          viewer: viewerUsers,
        },
      },
      activities: {
        total: activities.length,
        byType: activityCounts,
        last7Days: activitiesByDay,
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting admin stats:", error);
    throw error;
  }
};

// Verificar si email ya existe
export const checkEmailExists = async (email) => {
  try {
    const users = await getAdminUsers();
    return users.some((user) => user.email === email);
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};

// Actualizar último login
export const updateLastLogin = async (userId) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(docRef, {
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating last login:", error);
    // No lanzar error para no afectar el login
  }
};
