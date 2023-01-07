import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getPersonById, createPerson, updatePerson }  from '../services/PersonsApi.js';

//Estilos 
import '../styles/FormPerson.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';


function FormPerson({titleButton, titleForm}) {
  const toast = useRef(null);
  const navigate = useNavigate();  
  const params = useParams();
  const [person, setPerson] = useState({
    id: 0,
    names: '',
    surnames: '',
    document: '',
    telephone: ''
  });

  const handleChance = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  }

  const validData = (data) => {    
    if (data.names === '' || data.document === '') {
      return true;
    }
    else return false;
  }

  const showError = () => {
    toast.current.show(
      {
        severity: 'error', summary: 'Error al Guardar',
        detail: 'Debe ingresar un valor para el nombre y documento de la persona',
        life: 3000
      });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const valid = validData(person)

    if (valid) {
      showError()
      return;
    }
    else if (params.id) {      
      navigate('/');
      updatePerson(params.id, person);      
    }
    else {
      createPerson(person).then(() => {
        navigate('/');        
      });
    }
  }

  const getDataById = async () => {
    if (params.id) { 
      getPersonById(params.id)
        .then( data => {
          setPerson({
            id: data.ID,
            names: data.Names,
            surnames: data.Surnames,
            document: data.Document,
            telephone: data.Telephone
          })
        });	    
    }
  }

  useEffect(() => {
    getDataById()
  }, [])


  return (
    <div className='container-form' onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <form action="">
        <h3 id='title-person'>{titleForm}</h3>
        <div className='fied'>
          <InputText name="names" placeholder="Nombre" onChange={handleChance} value={person.names} />
        </div>
        <div className='fied'>
          <InputText name="surnames" placeholder="Apellidos" onChange={handleChance} value={person.surnames} />
        </div>
        <div className='fied'>
          <InputText type='number' name="document" placeholder="Documento" onChange={handleChance} value={person.document} />
        </div>
        <div className='fied'>
          <InputText type='number' name="telephone" placeholder="Teléfono" onChange={handleChance} value={person.telephone} />
        </div>
        <Button label={titleButton} />
        <Link to="/">
          <Button label="Cancelar" className="p-button-danger" to={'/'} />
        </Link>
      </form>
    </div>


  )
}

export default FormPerson;