import React from 'react';
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  
  return (
    <label className="filtercheckbox">
      <input type="checkbox" className="filtercheckbox__button"
          onChange={props.onFilter}
          checked={props.isShortMovie}>
      </input>
      <span className="filter-checkbox__checkbox"></span>
      <p className="filtercheckbox__text">
        Короткометражки
      </p>
    </label>
  );
}

export default FilterCheckbox;