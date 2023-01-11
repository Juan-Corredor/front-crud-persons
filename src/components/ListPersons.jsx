import React, { useState, useEffect, useRef } from 'react';
import { getAllPersons, deletePerson }  from '../services/PersonsService.js';
//Styles
import '../styles/ListPersons.css'
import { 
	Toolbar,
	Toast,
	DataTable, 
	Column,
	Button, 	
	Dialog,	
} from '../styles/PrimeReact'
import FormDialog from './FormPerson.jsx';


function ListPersons() {
	const toast = useRef(null);  
	const [persons, setPersons] = useState([]);
	const [personById, setPersonById] = useState(0);
	const [selectPersonDelete, setSelectPersonDelete] = useState({});
	const [deletePersonDialog, setDeletePersonDialog] = useState(false);	
	const [displayForm, setDisplayForm] = useState(false);		
	const [consigDialog, setConsigDialog] = useState({});

	const getData = async () => {
		await getAllPersons().then( data => {setPersons(data)});	
	};	

	const confirmDeleteSelected = (data) => {
		setDeletePersonDialog(true);
		setSelectPersonDelete(data);		
	};

	const deleteSelectedPerson = async () => {
		deletePerson(selectPersonDelete.ID, selectPersonDelete).then( () => {
			getData();					
			setDeletePersonDialog(false);
			toast.current.show(
				{
					severity: 'success', 
					summary: 'Eliminación',
					detail: 'Registro eliminado exitosamente',
					life: 3000
				});				
			});		
	};

	const showFormPerson = (data) =>{	
		if (data) {	
			const configPut = {
				tittle: 'Actualización',
				tittleButton: 'Actualizar'
			}
			setPersonById(data.ID);
			setConsigDialog(configPut);			

		} else {
			const configPost = {
				tittle: 'Registrar',
				tittleButton: 'Guardar'
			}			
			setConsigDialog(configPost);			
		}		
		setDisplayForm(true);		
	};

	const onHide = () => {
    setDisplayForm(false);
		setPersonById(0);
  };

	const hideDeletePersonDialog = () => {
		setDeletePersonDialog(false);
	};
	
	//ELEMENTS HMTL
	const leftToolbarTemplate = () => {
		return (
			<React.Fragment>				
					<Button 
						label='Nuevo' 
						icon='pi pi-plus' 
						className="p-button-success mr-2" 
						onClick={() => {showFormPerson()}}
					/>	
					<Button 
						label='Recargar' 
						icon='pi pi-refresh' 
						className="p-button-info mr-2" 
						onClick={() => {getData()}}
					/>				
			</React.Fragment>
		)
	};
		
	const deletePersonDialogFooter = (
		<React.Fragment>
			<Button label="No" icon="pi pi-times" className="p-button-text " onClick={() => { setDeletePersonDialog(false) }} />
			<Button label="Si" icon="pi pi-check" className="p-button-text" onClick={() => { deleteSelectedPerson() }} />
		</React.Fragment>
	);
	
	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button icon="pi pi-pencil" className="p-button-rounded mr-2 p-button-table" onClick={() => (showFormPerson(rowData))} />
				<Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-table" onClick={() => (confirmDeleteSelected(rowData))} />
			</React.Fragment>
		);
	};

	useEffect( () => {
		getData();
	}, []);

	return (
		<>		
			<Toast ref={toast} />
			<div className='container-list-person'>
				
				<h1 id='title-person'>Listado de Personas</h1>

				<div className="card button-list-persons">					
					<Toolbar className="mb-4" left={leftToolbarTemplate}  />      					
				</div>

				<DataTable value={persons} responsiveLayout="scroll" emptyMessage="No se encuentran registros.">					
					<Column field="ID" header="# ID" />
					<Column field="Names" header="Nombres" />
					<Column field="Surnames" header="Apellidos" />
					<Column field="Document" header="Cédula" />
					<Column field="Telephone" header="Teléfono" />
					<Column body={actionBodyTemplate} header="Acciones" />
				</DataTable>

				<Dialog visible={deletePersonDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePersonDialogFooter} onHide={hideDeletePersonDialog}>
					<div className="confirmation-content">
						<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
						<span> ¿ Esta seguro que desea eliminar a esta persona ? </span>
					</div>
				</Dialog>
			</div>

			<FormDialog 
				displayForm={displayForm} 
				onHide={onHide} 
				getAllPersons={getData} 
				foundPerson={personById}
				configData={consigDialog}
			/>	
		</>		
	)
}

export default ListPersons;