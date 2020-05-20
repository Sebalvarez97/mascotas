import React, { useEffect, useState } from "react";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome, DefaultProps } from "../common/utils/Tools";
import "../styles.css";
import { deletePet, loadPet, newPet, savePet } from "./api/petsApi";
import DangerLabel from "../common/components/DangerLabel";
import FormInput from "../common/components/FormInput";

export default function NewPet(props: DefaultProps) {
    const [birthDate, setBirthDate] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")
    const [name, setName] = useState("")

    const errorHandler = useErrorHandler()

    const loadPetById = async (petId: string) => {
        if (petId) {
            try {
                const result = await loadPet(petId);
                setBirthDate(result.birthDate)
                setId(result.id)
                setName(result.name)
                setDescription(result.description)
            } catch (error) {
                errorHandler.processRestValidations(error);
            }
        }
    }
    const deleteClick = async () => {
        if (id) {
            try {
                await deletePet(id);
                props.history.push("/pets");
            } catch (error) {
                errorHandler.processRestValidations(error);
            }
        }
    }

    const saveClick = async () => {
        errorHandler.cleanRestValidations();
        if (!name) {
            errorHandler.addError("name", "No puede estar vacío");
        }

        if (errorHandler.hasErrors()) {
            return;
        }

        try {
            if (id) {
                await savePet({ id, name, birthDate, description });
            } else {
                await newPet({ id, name, birthDate, description });
            }
            props.history.push("/pets");
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    useEffect(() => {
        const { paramId } = props.match.params;
        if (paramId) {
            loadPetById(paramId)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="global_content">
            <h2 className="global_title">Nueva Mascota</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <FormInput
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    value={birthDate}
                    onChange={event => setBirthDate(event.target.value)}
                    errorHandler={errorHandler} />

                <DangerLabel message={errorHandler.errorMessage} />

                <div className="btn-group ">
                    <button className="btn btn-primary" onClick={saveClick}>Guardar</button>

                    <button hidden={!id}
                        className="btn btn-warning"
                        onClick={deleteClick}>Eliminar</button>

                    <button className="btn btn-light" onClick={() => goHome(props)} >Cancelar</button >
                </div >
            </form >
        </div>
    );
}
