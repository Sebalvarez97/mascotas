import React, { useState } from "react";
import DangerLabel from "../common/components/DangerLabel";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { DefaultProps, goHome } from "../common/utils/Tools";
import { login } from "../store/sessionStore";
import "../styles.css";
import FormInput from "../common/components/FormInput";
import FormPassword from "../common/components/FormPassword";

export default function Login(props: DefaultProps) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations();
        if (!login) {
            errorHandler.addError("login", "No puede estar vacío");
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío");
        }

        try {
            await login({
                login: userName,
                password
            });
            props.history.push("/");
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    return (
        <div className="global_content">
            <h2 className="global_title">Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <FormInput
                    label="Usuario"
                    name="login"
                    errorHandler={errorHandler}
                    onChange={(event) => setUserName(event.target.value)} />

                <FormPassword
                    label="Password"
                    name="password"
                    errorHandler={errorHandler}
                    onChange={(event) => setPassword(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <div className="btn-group ">
                    <button className="btn btn-primary" onClick={loginClick}>Login</button>
                    <button className="btn btn-light" onClick={() => goHome(props)} >Cancelar</button >
                </div >
            </form >
        </div >
    );
}
