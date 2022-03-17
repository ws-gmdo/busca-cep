import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button'

const handleFormSubmit = (e: any) => {
    // Cancela o evento se for cancelável, sem parar a propagação do mesmo.
    e.preventDefault();

    

}

export const Search = () => {
    return (
        <div className = "card p-5 m-5" >
            <div className = "card-container shadow-5 border-50 border-round border-1 p-4">
                <h2 className='text-primary font-semibold'>Busca CEP</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className='p-field col flex'>
                        <span className = "p-input-icon-left">    
                            <i className = "pi pi-search"></i>
                            <InputMask className='p-inputtext inputfield w-full'
                                id="cep"
                                mask='99.999-999'
                                placeholder='99.999-999'
                                required
                            />
                        </span>
                        <Button className = "p-button-outlined  ml-4"
                            label = 'Enviar'
                            icon  = 'pi pi-check'
                            type='submit'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};