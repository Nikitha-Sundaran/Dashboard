import React from "react";
import Field from "./Field";
import Button from "./Button";
import "../App.css"
import { BsCheckCircleFill } from "react-icons/bs";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { nameValidation , passwordValidation } from "./Validation";
import { nameErrorMessage , passwordErrorMessage } from "./Validation";
import { fetchData } from "../Firebase";
import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import  MyContext  from '../MyContext';


interface Toast{
    open : any;

}


const Login =() =>{
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([]); 
    const [userName,setUserName] = useState("");
    const [password ,setPassword] = useState("");
    const [error, setError] =useState("");
    const { setText } = useContext(MyContext);


    const [state, setState] = useState<any>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;


    useEffect(() => {
        const fetchDataFromFirebase = async () => {
            try {
                const fetchedData:any = await fetchData(); // Fetch data from Firebase
                setData(fetchedData); // Update component state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromFirebase(); 
    }, []); 




    const login = (newState:Toast)=>{
        
            // Find the user in the fetched data
            const user = data.find(obj => obj?.Username === userName);
            if (!userName || !password) {
                setError("Username and password are required.");
                
            }
            else if (!user) {
                setError("Incorrect Username.");
                
            }
        
            // Check if the entered password matches the user's password
            else if (user?.Password !== password) {
                setError("Incorrect password.");
                
            }
        
            else if(user?.Username === userName && user?.Password === password){
                setError("Login successful");
                navigate("/dashboard")
                setText(user)
            }

            setState({ ...state, open: true });
        
}
    


    return (
        <div className="main">
            <div className="container">
                <div className="cont-1">
                <div className="section">
                    <div className="start">
                        <div className="initial-text">
                            <div className="welcome">Welcome</div>
                            <div className="online">to online help center!</div>
                            <div className="info">
                                <BsCheckCircleFill className="tick-icon"/>
                                Secure and reliable for users
                            </div>
                            <div className="info">
                                <BsCheckCircleFill className="tick-icon"/>
                                <span>Even your grandma can use it</span>
                            </div>
                            <div className="info">
                                <BsCheckCircleFill className="tick-icon"/>
                                <span>Works 15% faster than others</span>
                            </div>
                        </div>
                    </div>
                    <div className="login">
                        <div className="login-div">
                        <Field title="User Name" type={"text"} inputValue={userName} setInputValue={setUserName} icon={<PersonOutlineOutlinedIcon style={{width:"20px"}}/>} validation={nameValidation} errorMessage={nameErrorMessage}/>
                        <Field title="Password" type={"password"} inputValue={password} setInputValue={setPassword} icon={<LockOutlinedIcon style={{width:"20px"}}/>} validation={passwordValidation} errorMessage={passwordErrorMessage}/>
                        <div className="forget-password">Forget your password?</div>
                        <div className="loginbtn">
                        <Button name={"Log In"} login={login}  />
                        </div>
                        
                        <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                autoHideDuration={6000}
                                message={error}
                                key={vertical + horizontal}
                        />
                        </div>
                    </div>

                </div>

                
                <div className="account">
                    <span className="acc-info">Dont have an account?</span>
                    <span className="acc-contact">Contact us</span>
                </div>

                </div>
                
            </div>

            
            
        </div>
    )
}

export default Login;