import React, { useState } from 'react';

const ExpandableText = ({ text = '', maxLength = 120, className = '' }) => {
  const [expanded, setExpanded] = useState(false);
  const normalizedText = String(text || '').trim();
  const shouldTruncate = normalizedText.length > maxLength;
  const visibleText = !shouldTruncate || expanded ? normalizedText : `${normalizedText.slice(0, maxLength).trim()}...`;

  if (!normalizedText) {
    return <p className={className}>Sin descripción disponible.</p>;
  }

  return (
    <div className={className}>
      <p className="mb-1">{visibleText}</p>
      {shouldTruncate && (
        <button
          className="btn btn-link product-see-more px-0"
          type="button"
          onClick={() => setExpanded((currentValue) => !currentValue)}
          aria-expanded={expanded}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
