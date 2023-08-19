import React from 'react';
import './card.css';

const Card = ({ title, info, footer, id, onClick }) => {

  /* if any of the props are type of array, convert them to string */
  if (Array.isArray(title)) {
    title = title.join(', ');
  }
  if (Array.isArray(info)) {
    info = info.join(', ');
  }
  if (Array.isArray(footer)) {
    footer = footer.join(', ');
  }

  

  const handleCardClick = () => {
    onClick(id);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-content">
        <h5 className="card-title">{title}</h5>
        <p className="card-info">{info}</p>
        <p className="card-footer">{footer}</p>
      </div>
    </div>
  );
};

export default Card;
