import React, { useState } from "react";
import Field from "./Field";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { nameErrorMessage, nameValidation, passwordErrorMessage, passwordValidation } from "./Validation";
import { Validation, insertData } from "../Firebase";
import Button from "./Button";



interface Details {
    FirstName:String;
    LastName:String;
    MiddleName:String;
    Username:String;
    Password : String;
    AdminUserName : String;
    type : String;

}
const Insert = ({setShow,text}:any) =>{

     

    const [userName,setUserName] = useState("");
    const [password ,setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [confirmPassword ,setConfirmPassword] = useState(""); 
    const [error,setError] =useState("")


    const  handleClick = async ()=>{
        const user:Details = { 
            FirstName:firstName,
            LastName:lastName,
            MiddleName:middleName,
            Username: userName,
            Password : password,
            AdminUserName: text,
            type : 'user'
        }
        const userValidate = await Validation(userName)
        if(!firstName || !lastName || !password || !confirmPassword){
            setError("All fields are mandatory except middle name");
        }
        else if(userValidate){
            setError("Username already exist");
        }
        else if(password !== confirmPassword){
            setError("Password and confirm password should be same")
        }
        
        else if (await insertData(user)){
            setShow(false)
        }
    }

    const clearClick = () =>{
        setUserName('') 
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setPassword('')
        setConfirmPassword('')
        setError('')

    }

    const closeClick = () =>{
        setShow(false);
    }

    
    return (
        <div className="insertbg">
            <Field title="First Name" type={"text"} inputValue={firstName} setInputValue={setFirstName} icon={<PersonOutlineOutlinedIcon style={{width:"20px"}}/>} validation={nameValidation} errorMessage={nameErrorMessage}/>
            <Field title="Last Name" type={"text"} inputValue={lastName} setInputValue={setLastName} icon={<PersonOutlineOutlinedIcon style={{width:"20px"}}/>} validation={nameValidation} errorMessage={nameErrorMessage}/>
            <Field title="Middle Name" type={"text"} inputValue={middleName} setInputValue={setMiddleName} icon={<PersonOutlineOutlinedIcon style={{width:"20px"}}/>} validation={nameValidation} errorMessage={nameErrorMessage}/>
            <Field title="User Name" type={"text"} inputValue={userName} setInputValue={setUserName} icon={<PersonOutlineOutlinedIcon style={{width:"20px"}}/>} validation={nameValidation} errorMessage={nameErrorMessage}/>
            <Field title="Password" type={"password"} inputValue={password} setInputValue={setPassword} icon={<LockOutlinedIcon style={{width:"20px"}}/>} validation={passwordValidation} errorMessage={passwordErrorMessage}/>
            <Field title="Confirm Password" type={"password"} inputValue={confirmPassword} setInputValue={setConfirmPassword} icon={<LockOutlinedIcon style={{width:"20px"}}/>} validation={passwordValidation} errorMessage={passwordErrorMessage}/>
            <div className='errorclr'>{error}</div>
            <div className="insertbtn">
            <div>
            <Button login={handleClick} name='Submit'/>
            </div>
            <div className="clear">
            <Button login={clearClick} name='Clear' />
            </div>
            <div className="clear">
            <Button login={closeClick} name='Close' />
            </div>
            </div>
            
            <div></div>
                        
        </div>
    )
}

export default Insert;