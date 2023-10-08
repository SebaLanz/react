import { useForm } from "react-hook-form";
import './Contacto.css'; // Importa el archivo CSS

const Contacto = () => {
const { register, handleSubmit } = useForm();

const enviar = (data) => {
console.log(data);
}

return (
<div className="container">
    <div className="form-container">
    <h1 className="form-title">Contacto</h1>
    <form className="formulario" onSubmit={handleSubmit(enviar)}>
        <div className="form-group">
        <input
            type="text"
            placeholder="Ingresá tu nombre"
            {...register("nombre")}
            className="form-input"
        />
        </div>
        <div className="form-group">
        <input
            type="email"
            placeholder="Ingresá tu e-mail"
            {...register("email")}
            className="form-input"
        />
        </div>
        <div className="form-group">
        <input
            type="phone"
            placeholder="Ingresá tu teléfono"
            {...register("telefono")}
            className="form-input"
        />
        </div>
        <button className="form-button" type="submit">Finalizar Compra</button>
    </form>
    </div>
</div>
);
}

export default Contacto;
