
function Validation(values) {
    let error = []
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(values.email === "") {
        error.email = "Email Should NOT Be Empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email is not valid";
    }else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } 
    else if (!password_pattern.test(values.password)) {
        error.password = "Password should Match";
    }else {
        error.password = ""
    }
    return error;
}

export default Validation;