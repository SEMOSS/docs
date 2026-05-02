import React from 'react';

export function Card({ title, children, tag }) {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '1rem',
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      {tag && (
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: '#555',
            marginBottom: '0.5rem',
          }}
        >
          {tag}
        </div>
      )}
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

export function CardGrid({ columns = 3, children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1rem',
      }}
    >
      {children}
    </div>
  );
}
