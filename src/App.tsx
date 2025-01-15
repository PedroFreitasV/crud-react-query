import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserList } from './Components/UserList';
import UserForm from './Components/UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;

