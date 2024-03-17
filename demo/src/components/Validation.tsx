export const nameValidation =(value:any) =>{
    if (value.length > 20) {
        return true;
      }
}

export const passwordValidation = (value:any) =>{
    if (value.trim() && (value.length < 8 || value.length > 16)) {
        return true;
      }
}

export const nameErrorMessage =  "Username should have a maximum of 20 characters";


export const passwordErrorMessage =  "Password should be between 8 and 16 characters";

