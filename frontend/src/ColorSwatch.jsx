import React from 'react';
import './styles/ColorSwatch.css';
import Text from './components/Text';

function getCssVarValue(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`);
}

const colorCategories = [
  {
    label: 'Brand Colors',
    colors: [
      'primary-50','primary-100','primary-200','primary-300','primary-400','primary-500','primary-600','primary-700','primary-800','primary-900','primary-light','primary-dark','primary-main',
    ],
  },
  {
    label: 'Accent Colors',
    colors: [
      'secondary-50','secondary-100','secondary-200','secondary-300','secondary-400','secondary-500','secondary-600','secondary-700','secondary-800','secondary-900','secondary-main',
    ],
  },
  {
    label: 'Neutral Colors',
    colors: [
      'neutral-0','neutral-50','neutral-100','neutral-200','neutral-300','neutral-400','neutral-500','neutral-600','neutral-700','neutral-800','neutral-900','neutral-999',
    ],
  },
  {
    label: 'Status Colors',
    colors: [
      // We'll handle these separately for rows
    ],
    isStatus: true,
  },
];

const statusRows = [
  {
    label: 'Success',
    colors: ['success-300','success-400','success-500','success-600','success-700'],
  },
  {
    label: 'Warning',
    colors: ['warning-300','warning-400','warning-500','warning-600','warning-700'],
  },
  {
    label: 'Error',
    colors: ['error-300','error-400','error-500','error-600','error-700'],
  },
];

const ColorSwatch = () => {
  return (
    <div className="color-swatch-container">
      {colorCategories.map(category => (
        category.isStatus ? (
          <div key={category.label} className="color-category">
            <Text variant="h3">{category.label}</Text>
            {statusRows.map(row => (
              <div className="swatch-row" key={row.label}>
                <Text variant="body2" className="swatch-row-label">{row.label}</Text>
                {row.colors.map(color => {
                  const value = getCssVarValue(color);
                  return (
                    <div key={color} className="swatch-cell">
                      <div className="swatch" style={{ background: `var(--${color})` }} />
                      <div className="swatch-info">
                        <Text variant="caption" className="swatch-label">--{color}</Text>
                        <Text variant="caption" className="swatch-value">{value}</Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div key={category.label} className="color-category">
            <Text variant="h3">{category.label}</Text>
            <div className="swatch-row">
              {category.colors.map(color => {
                const value = getCssVarValue(color);
                return (
                  <div key={color} className="swatch-cell">
                    <div className="swatch" style={{ background: `var(--${color})` }} />
                    <div className="swatch-info">
                      <Text variant="caption" className="swatch-label">--{color}</Text>
                      <Text variant="caption" className="swatch-value">{value}</Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ColorSwatch; 