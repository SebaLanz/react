import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './componentes/NavBar/NavBar';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ProductList from './componentes/Page/ProductList/ProductList';
import InfoCompra from './componentes/Page/infoCompra/infoCompra'; // Importa el componente InfoCompra
import MisCompras from './componentes/Page/MisCompras/MisCompras';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<ItemListContainer greeting={'Bienvenidxs!!'} />} />
            <Route path="/productosByAll" element={<ProductList />} />
            <Route path="/category/:category" element={<ProductList />} />
            <Route path="/infoCompra" element={<InfoCompra />} />
            <Route path="/MisCompras" element={<MisCompras />} />
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
