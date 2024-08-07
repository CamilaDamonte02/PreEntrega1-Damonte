import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; 
import Card from './Card'

function CardProducts({product}) {
    return <Card 
    width="13vw" 
    height="17vw" 
    border="1px solid black" 
    >
        <NavLink to={`/${`item/${product.id}`}`} className="producto">
            <div className='FotoProducto'><img src={product.foto} alt=""/></div>
            <div className='NombreProducto'>  <h1>{product.categoria} {product.linea.replace(/_/g, ' ')}</h1></div>
            <div className='precio'>
                <p className='precioNuevo'>${product.precio}</p>
            </div>
        </NavLink>

    </Card>
}

CardProducts.propTypes = {
    product: PropTypes.shape({
        foto: PropTypes.string.isRequired,
        categoria: PropTypes.string.isRequired,
        linea: PropTypes.string.isRequired,
        precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired
};


export default CardProducts;
