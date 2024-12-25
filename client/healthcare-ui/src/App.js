import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './Dashboard/Dashboard';
import AdminDashboard from './Dashboard/Admin/AdminDashboard';
import DoctorDashboard from './Dashboard/Doctor/DoctorDashboard';
import NurseDashboard from './Dashboard/Nurse/NurseDashboard';
import PatientList from './components/patient/PatientList';
import PatientManagement from './components/patient/PatientManagement';
import EventLog from './components/Event/EventLog';
import UserList from './components/User/AllUsersList';
import InterventionForm from './components/Intervention/InterventionForm';
import { SocketProvider } from '../src/contex/SocketContext';
import Layout from './contex/NavbarL';
import LandingPage from './components/main/Home';

// Get user role from localStorage or default to 'guest'
const getRole = () => localStorage.getItem('role') || 'guest';

function App() {
  const role = getRole();

  return (
    <SocketProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Default routes accessible to everyone */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Dynamic routes based on role */}
            <Route path={`/${role}/all-patients`} element={<PatientList />} />
            <Route path={`/${role}/patient-management`} element={<PatientManagement />} />
            <Route path={`/${role}/all-users`} element={<UserList />} />
            <Route path={`/${role}/event-logging`} element={<EventLog />} />
            <Route path={`/${role}/intervention-forms`} element={<InterventionForm />} />
            
            {/* Role-based dashboards */}
            <Route path={`/dashboard/admin`} element={ <AdminDashboard /> } />
            <Route path={`/dashboard/doctor`} element={ <DoctorDashboard /> } />
            <Route path={`/dashboard/nurse`} element={ <NurseDashboard /> } />
          </Routes>
        </Layout>
      </Router>
    </SocketProvider>
  );
}

export default App;
