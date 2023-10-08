import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/NavBar/NavBar';
import ProductList from './componentes/Page/ProductList/ProductList';
import InfoCompra from './componentes/Page/infoCompra/infoCompra'; // Importa el componente InfoCompra
import MisCompras from './componentes/Page/MisCompras/MisCompras';
import Home from './componentes/Page/Home/Home';
import Contacto from './componentes/Contacto/Contacto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {}
          <Route path="/productosByAll" element={<ProductList />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/infoCompra" element={<InfoCompra />} />
          <Route path="/MisCompras" element={<MisCompras />} />
          <Route path="/Contacto" element={<Contacto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
