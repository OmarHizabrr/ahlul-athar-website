'use client';

import { firestoreApi } from "@/lib/FirestoreApi";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface AuthUser {
  uid: string;
  displayName: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  isActive: boolean;
  role: "admin" | "teacher" | "student";
}

interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser) as AuthUser;
        setUser(userData);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);

      const usersRef = firestoreApi.getCollection("users");
      const docs = await firestoreApi.getDocuments(
        usersRef,
        "phoneNumber",
        credentials.phoneNumber.trim(),
        10,
      );

      if (docs.length === 0) {
        throw new Error("رقم الهاتف غير مسجل");
      }

      let userData: Record<string, unknown> | null = null;

      for (const doc of docs) {
        const data = doc.data() as Record<string, unknown>;

        if ((data.password as string | undefined)?.trim()) {
          userData = { id: doc.id, ...data };
          break;
        }
      }

      if (!userData) {
        userData = { id: docs[0].id, ...docs[0].data() };
      }

      const storedPassword = (userData.password as string | undefined)?.trim();
      const inputPassword = credentials.password.trim();

      if (!storedPassword) {
        throw new Error("هذا المستخدم ليس لديه كلمة مرور");
      }

      if (storedPassword !== inputPassword) {
        throw new Error("كلمة المرور غير صحيحة");
      }

      if (!userData.isActive) {
        throw new Error("حسابك غير مفعل");
      }

      const authUser: AuthUser = {
        uid: userData.id as string,
        displayName: (userData.displayName as string) ?? "",
        email: userData.email as string | undefined,
        phoneNumber: userData.phoneNumber as string | undefined,
        photoURL: userData.photoURL as string | undefined,
        isActive: Boolean(userData.isActive),
        role: (userData.role as AuthUser["role"]) ?? "student",
      };

      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);

      const userRef = firestoreApi.getDocument("users", authUser.uid);

      await firestoreApi.updateData(userRef, {
        lastLogin: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

