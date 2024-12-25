import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './Dashboard/Dashboard';
import AdminDashboard from './Dashboard/Admin/AdminDashboard';
// import DoctorDashboard from './Dashboard/Doctor/DoctorDashboard';
// import NurseDashboard from './Dashboard/Nurse/NurseDashboard';
// import PatientDashboard from './Dashboard/Patient/PatientDashboard';
import PatientList from './components/patient/PatientList';
import PatientManagement from './components/patient/PatientManagement';
import EventLog from './components/Event/EventLog';
import UserList from './components/User/AllUsersList';
import InterventionForm from './components/Intervention/InterventionForm';
import { SocketProvider } from '../src/contex/SocketContext'; 

function App() {
  return (
    <SocketProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />  
        {/* <Route path="/dashboard/doctor" element={<DoctorDashboard />} />  
        <Route path="/dashboard/nurse" element={<NurseDashboard />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} /> */}
        <Route path="/admin/all-patients" element={<PatientList/>} />
        <Route path="admin/patient-management" element={<PatientManagement/>} />
        <Route path="/admin/all-users" element={<UserList/>} />
        <Route path="/admin/event-logging" element={<EventLog />} />
        <Route path="/admin/intervention-forms" element={<InterventionForm />} />
      </Routes>
    </Router>
    </SocketProvider>
  );
}

export default App;
