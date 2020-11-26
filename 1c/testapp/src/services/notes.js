import axios from 'axios';

const baseUrl = 'https://stormy-retreat-41112.herokuapp.com/api/notes'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getAll:getAll,
    create:create,
    update:update
}
