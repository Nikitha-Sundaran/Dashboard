import React from "react";
import "../App.css";


interface ButtonProps {
    name : String;
    login: any;
    
}
const Button : React.FC<ButtonProps> = ({name,login}:ButtonProps) =>{
    return (
        <div>
            <button onClick={login} className="btn">{name}</button>
        </div>
    )
}

export default Button;