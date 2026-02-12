import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Dashboard} from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { HomeLanding } from "./components/HomeLanding";
import { AppState } from "./types";
import { AssessmentWelcome } from "./components/AssessmentWelcome";
import { AssessmentQuiz } from "./components/AssessmentQuiz";
import { EnvironmentSelection } from "./components/EnvironmentSelection";
import { PasswordBuilder } from "./components/PasswordBuilder";
import { PasswordFeedback } from "./components/PasswordFeedback";
import { AppInvestigator } from "./components/AppInvestigator";
import { AppInvestigatorFeedback } from "./components/AppInvestigatorfeedback";
import { FriendRequestFilter } from "./components/FriendRequestFilter";
import { FriendRequestFeedback } from "./components/FriendRequestFilterFeedback";
import { LevelTransition } from "./components/LevelTransition";
import { MeetingAdvisorFeedback } from "./components/MeetingAdvisorFeedback";
import { MeetingAdvisor } from "./components/MeetingAdvisor";
import { Level2Transition } from "./components/Level2Transition";
import {NewsDetector} from "./components/NewsDetector";
import {NewsDetectorFeedback} from "./components/NewsDetectorFeedback";
import {WifiAuditor} from "./components/WifiAuditor";
import {WifiAuditorFeedback} from "./components/WifiAuditorFeedback";


const LandingWithNav = () => {
  const navigate = useNavigate();

  return (
    <Layout isPublic={true}>
      <HomeLanding onGetStarted={() => navigate("/register")} />
    </Layout>
  );
};

const LoginWithNav = () => {
  const navigate = useNavigate();

  return (
    <Layout isPublic={true}>
      <Login onSwitchToRegister={() => navigate("/register")} />
    </Layout>
  );
};

const RegisterWithNav = () => {
  const navigate = useNavigate();

  return (
    <Layout isPublic={true}>
      <Register onSwitchToLogin={() => navigate("/login")} />
    </Layout>
  );
};

const App = () => {
  const { user, loading } = useAuth();
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
const navigate = useNavigate();

  const handleEnvironmentSelect = (envData) => {
    setSelectedEnvironment(envData);
    navigate("/password-builder");
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
      <Route path="/" element={<LandingWithNav />} />
      <Route path="/login" element={<LoginWithNav />} />
      <Route path="/register" element={<RegisterWithNav />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Layout isPublic={false}>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/assessment-quiz"
        element={
          user ? (
            <Layout isPublic={false}>
              <AssessmentQuiz />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/assessment-welcome"
        element={
          user ? (
            <Layout isPublic={false}>
              <AssessmentWelcome />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/EnvironmentSelection"
        element={
          user ? (
            <Layout isPublic={false}>
              <EnvironmentSelection onNext={handleEnvironmentSelect} />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/password-builder"
        element={
          user ? (
            <Layout isPublic={false}>
              <PasswordBuilder
                selectedApp={selectedEnvironment?.app || "TikTok"}
                onComplete={() => navigate('/app-investigator')} 

              />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/app-investigator"
        element={
          user ? (
            <Layout isPublic={false}>
              <AppInvestigator />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route 
        path="/app-investigator-feedback" 
        element={user ? (
          <Layout isPublic={false}>
            <AppInvestigatorFeedback />
          </Layout>
        ) : <Navigate to="/" replace />} 
      />
      <Route 
        path="/friend-request-filter" 
        element={user ? (
          <Layout isPublic={false}>
            <FriendRequestFilter />
          </Layout>
        ) : <Navigate to="/" replace />} 
      />

      <Route 
        path="/friend-request-feedback" 
        element={user ? (
          <Layout isPublic={false}>
            <FriendRequestFeedback />
          </Layout>
        ) : <Navigate to="/" replace />} 
      />

      <Route 
      path="/meeting-advisor"
      element={
        user ? (
          <Layout isPublic={false}>
            <MeetingAdvisor />
          </Layout>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />

    <Route 
      path="/meeting-advisor-feedback"
      element={
        user ? (
          <Layout isPublic={false}>
            <MeetingAdvisorFeedback />
          </Layout>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
      <Route 
      path="/news-detector"
      element={
        user ? (
          <Layout isPublic={false}>
            <NewsDetector />
          </Layout>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />

    <Route 
      path="/news-detector-feedback"
      element={
        user ? (
          <Layout isPublic={false}>
            <NewsDetectorFeedback />
          </Layout>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
      <Route 
      path="/wifi-auditor"
      element={
        user ? (
          <Layout isPublic={false}>
            <WifiAuditor />
          </Layout>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />

    <Route 
      path="/wifi-auditor-feedback"
      element={
        user ? (
          <Layout isPublic={false}>
            <WifiAuditorFeedback />
          </Layout>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />



<Route
path="/level-transition"
element={
  user ? (
    <Layout isPublic={false}>
      <LevelTransition />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  )
}
/>
<Route
path="/level-2-transition"
element={
  user ? (
    <Layout isPublic={false}>
      <Level2Transition />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  )
}
/>




      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
