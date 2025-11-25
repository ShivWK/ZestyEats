import { triggerToast } from "../../utils/triggerToast";

export const nameValidator = ({ name, setErrorIn }) => {
    if (name.length === 0 || name.length > 100 || /[^a-zA-z\s]/g.test(name)) {
        setErrorIn("name");
        triggerToast("Name must be between 1 and 100 characters.", "red");
        return false;
    }
    return true;
}

export const emailValidator = ({ email, setErrorIn }) => {
    if (email.length === 0 || email.length > 254 || !/^[^.][a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setErrorIn("email");
        triggerToast("Enter a valid email address.", "red");
        return false;
    }
    return true;
}

export const messageValidator = ({ message, setErrorIn }) => {
    if (message.length === 0 || message.length > 1000) {
        setErrorIn("query");
        triggerToast("Message must be between 1 and 1000 characters.", "red");
        return false;
    }
    return true;
}