import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import NavBar from './Components/NavBar';
import loader from './assets/cargando.gif'
import CardProductsList from './Components/CardProductsList';
import data from './data/ariculosCarpinteria.json'
import Filtros from './Components/filtros'
import Cartel from './Components/Cartel'

function App() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const {categoryId} = useParams()

  useEffect(() => {
    const myPromise = new Promise ((res) => {
      setTimeout(() => res(data), 2000)})
      .then(res => {
        console.table(categoryId)
        if (!categoryId){
          //si es undefined mostrar todos los productos
          setProducts(res)
        }else{
          //si no es undefined mostrar solo los productos filtrados
          //Como se puede filtrar por categoria y por lineas busco coincidencias en ambas
          const CategoriasFilter = res.filter(i => i.categoria === categoryId)
          const LineasFilter = res.filter(i => i.linea === categoryId)
          //Si categorias no es un array vacío muestro ese array
          setProducts(CategoriasFilter.length > 0 ? CategoriasFilter : LineasFilter);
        }
        setLoading(false); 
    } )
  },  [categoryId]);
    
  return (
    <>
      <NavBar />
      {loading ? (
        <img className="imagenCargando" src={loader} alt='cargando'/>
      ) : products.length ? (
        <div  className='tienda' loading={loading}>
          <img className='Portada' src='https://camiladamonte02.github.io/PreEntrega2-Damonte/src/assets/portadaTienda.png' ></img>
          <h1 className="titulo-tienda">Tienda</h1>
          <div className="contenido-tienda">
            <Filtros />
            <div className='cardProductListContainer'>
              <CardProductsList products={products}/>
            </div>
          </div>
        </div>
      ) : (
        <main><Cartel nombre = 'Advertencia' descripcion='No hay productos disponibles'/></main>
      )}
    </>
  );
}

export default App;
