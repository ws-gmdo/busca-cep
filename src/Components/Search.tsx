// Hooks
import { useState, useRef }  from 'react';

// Axios
import axios         from 'axios';

// Primereact
import { Card }      from 'primereact/card';
import { Toast }     from 'primereact/toast';
import { Column }    from 'primereact/column';
import { Button }    from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputMask } from 'primereact/inputmask';

// Models
import { Data }      from './../../models/data';

// Ou export const Search = () => {
//      --> Assim, é uma variável que recebe um Componente
export function Search(){ // Function Component

    const [info, setInfo] = useState<Array<Data>>([]); // Infos da tabela
    const [history, setHistory] = useState(new Map()); // Histórico de ceps pesquisados
    
    const toast:any = useRef(null); // Toast de messagem de feedback da requisição

    const [cep, setCep] = useState(""); // CEP input
    const onChangeCep = (e: any) => {
        setCep(e.target.value);
    };

    const onFormSubmit = async (e: any) => {
        e.preventDefault();

        const cepWithoutMask = cep.replace("-", "").replace(".", "");

        // A princípio a requisição deu certo
        let severityToast = "success";
        let summaryToast  = "Requisição concluída";
        let detailToast   = "CEP buscado com sucesso";

        let newInfo:any = history.get(cepWithoutMask);
        
        if(newInfo != undefined){
            if(newInfo[0].erro){
                severityToast = "error";
                summaryToast  = "Erro na requisição";
                detailToast   = "CEP consultado não foi encontrado na base de dados";
            }

        }else{
            
            const url = 'https://viacep.com.br/ws/' + cepWithoutMask + '/json';
            await axios({
                method: 'get',
                url: url
            })
            .then( (response) => {
                if(response.data.erro){
                    // Altera a mensagem de feedback
                    severityToast = "error";
                    summaryToast  = "Erro na requisição";
                    detailToast   = "CEP consultado não foi encontrado na base de dados";
                    
                }else{
                    // Adicionando um novo campo ao data
                    response.data.erro = false;
                }

                newInfo = [response.data];
                
                // Atualiza o histórico
                const _history = new Map(history);  // Copia o histórico para outro
                    
                _history.set(cepWithoutMask, newInfo);  // Insere a busca no histórico cópia
                
                setHistory(_history);       // Atualiza o histório original 

            });

            
        }

        setInfo(newInfo);

        // Mensagem de feedback
        toast.current.show({
            severity: severityToast, 
            summary:  summaryToast, 
            detail:   detailToast,
            life: 3000
        });
    }

    return (
        <Card className = "card p-5 m-5 shadow-5 border-50 border-round border-1" >
            <div className = "card-container  p-4">
                <h1 className='text-primary font-semibold'>Busca CEP</h1>
                <form onSubmit={onFormSubmit}>
                    <div className='p-field col flex'>
                    <span className = "p-input-icon-left">    
                        <i className = "pi pi-search"></i>
                        <InputMask className='p-inputtext inputfield w-full'
                            id = "cep"
                            value={cep}
                            placeholder = "99.999-999"
                            required
                            mask='99.999-999'
                            onChange={onChangeCep}
                        />
                    </span>
                        <Button className = "p-button-outlined  ml-4"
                            label = 'Enviar'
                            icon  = 'pi pi-check'
                            type='submit'
                            disabled={false}
                        />
                    </div>
                </form>
            </div>
            <div className="card-container m-auto">
                <DataTable 
                    value={info} 
                    responsiveLayout = "stack"
                    emptyMessage = " ">
                    <Column field = "cep" header = "CEP"/>
                    <Column field = "logradouro" header = "Logradouro"/>
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
            <Toast ref={toast} className="primary"/>
        </Card>
    );
};