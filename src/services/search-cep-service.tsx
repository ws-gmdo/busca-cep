import axios, { AxiosRequestConfig } from 'axios';

class SearchCepService{
   
    async getInfoCep(cep:string) {

        const url = 'https://viacep.com.br/ws/' + cep + '/json';
        let options: AxiosRequestConfig = {
            method: 'get',
            url: url
        };

        let response = await axios(options);
        return response.data;
    }
}

export default SearchCepService;