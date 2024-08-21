export const checkValideData = (email, password) => {

    const isEmailValid= /([A-Z])\w+/.test(email);

const isPasswordValid =/ ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

if(isEmailValid) return "email is not valid";
if(isPasswordValid) return "password is not valid";

return null;
};