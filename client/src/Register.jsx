import { useContext, useState } from "react";
import chaticon from "./assets/chaticon.png";
import axios from "axios";
import { UserContext } from "./userContext";

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
  const {setUsername: setLoggedInUsername, setId} = useContext(UserContext);
  

  async function register(ev){
    ev.preventDefault();
    const {data} = await axios.post('/register', {username, password});
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-gray-900 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <img src={chaticon} alt="" className="rounded-full w-25 h-25" />
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-indigo-600 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-white text-center mt-2">
          {isLoginOrRegister === 'register' && (
         <div>
         Already a member?  
          <button onClick={() => setIsLoginOrRegister('login')}>Login here</button>
         </div>
         )}
         {isLoginOrRegister === 'login' && (
         <div>
         Already a member?  
          <button onClick={() => setIsLoginOrRegister('register')}>Register</button>
         </div>
         )}
         
        </div>
      </form>
    </div>
  );
};

export default Register;
