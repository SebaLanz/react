import { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({stock, initial, onAdd}) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock){setQuantity(quantity+1);}
    }
    const decrement = () => {if (quantity > 1){setQuantity(quantity-1);}
    }

    return (
        <div className='counter'>
            <div className='controls'>
                <button className='btn' onClick={decrement}>-</button>
                
                <button className='btn' onClick={increment}>+</button>
                
                
            </div>
            <div className='quantity'>
                <h4 className='number'>{quantity}</h4>
            </div>
            <div className='cont_btn_confirmar'>
                <button className='btnConfirmar' onClick={() => onAdd(quantity)}disabled={!stock}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}
export default ItemCount;