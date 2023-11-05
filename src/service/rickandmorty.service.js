import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
})

export const getCharacters = async () => {
    return axiosInstance.get(`/character`)
}
export const getInfiniteCharacters = async (page) => {
    return axiosInstance.get(`/character/?page=${page}`)
}