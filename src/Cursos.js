import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import Formulario from './Formulario'

const Cursos = () => {

    const [cursos, setCursos] = useState([])
    const [deleteCurso, setDeleteCurso] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [idSelected, setIdSelected] = useState(null);

    useEffect(() => {
        if (editForm === false || openForm === false || deleteCurso === false) {
            const getAllCursos = async () => {
                const resp = await fetch("http://localhost:3000/cursos");
                const data = await resp.json()
                setCursos(data)
            }
            getAllCursos();
        }
    }, [editForm, openForm, deleteCurso])

    const handleOpenForm = () => {
        setEditForm(false)
        setOpenForm(true)
    }

    const handleOpenEditForm = (id) => {
        setIdSelected(id);
        setEditForm(true)
        setOpenForm(true)
    }
    const handleDeleteCurso = (id) => {
        setDeleteCurso(true)
        const deleteCurso = async (id) => {
            const resp = await fetch(`http://localhost:3000/cursos/${id}`, {
                method: 'DELETE',
            });
            const body = await resp.json()
            console.log("Curso Eliminad Correctamente",body)
            setDeleteCurso(false)
        }

        Swal.fire({
            padding:"1rem",
            width:"25rem",
            title: 'Está seguro que desea eliminar este curso?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#cb3234',
            cancelButtonColor: '#007BDF',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCurso(id);
            }
        })
    }
    const handleCloseForm = () => {
        setOpenForm(false)
    }
    return (
        <>
            <nav className="navbar">
                <div className="container navbar-content">
                    <a className="home-link" href="./Home">
                        <img src="https://ed.team/static/images/logo/logo.svg" alt="Logo EDteam" />
                    </a>
                </div>
            </nav>
            <section className="container grid">
                {
                    
                    cursos.map((curso) => (
                        <div key={curso.id} className="card">
                            <img src={curso.poster} alt={curso.name} className="img-fluid"></img>
                            <div className="card-content">
                                <h3 className="curso-name">{curso.name}</h3>
                                <p className="curso-description">{curso.description} </p>
                                <span className="curso-available"> { curso.available ? "Disponible" : "No Disponible" } </span>
                                <p className="curso-price">S/.{curso.price}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={handleOpenEditForm.bind(this, curso.id)} className="btn edit">
                                    Editar
                                    </button>
                                <button onClick={handleDeleteCurso.bind(this, curso.id)} className="btn delete">
                                    Eliminar
                                    </button>
                            </div>
                        </div>
                    ))
                }
            </section>
            <footer>
                Diseñado por Edwin Cajan Morales para EDteam
            </footer>
            <div className="button-add" onClick={handleOpenForm}>
                +
            </div>
            {
                openForm && <Formulario edit={editForm} id={idSelected} handleCloseForm={handleCloseForm} />
            }
        </>
    )
}

export default Cursos
