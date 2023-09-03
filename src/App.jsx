import './index.scss';
import Navbar from './componentes/NavBar/NavBar';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemListContainer greeting={'Bienvenidxs!!'}/>
    </div>
  );
}

export default App;
