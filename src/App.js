
import ChatApp from './components/ChatApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Newfriends from './components/newfriends';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path='/chat' element={<ChatApp/>}/>
          <Route path='/friends' element={<Newfriends/>}/>
          
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
