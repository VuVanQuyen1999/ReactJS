import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Header from './Components/Header';
import Content from './Components/Content';


function App() {
  return (
    <div className="App">
      <h1>Quản Lý Danh Sách Thành Viên</h1>
      <Header />
    </div>
  );
}

export default App;
