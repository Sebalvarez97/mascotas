import React from "react";
import { useSelector } from "react-redux";
import FormTitle from "../common/components/FormTitle";
import { IStoredState } from "../store/sessionStore";
import Form from "../common/components/Form";

export default function StateInfo() {
    const user = useSelector((state: IStoredState) => state.user)
    const token = useSelector((state: IStoredState) => state.token)

    return (
        <div>
            <FormTitle>Información de Perfil</FormTitle>

            <Form>
                <div className="form-group">
                    <label>Login</label>
                    <input className="form-control" id="login" value={user?.login} disabled />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-control" id="name" value={user?.name} disabled />
                </div>
                <div className="form-group">
                    <label>Permisos</label>
                    <input className="form-control" id="name" value={user?.permissions} disabled />
                </div>
                <div className="form-group">
                    <label>Token</label>
                    <input className="form-control" id="name" value={token} disabled />
                </div>
            </Form>
        </div>
    );
}

