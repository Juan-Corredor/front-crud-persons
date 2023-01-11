import React, { useState, useEffect, useRef } from 'react'
import { getPersonById, createPerson, updatePerson}  from '../services/PersonsService.js';
//Styles 
import '../styles/FormPerson.css'
import { 	
	Dialog,
	Button, 
  InputText,
  Toast,
} from '../styles/PrimeReact'

function FormDialog({displayForm, onHide, getAllPersons, foundPerson, configData}) {
	const toast = useRef(null);  
  const [person, setPerson] = useState({
    id: 0,
    names: '',
    surnames: '',
    document: '',
    telephone: ''
  });
		
  const handleChance = (e) => {    
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const validData = (data) => { 
    if (data.names === '' || data.document === '') {
      return true;
    }
    else 
      return false;
  };

  const saveData = e => {     
    const valid = validData(person)

    if (valid) {                    
      return showMessage(
        'warn', 'Información Incompleta', 
        'Debe ingresar un valor para el nombre y documento de la persona'
      );

    } else if (foundPerson) {      
      updatePerson(foundPerson, person).then(() => {
        showMessage(
          'success', 
          'Actualización', 
          `Se ha guardado correctamente a ${person.names}`
        )
        getAllPersons();        
      });

    } else {      
			createPerson(person).then(() => {
        showMessage(
          'success', 
          'Creación', 
          `Se ha guardado correctamente a ${person.names}`
        );
        getAllPersons();
        
      });
    } 
    handleHide();
  };

  const handleHide = () => {
    onHide();
    setPerson( {
      id: 0,
      names: '',
      surnames: '',
      document: '',
      telephone: ''
    });    
  }

  //ELEMENTS HMTL
	const showMessage = (severity, summary, detail) => {
    toast.current.show(
      {
        severity: severity, 
        summary: summary,
        detail: detail,
        life: 3000
      });
  };

  const renderFooter = () => {
		return (
      <div>
          <Button label="Cancelar" icon="pi pi-times" onClick={handleHide} className="p-button-text" />
          <Button label={configData.tittleButton} icon="pi pi-check" onClick={saveData} autoFocus />
      </div>
		);
	};

  useEffect( () => {
    const getDataById = async () => {
      if (foundPerson) { 
        getPersonById(foundPerson).then( data => {
          setPerson({
            id: data.ID,
            names: data.Names,
            surnames: data.Surnames,
            document: data.Document,
            telephone: data.Telephone
          })          
        });	    
      }};

    getDataById();    
  }, [foundPerson]);

  return (
    <>      
      <Toast ref={toast} />       
      <Dialog 
        header={configData.tittle}
        visible={displayForm}
        style={{ width: '25vw' }}         
        onHide={handleHide}
				footer={renderFooter()}        
      >                	
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
      </Dialog>
    </>
  )
}

export default FormDialog;