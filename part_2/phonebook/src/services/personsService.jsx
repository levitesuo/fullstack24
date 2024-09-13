import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => axios.get(baseUrl);

const create = (person) => axios.post(baseUrl, person);

const remove = (personId) => axios.delete(`${baseUrl}/${personId}`);

const update = (person) => axios.put(`${baseUrl}/${person.id}`, person);

export default { getAll, create, remove, update };

