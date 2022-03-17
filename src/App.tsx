/*
  Sobre importações:

  Quando o arquivo é exportável por padrão, ou seja,
  quando tiver um export *default* <nome> no final
  do arquivo, então a importação será feita da seguinte
  maneira: 
              import <NOME> from '<local>'
  
  Quando o arquivo não é exportável por padrão, então a importação
  fica da seguinte maneira:
              import < {NOME} > from '<local>'
  Sem um export default no módulo é necessário nomear explicitamente 
  o que pretendemos importar usando a sintaxe de {}. 

*/

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '/node_modules/primeflex/primeflex.css'

import './App.css'
import {Search} from './Components/Search'
// TSX --> Arquivos TypeScript com JSX
// TS  --> Arquivos TypeScript


// Função principal onde todos os componentes serão renderizados
function App() {
  
  return (
    <div className="App">  
      <Search/>
    </div>
  );
}

// Renderiza App() na tela do Browser
export default App;
