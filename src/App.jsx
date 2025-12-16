import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-right" />
        </Layout>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
