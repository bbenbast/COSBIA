import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./Register";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { HomeLanding } from "./components/HomeLanding";
import { AssessmentWelcome } from "./components/AssessmentWelcome";
import { AssessmentQuiz } from "./components/AssessmentQuiz";
import { EnvironmentSelection } from "./components/EnvironmentSelection";
import { PasswordBuilder } from "./components/PasswordBuilder";
import { AppInvestigator } from "./components/AppInvestigator";
import { AppInvestigatorFeedback } from "./components/AppInvestigatorfeedback";
import { FriendRequestFilter } from "./components/FriendRequestFilter";
import { FriendRequestFeedback } from "./components/FriendRequestFilterFeedback";
import { LevelTransition } from "./components/LevelTransition";
import { MeetingAdvisorFeedback } from "./components/MeetingAdvisorFeedback";
import { MeetingAdvisor } from "./components/MeetingAdvisor";
import { Level2Transition } from "./components/Level2Transition";
import { NewsDetector } from "./components/NewsDetector";
import { NewsDetectorFeedback } from "./components/NewsDetectorFeedback";
import { WifiAuditor } from "./components/WifiAuditor";
import { WifiAuditorFeedback } from "./components/WifiAuditorFeedback";

const ENV_STORAGE_KEY = 'cosbia_selected_environment';

const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  assessmentWelcome: '/assessment-welcome',
  assessmentQuiz: '/assessment-quiz',
  environmentSelection: '/environment-selection',
  passwordBuilder: '/password-builder',
  appInvestigator: '/app-investigator',
  appInvestigatorFeedback: '/app-investigator-feedback',
  friendRequestFilter: '/friend-request-filter',
  friendRequestFeedback: '/friend-request-feedback',
  meetingAdvisor: '/meeting-advisor',
  meetingAdvisorFeedback: '/meeting-advisor-feedback',
  newsDetector: '/news-detector',
  newsDetectorFeedback: '/news-detector-feedback',
  wifiAuditor: '/wifi-auditor',
  wifiAuditorFeedback: '/wifi-auditor-feedback',
  levelTransition: '/level-transition',
  level2Transition: '/level-2-transition',
};

const readSelectedEnvironment = () => {
  try {
    const raw = localStorage.getItem(ENV_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const LandingWithNav = () => {
  const navigate = useNavigate();

  return (
    <Layout isPublic={true}>
      <HomeLanding onGetStarted={() => navigate(ROUTES.register)} />
    </Layout>
  );
};

const LoginWithNav = () => {
  const navigate = useNavigate();

  return (
    <Layout isPublic={true}>
      <Login onSwitchToRegister={() => navigate(ROUTES.register)} />
    </Layout>
  );
};

const RegisterWithNav = () => {
  const navigate = useNavigate();

  return (
    <Layout isPublic={true}>
      <Register onSwitchToLogin={() => navigate(ROUTES.login)} />
    </Layout>
  );
};

const App = () => {
  const { user, loading } = useAuth();
  const [selectedEnvironment, setSelectedEnvironment] = useState(() => readSelectedEnvironment());
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedEnvironment) {
      localStorage.setItem(ENV_STORAGE_KEY, JSON.stringify(selectedEnvironment));
    } else {
      localStorage.removeItem(ENV_STORAGE_KEY);
    }
  }, [selectedEnvironment]);

  const handleEnvironmentSelect = (envData) => {
    const nextEnvironment = {
      ...(envData || {}),
      selectedAt: Date.now(),
    };
    setSelectedEnvironment(nextEnvironment);
    navigate(ROUTES.passwordBuilder);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101037]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path={ROUTES.home} element={<LandingWithNav />} />
      <Route path={ROUTES.login} element={<LoginWithNav />} />
      <Route path={ROUTES.register} element={<RegisterWithNav />} />

      <Route
        path={ROUTES.dashboard}
        element={
          user ? (
            <Layout isPublic={false}>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.assessmentQuiz}
        element={
          user ? (
            <Layout isPublic={false}>
              <AssessmentQuiz />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.assessmentWelcome}
        element={
          user ? (
            <Layout isPublic={false}>
              <AssessmentWelcome />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.environmentSelection}
        element={
          user ? (
            <Layout isPublic={false}>
              <EnvironmentSelection onNext={handleEnvironmentSelect} />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.passwordBuilder}
        element={
          user ? (
            <Layout isPublic={false}>
              <PasswordBuilder
                selectedApp={selectedEnvironment?.app || 'TikTok'}
                onComplete={() => navigate(ROUTES.appInvestigator)}
              />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.appInvestigator}
        element={
          user ? (
            <Layout isPublic={false}>
              <AppInvestigator />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.appInvestigatorFeedback}
        element={
          user ? (
            <Layout isPublic={false}>
              <AppInvestigatorFeedback />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.friendRequestFilter}
        element={
          user ? (
            <Layout isPublic={false}>
              <FriendRequestFilter />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.friendRequestFeedback}
        element={
          user ? (
            <Layout isPublic={false}>
              <FriendRequestFeedback />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.meetingAdvisor}
        element={
          user ? (
            <Layout isPublic={false}>
              <MeetingAdvisor />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.meetingAdvisorFeedback}
        element={
          user ? (
            <Layout isPublic={false}>
              <MeetingAdvisorFeedback />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.newsDetector}
        element={
          user ? (
            <Layout isPublic={false}>
              <NewsDetector />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.newsDetectorFeedback}
        element={
          user ? (
            <Layout isPublic={false}>
              <NewsDetectorFeedback />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.wifiAuditor}
        element={
          user ? (
            <Layout isPublic={false}>
              <WifiAuditor />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.wifiAuditorFeedback}
        element={
          user ? (
            <Layout isPublic={false}>
              <WifiAuditorFeedback />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.levelTransition}
        element={
          user ? (
            <Layout isPublic={false}>
              <LevelTransition />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route
        path={ROUTES.level2Transition}
        element={
          user ? (
            <Layout isPublic={false}>
              <Level2Transition />
            </Layout>
          ) : (
            <Navigate to={ROUTES.home} replace />
          )
        }
      />

      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
};

export default App;
