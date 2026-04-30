import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Footer, Navbar, ProductCard, ExpandableText } from '../../components';
import { addCart } from '../../redux/action';
import { API_ENDPOINTS } from '../../config/api';
import apiClient from '../../services/apiClient';

const FALLBACK_IMAGE = '/assets/main.png.jpg';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const addProduct = (selectedProduct) => {
    dispatch(addCart(selectedProduct));
  };

  useEffect(() => {
    let isMounted = true;

    const getProduct = async () => {
      setLoading(true);
      setLoadingSimilar(true);
      setError('');

      try {
        const productResponse = await apiClient.get(API_ENDPOINTS.productById(id));
        const selectedProduct = productResponse.data;

        if (isMounted) {
          setProduct(selectedProduct);
          setLoading(false);
        }

        const similarResponse = await apiClient.get(API_ENDPOINTS.productsByCategory(selectedProduct.category));

        if (isMounted) {
          setSimilarProducts(similarResponse.data.filter((item) => String(item.id) !== String(id)));
          setLoadingSimilar(false);
        }
      } catch (requestError) {
        if (isMounted) {
          setError('No fue posible cargar el producto. Verifique que json-server esté activo.');
          setLoading(false);
          setLoadingSimilar(false);
        }
      }
    };

    getProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row product-detail">
        <div className="col-md-6 py-3">
          <Skeleton height={430} borderRadius={24} />
        </div>
        <div className="col-md-6 py-3">
          <Skeleton height={30} width={250} />
          <Skeleton height={60} />
          <Skeleton height={95} />
          <Skeleton height={50} width={160} />
          <Skeleton height={150} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => {
    if (!product) return null;

    return (
      <div className="container my-5 py-2">
        <section className="product-detail">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 col-12">
              <div className="product-detail__image-panel">
                <img
                  className="product-detail__image"
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.title}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="product-detail__category mb-2">{product.category}</div>
              <h1 className="display-5 product-detail__title">{product.title}</h1>
              <p className="lead mb-2">
                {product.rating?.rate} <i className="fa fa-star text-warning" />
                {product.rating?.count && <span className="text-muted fs-6 ms-2">({product.rating.count} reseñas)</span>}
              </p>

              <ExpandableText text={product.description} maxLength={220} className="text-muted mb-3" />

              <div className="product-detail__info-list">
                <div className="product-detail__info-item">
                  <span className="product-detail__info-label">Fabricante</span>
                  <span className="product-detail__info-value">{product.Fabricante?.Nombre_Empresa || 'No especificado'}</span>
                </div>
                <div className="product-detail__info-item">
                  <span className="product-detail__info-label">Modelo</span>
                  <span className="product-detail__info-value">{product.caracteristicas?.Modelo || 'No especificado'}</span>
                </div>
                <div className="product-detail__info-item">
                  <span className="product-detail__info-label">Área de aplicación</span>
                  <span className="product-detail__info-value">{product.caracteristicas?.Area_aplicacion || 'No especificada'}</span>
                </div>
                <div className="product-detail__info-item">
                  <span className="product-detail__info-label">Funciones</span>
                  <ExpandableText text={product.caracteristicas?.Funciones || 'No especificadas'} maxLength={180} className="product-detail__info-value" />
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <button className="btn btn-dark" type="button" onClick={() => addProduct(product)}>
                  Agregar al carrito
                </button>
                <Link to="/cart" className="btn btn-outline-dark">
                  Ir al carrito
                </Link>
                <Link to="/product" className="btn btn-link product-see-more">
                  Volver al catálogo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const LoadingSimilar = () => (
    <div className="row g-4 mt-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="col-lg-4 col-md-6 col-12">
          <Skeleton height={390} borderRadius={24} />
        </div>
      ))}
    </div>
  );

  const ShowSimilarProduct = () => {
    if (similarProducts.length === 0) {
      return <p className="text-muted mb-0">No hay productos similares disponibles para esta categoría.</p>;
    }

    return (
      <div className="row g-4 mt-2">
        {similarProducts.slice(0, 3).map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6 col-12">
            <ProductCard product={item} onAddToCart={addProduct} compact />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {error && <div className="alert alert-danger text-center my-4">{error}</div>}
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>

        <section className="similar-products-section my-5">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
            <div>
              <p className="text-uppercase text-muted fw-bold mb-1">Recomendaciones</p>
              <h2 className="section-title mb-0">También te puede interesar</h2>
            </div>
            <Link to="/product" className="btn btn-outline-dark btn-sm">
              Ver todo el catálogo
            </Link>
          </div>
          {loadingSimilar ? <LoadingSimilar /> : <ShowSimilarProduct />}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Product;
