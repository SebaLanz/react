import './index.scss';
import Navbar from './componentes/NavBar/NavBar';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ItemCount from './componentes/ItemCount/ItemCount';
import ProductList from './componentes/Page/ProductList/ProductList';
function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemListContainer greeting={'Bienvenidxs!!'}/>
      <ItemCount initial={1} stock={10} onAdd={(quantity)=> console.log('Cant agregada',quantity)}></ItemCount>
      <ProductList></ProductList>
    </div>
  );
}

export default App;
