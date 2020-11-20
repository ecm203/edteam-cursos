import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const Formulario = ({ edit, id, handleCloseForm }) => {

    const [cursoSelected, setCursoSelected] = useState({})
    const { handleSubmit, register, errors } = useForm();
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        if (edit === true && id !== null) {
            const getCursoById = async () => {
                const resp = await fetch(`http://localhost:3000/cursos/${id}`);
                const data = await resp.json()
                setCursoSelected(data)
                setAvailable(Boolean(data.available))
            }
            getCursoById();
        }
    }, [id, edit])
 
    const onSubmit = (data) => {
        console.log(data)
        const insertCurso = async (data) => {
            const resp = await fetch("http://localhost:3000/cursos", {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const body = await resp.json()
            console.log("Agregado Correctamente",body)
            handleCloseForm();
        }

        const updateCurso = async (data) => {
            console.log(data)
            const resp = await fetch(`http://localhost:3000/cursos/${data.id}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const body = await resp.json()
            console.log("Actualizado Correctamente",body)
            handleCloseForm();
        }

        edit ? updateCurso(data) : insertCurso(data)

    };


    return (
        <div className="form-overlay">
            <div className="form-content">
                <div className="form-header">
                    <h3 className="form-title">{edit ? "Editar Curso" : "Nuevo Curso"}</h3>
                    <button onClick={handleCloseForm} className="form-close">X</button>
                </div>
                <form type="submit" className="form-body">
                    <div className="input-row">
                        <div
                            className={`input-div ${errors.id ? "input-error" : ""
                                }`}>
                            <input
                                type="text"
                                readOnly = { edit ? true : false}
                                defaultValue={cursoSelected.id}
                                required
                                autoComplete="off"
                                name="id"
                                id="txtId"
                                ref={register({
                                    required: "*Campo obligatorio"
                                })}
                            />
                            <label className={`lblLabel`}>{edit ? "Código" : "Ingrese Código"}</label> 

                            {errors.id && (
                                <span className="input-feedback">
                                    {errors.id.message}
                                </span>
                            )}
                        </div>
                        <div
                            className={`input-div ${errors.name ? "input-error" : ""
                                }`}>
                            <input
                                type="text"
                                required
                                defaultValue={cursoSelected.name}
                                autoComplete="off"
                                name="name"
                                spellCheck="false"
                                ref={register({
                                    required: "*Campo obligatorio",
                                })}
                            />
                            <label className={`lblLabel`}>Ingrese Nombre</label>
                            {errors.name && (
                                <span className="input-feedback">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`input-div ${errors.poster ? "input-error" : ""
                            }`}>
                        <input
                            type="text"
                            required
                            defaultValue={cursoSelected.poster}
                            autoComplete="off"
                            name="poster"
                            spellCheck="false"
                            ref={register({
                                required: "*Campo obligatorio",
                                pattern: {
                                        value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
                                        message:
                                            "*Ingrese una URL válida",
                                    },
                            })}
                        />
                        <label className={`lblLabel`}>Ingrese poster (URL)</label>
                        {errors.poster && (
                            <span className="input-feedback">
                                {errors.poster.message}
                            </span>
                        )}
                    </div>
                    <div
                        className={`input-div ${errors.description ? "input-error" : ""
                            }`}>
                        <input
                            type="text"
                            required
                            defaultValue={cursoSelected.description}
                            autoComplete="off"
                            name="description"
                            spellCheck="false"
                            ref={register({
                                required: "*Campo obligatorio",
                            })}
                        />
                        <label className={`lblLabel`}>Ingrese Descripción</label>
                        {errors.description && (
                            <span className="input-feedback">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                    <div className="input-row">
                        <div
                            className={`input-div ${errors.price ? "input-error" : ""
                                }`}>
                            <input
                                type="text"
                                required
                                defaultValue={cursoSelected.price}
                                autoComplete="off"
                                name="price"
                                spellCheck="false"
                                ref={register({
                                    required: "*Campo obligatorio",
                                    pattern:{
                                        value: /^-?\d*\.?\d*$/,
                                        message:"Ingrese un precio válido"
                                        
                                    }
                                })}
                            />
                            <label className={`lblLabel`}>Ingrese Precio</label>
                            {errors.price && (
                                <span className="input-feedback">
                                    {errors.price.message}
                                </span>
                            )}
                        </div>
                        <div
                            className="input-available">
                            <input type="checkbox" id="cb-available" name="available" defaultValue={available} checked={available} title="Ingrese"  onChange={event => setAvailable(event.target.checked)}  ref={register}/>
                            <label htmlFor="cb-available" className="label-available">Disponible</label>
                        </div>
                    </div>
                    <div className="action">
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Formulario.propTypes = {
    edit: PropTypes.bool,
    id: PropTypes.string,
    handleCloseForm: PropTypes.func
};

Formulario.defaultProps = {
    edit: false,
    id: null,
};


export default Formulario
