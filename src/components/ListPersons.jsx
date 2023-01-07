import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPersons, deletePerson }  from '../services/PersonsApi.js';

//Estilos
import '../styles/ListPersons.css'
import { DataTable } from 'primereact/datatable';
import { Link } from 'react-router-dom';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';

function ListPersons() {
	const [persons, setPersons] = useState([]);
	const [person, setPerson] = useState({});
	const [deletePersonDialog, setDeletePersonDialog] = useState(false);
	const navigate = useNavigate();

	const getData = async () => {
		await getAllPersons().then( data => {setPersons(data)});	
	}

	const confirmDeleteSelected = (data) => {
		setDeletePersonDialog(true);
		setPerson(data)
	};

	const deleteSelectedPerson = () => {
		deletePerson(person.ID, person)
		.then( () => {
			getData();		
			setDeletePersonDialog(false);
		});
	};

	const updatePerson = (e) => {
		navigate(`/edit-person/${e.ID}`)
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button icon="pi pi-pencil" className="p-button-rounded mr-2 button-action" onClick={() => (updatePerson(rowData))} />
				<Button icon="pi pi-trash" className="p-button-rounded p-button-danger button-action" onClick={() => (confirmDeleteSelected(rowData))} />
			</React.Fragment>
		);
	};

	const leftToolbarTemplate = () => {
		return (
			<React.Fragment>
				<Link to="/create-person">
					<Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" />
				</Link>
			</React.Fragment>
		)
	};

	const deletePersonDialogFooter = (
		<React.Fragment>
			<Button label="No" icon="pi pi-times" className="p-button-text " onClick={() => { setDeletePersonDialog(false) }} />
			<Button label="Si" icon="pi pi-check" className="p-button-text" onClick={() => { deleteSelectedPerson() }} />
		</React.Fragment>
	);

	const hideDeletePersonDialog = () => {
		setDeletePersonDialog(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='container-list-person'>
			<h1 id='title-person'>Listado de Personas</h1>
			<div className="card">
				<Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
			</div>

			<DataTable value={persons} responsiveLayout="scroll">
				<Column field="ID" header="Identificador" />
				<Column field="Names" header="Nombres" />
				<Column field="Surnames" header="Apellidos" />
				<Column field="Document" header="Cedula" />
				<Column field="Telephone" header="Teléfono" />
				<Column body={actionBodyTemplate} header="Acciones" />
			</DataTable>

			<Dialog visible={deletePersonDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePersonDialogFooter} onHide={hideDeletePersonDialog}>
				<div className="confirmation-content">
					<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
					<span> ¿ Esta seguro que desea eliminar a esta persona ?</span>
				</div>
			</Dialog>
		</div>

	)
}

export default ListPersons;