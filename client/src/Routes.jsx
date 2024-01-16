import { useContext } from "react";
import Register from "./Register"
import { UserContext } from "./userContext"

export default function Routes() {
    
const{username} = useContext(UserContext);

if(username){
    return 'Logged In';
}

  return (
    <Register/>
  );
}
