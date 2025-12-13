import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';
import QuestionManager from '../components/admin/QuestionManager';
import QuizStats from '../components/admin/QuizStats';
import Leaderboard from '../components/admin/Leaderboard';
import ProtectedRoute from '../components/admin/ProtectedRoute';

export default function AdminPage() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="preguntas" replace />} />
        <Route path="preguntas" element={<QuestionManager />} />
        <Route path="estadisticas" element={<QuizStats />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
}