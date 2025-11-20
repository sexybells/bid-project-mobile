import axios from 'axios'


export const postMethod = (url:string,data:any) => {
   return axios.post('http://192.168.1.31:8000' + url,data);
}

export const getMethod = (url:string) => {
    return axios.get(url);
}