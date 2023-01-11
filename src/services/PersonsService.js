import axios from 'axios';
const urlBase = 'http://localhost:7000/api/persons/';

export const getAllPersons = () => {
  return axios.get(urlBase)
    .then(response =>  {
      const {data} = response;
      return data
    }); 
};

export const getPersonById = (id) => {
  return axios.get(urlBase + id)
    .then(response =>  {
      const {data} = response;
      return data
    }); 
};

export const createPerson = (data) => {
  return axios.post(urlBase, data)
    .then(response =>  {
      const {data} = response;
      return data
    }); 
};

export const updatePerson = (id , data) => {
  return axios.put(urlBase + id, data)
    .then(response =>  {
      const {data} = response;
      return data
    }); 
};

export const deletePerson = (id , data) => {
  return axios.delete(urlBase + id, {data});
};
