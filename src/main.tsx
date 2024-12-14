import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './auth/Login.tsx'
import Signup from './auth/Signup.tsx'
import UnathenticatedLayout from './layouts/UnauthenticatedLayout.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import DashboardLayout from './layouts/DashboardLayout.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import ProfileRoute from './routes/Profile.tsx'
import AuthWithOTP from './auth/AuthWithOTP.tsx'
import ClassesRoute from './routes/ClassesRoute.tsx'
import FeedBackRoute from './routes/Feedback/FeedbackRoute.tsx'
import SurveyRoute from './routes/Feedback/SurveyRoute.tsx'
import FeedbackIndexRoute from './routes/Feedback/Index.tsx'
import UserSurveyListRoute from './routes/Feedback/UserSurveyListRoute.tsx'
import BugReportRoute from './routes/Feedback/BugReportRoute.tsx'
import IndividualClassRoute from './routes/IndividualClassRoute.tsx'

const router = createBrowserRouter([
  {
    path: "/", element: <UnathenticatedLayout />,
    children: [
      {
        path: "/", element: <App />,
      },
      {
        path: "/login", element: <Login />
      },
      {
        path: "/signup", element: <Signup />
      },
      {
        path: "/auth-with-otp", element: <AuthWithOTP />
      }
    ]
  },
  {
    path: '/dashboard', element: <ProtectedRoute />,
    children: [
      {
        path: "", element: <DashboardLayout />,
        children: [
          { path: "profile", element: <ProfileRoute /> },
          { path: "classes", element: <ClassesRoute /> },
          { path: "classes/:classId", element: <IndividualClassRoute /> },
          {
            path: "feedback",
            element: <FeedbackIndexRoute />,
            children: [
              { path: "", element: <FeedBackRoute /> },
              { path: "survey", element: <SurveyRoute /> },
              { path: "feedback-table", element: <UserSurveyListRoute /> },
              { path: "bug-report", element: <BugReportRoute /> },
            ]
          },
        ]
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
