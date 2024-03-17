import React, { useState } from "react";
import "../App.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




interface FieldProps {
    title : String;
    type : any;
    icon : any;
    validation : any;
    errorMessage : String;
    inputValue : any;
    setInputValue : any;

    
    
}
const Field = ({title,type,icon,validation,errorMessage,inputValue,setInputValue}:FieldProps) =>{
   

   const handleChange =(event:any)=>{
    const newValue = event.target.value;
    setInputValue(newValue);
   }

   const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}

   const error = validation(inputValue)
    return (
        <div className="label">
            <div>{title} &nbsp; </div>
            <TextField
              id="outlined-basic" hiddenLabel variant="outlined" className="text-field" size="small"  type={showPassword ? "text" : type}
             InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {icon}
                  </InputAdornment>
                ),
                endAdornment:(
                  type === "password"  ?
                  <InputAdornment position="end">
                  {<IconButton style={{width:"20px", cursor:'pointer'}} onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>}
                </InputAdornment> : null
                )
              }}
              value={inputValue}
              onChange={handleChange}
              error={error}
              helperText={error ? errorMessage:''}
              />

        </div>
    )
}

export default Field;