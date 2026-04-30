import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { addCart } from '../redux/action';
import { API_ENDPOINTS } from '../config/api';
import apiClient from '../services/apiClient';
import ProductCard from './ProductCard';

const categories = [
  { label: 'Todos', value: 'all' },
  { label: 'Diagnóstico', value: 'Diagnostic' },
  { label: 'Terapéutico', value: 'Therapeutic' },
  { label: 'Monitoreo', value: 'Monitoring' },
  { label: 'Rehabilitación', value: 'Rehabilitation' },
  { label: 'Servicios generales', value: 'GeneralServices' },
  { label: 'Mejor calificación', value: 'best-score' },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await apiClient.get(API_ENDPOINTS.products);

        if (isMounted) {
          setProducts(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError('No fue posible cargar los productos. Verifique que json-server esté activo.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesFilter =
        selectedFilter === 'all'
          ? true
          : selectedFilter === 'best-score'
            ? product.rating?.rate >= 4.5
            : product.category === selectedFilter;

      const matchesSearch = normalizedSearch
        ? `${product.title} ${product.description} ${product.category}`.toLowerCase().includes(normalizedSearch)
        : true;

      return matchesFilter && matchesSearch;
    });
  }, [products, searchTerm, selectedFilter]);

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="col-lg-4 col-md-6 col-12 mb-4">
          <Skeleton height={590} borderRadius={24} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="col-12 mb-4">
        <div className="filter-toolbar">
          <div className="row g-3 align-items-center">
            <div className="col-lg-4">
              <label className="form-label fw-bold mb-1" htmlFor="product-search">
                Buscar producto
              </label>
              <input
                id="product-search"
                className="form-control"
                type="search"
                placeholder="Ej: monitor, diagnóstico, rehabilitación..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="col-lg-8">
              <span className="d-block fw-bold mb-2">Filtrar por categoría</span>
              <div className="d-flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className={`btn btn-sm ${selectedFilter === category.value ? 'btn-dark' : 'btn-outline-dark'}`}
                    type="button"
                    onClick={() => setSelectedFilter(category.value)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="col-12">
          <div className="alert alert-warning text-center">No se encontraron productos con los filtros seleccionados.</div>
        </div>
      ) : (
        filteredProducts.map((product) => (
          <div id={product.id} key={product.id} className="col-lg-4 col-md-6 col-12 mb-4">
            <ProductCard product={product} onAddToCart={addProduct} />
          </div>
        ))
      )}
    </>
  );

  return (
    <main className="container my-4 py-4">
      <div className="row">
        <div className="col-12 text-center mb-2">
          <p className="text-uppercase text-muted fw-bold mb-2">Catálogo médico</p>
          <h2 className="display-5 section-title">Productos biomédicos</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Explore equipos médicos por categoría, revise sus características principales y agregue productos para solicitar una cotización.
          </p>
        </div>
      </div>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
    </main>
  );
};

export default ProductList;
