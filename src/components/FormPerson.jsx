import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'primereact/toast';


//Estilos 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import '../styles/FormPerson.css'


function FormPerson() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const urlBase = 'http://localhost:8000/api/persons/';
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
    console.log(data);
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

    const data = JSON.stringify(person);

    const valid = validData(person)

    if (valid) {
      showError()
      return;
    }

    if (params.id) {
      axios({
        method: "put",
        url: urlBase + params.id,
        headers: {
          "content-type": "application/Json",
        },
        data: data,
      });
    }
    else {
      axios({
        method: "post",
        url: urlBase,
        headers: {
          "content-type": "application/Json",
        },
        data: data,
      });
    }

    navigate('/')
  }

  const peticionGet = async () => {

    const { data } = await axios.get(urlBase + params.id)
    setPerson(
      {
        id: data.ID,
        names: data.Names,
        surnames: data.Surnames,
        document: data.Document,
        telephone: data.Telephone
      }
    )
  }

  useEffect(() => {
    if (params.id) {
      peticionGet()
    }
  }, [])


  return (
    <div className='container-form' onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <form action="">
        <h3 id='title-person'>Formulario</h3>
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
        <Button label="Guardar" />
        <Link to="/">
          <Button label="Cancelar" className="p-button-danger" to={'/'} />
        </Link>
      </form>
    </div>


  )
}

export default FormPerson;