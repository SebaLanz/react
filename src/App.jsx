import './index.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './componentes/NavBar/NavBar';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ItemCount from './componentes/ItemCount/ItemCount';
import ProductList from './componentes/Page/ProductList/ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        

          <ItemCount initial={1} stock={10} onAdd={(quantity)=> console.log('Cant agregada',quantity)}></ItemCount>

          <Routes>
            <Route path="/" element={<ItemListContainer greeting={'Bienvenidxs!!'} />} />
            <Route path="/productosByAll" element={<ProductList />} />
            <Route path="/category/:category" element={<ProductList />} />
            
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
