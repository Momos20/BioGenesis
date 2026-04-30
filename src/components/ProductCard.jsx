import React from 'react';
import { Link } from 'react-router-dom';
import ExpandableText from './ExpandableText';

const FALLBACK_IMAGE = '/assets/main.png.jpg';

const formatPrice = (price) => {
  if (price === undefined || price === null || Number.isNaN(Number(price))) {
    return null;
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(price));
};

const ProductCard = ({ product, onAddToCart, compact = false }) => {
  const productPrice = formatPrice(product.price);

  return (
    <article className={`card product-card ${compact ? 'product-card--compact' : ''} h-100 border-0`}>
      <Link to={`/product/${product.id}`} className="product-card__image-wrapper" aria-label={`Ver detalle de ${product.title}`}>
        <img
          className="product-card__image"
          src={product.image || FALLBACK_IMAGE}
          alt={product.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </Link>

      <div className="card-body product-card__body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2 align-items-start mb-2">
          <span className="product-card__badge">{product.category || 'Producto'}</span>
          {product.rating?.rate && (
            <span className="product-card__rating" aria-label={`Calificación ${product.rating.rate}`}>
              <i className="fa fa-star" /> {product.rating.rate}
            </span>
          )}
        </div>

        <h5 className="product-card__title">{product.title}</h5>

        {!compact && <ExpandableText text={product.description} maxLength={115} className="product-card__description" />}

        <div className="product-card__meta mt-auto">
          {productPrice && <div className="product-card__price">{productPrice}</div>}
          <div className="small text-muted">Garantía: {product.warranty || 'No especificada'}</div>
          <div className="small text-muted">Estado: {product.Estado || 'No especificado'}</div>
        </div>

        <div className="product-card__actions d-grid gap-2 mt-3">
          <Link to={`/product/${product.id}`} className="btn btn-outline-dark btn-sm">
            Ver características
          </Link>
          <button className="btn btn-dark btn-sm" type="button" onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
