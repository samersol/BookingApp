import { Link } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import axios from "axios";

export default function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser (ev){
        ev.preventDefault()
        try{
            
        await axios.post('/register',{
            name,
            email,
            password
        });
        alert('Registration successful');
        }
        catch(e){
        alert('Registration failed. Please try agian');
        }
        
    }

return(
    <div className="mt-4 grow flex items-center justify-around">
       <div className="mb-64">
        <h1 className="text-4xl text-center mb-6">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
       
            <input type="text"
                placeholder="First Name" 
                value={name} onChange={ev => setName(ev.target.value)}/>
            <input type="email" 
                placeholder="your@mail.com" 
                value={email} onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" 
                placeholder="password" 
                value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button className="primary hover:bg-blue-500">Create Account</button>
            <div className="text-center py-2 ">
                Allready have an account ?
                <Link to={'/Login'} className="text-primary font-bold hover:text-blue-500"> Login</Link>
            </div>

        </form>
       </div>
    </div>


);



}