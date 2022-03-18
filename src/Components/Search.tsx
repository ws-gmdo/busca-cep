// Hooks
import { useState }  from 'react';

// Axios
import axios         from 'axios';

// Primereact
import { DataTable } from 'primereact/datatable';
import { Column }    from 'primereact/column';
import { Button }    from 'primereact/button';
import {InputText}   from 'primereact/inputtext';

// Models
import { Data }      from './../../models/data';

// Ou export const Search = () => {
//      --> Assim, é uma variável que recebe um Componente
export function Search(){ // Function Component

    const [info, setInfo] = useState<Array<Data>>([]); // Infos da tabela
    const [history, setHistory] = useState(new Map()); // Histórico de ceps pesquisados
    const [buttonDisabled, setButtonDisabled] = useState(false); // Bloquear botão

    const [cep, setCep] = useState(""); // CEP input
    const onChangeCep = (e: any) => {
        setCep(e.target.value);
    };

    const onFormSubmit = (e: any) => {
        e.preventDefault();

        let newInfo:any = history.get(cep);
        
        if(newInfo != undefined){
            setInfo(newInfo)
        }else{
            const url = 'https://viacep.com.br/ws/' + cep + '/json';
            axios({
                method: 'get',
                url: url
            }).then( (response) => {
                newInfo = [response.data];
                
                const _history = new Map(history);  // Copia o histórico para outro
                
                _history.set(cep, newInfo);  // Insere a busca no histórico cópia
                
                setHistory(_history);       // Atualiza o histório original 

                setInfo(newInfo);
            });
        }
    }

    return (
        <div className = "card p-5 m-5 shadow-5 border-50 border-round border-1" >
            <div className = "card-container  p-4">
                <h1 className='text-primary font-semibold'>Busca CEP</h1>
                <form onSubmit={onFormSubmit}>
                    <div className='p-field col flex'>
                    <span className = "p-input-icon-left">    
                        <i className = "pi pi-search"></i>
                        <InputText className='p-inputtext inputfield w-full'
                            id = "cep"
                            value={cep}
                            placeholder = "Digite o CEP"
                            required
                            minLength={8}
                            maxLength={8}
                            onChange={onChangeCep}
                        />
                    </span>
                        <Button className = "p-button-outlined  ml-4"
                            label = 'Enviar'
                            icon  = 'pi pi-check'
                            type='submit'
                            disabled={buttonDisabled}
                        />
                    </div>
                </form>
            </div>
            
            <div className="card-container m-auto">
                <DataTable 
                    value={info} 
                    responsiveLayout = "stack"
                    emptyMessage = "Sem registros.">
                    <Column field = "cep" header = "CEP"/>
                    <Column field = "logadouro" header = "Logadouro"/>
                    <Column field = "complemento" header = "Complemento"/>
                    <Column field = "bairro" header = "Bairro"/>
                    <Column field = "localidade" header = "Localidade"/>
                    <Column field = "uf" header = "UF"/>
                    <Column field = "ibge" header = "IBGE"/>
                    <Column field = "gia" header = "GIA"/>
                    <Column field = "ddd" header = "DDD"/>
                    <Column field = "siafi" header = "SIAFI"/>
                </DataTable>
            </div>
        </div>
    );
};