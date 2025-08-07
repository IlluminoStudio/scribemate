import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import Chip from "./Chip";
import { X } from "phosphor-react";
import "../styles/Dropdown.css";

const Dropdown = ({
  testid = "dropdown",
  options,
  selected,
  onChange,
  placeholder,
  multiple = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    let newSelected;
    if (multiple) {
      newSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
    } else {
      newSelected = [option];
      setIsOpen(false);
    }
    onChange(newSelected);
  };

  const handleRemove = (item) => {
    const newSelected = selected.filter((i) => i !== item);
    onChange(newSelected);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const availableOptions = options.filter(opt => !selected.includes(opt));
  const showPlaceholder = selected.length === 0 && placeholder;

  return (
    <div data-testid={testid} className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-selected-list" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 &&
          selected.map((item) => (
            <Chip
              size="sm"
              key={item}
              label={item}
              variant="light"
              rightIcon={
                <X size={16} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }} />
              }
            />
          ))
        }
        {showPlaceholder && (
          <Text variant="body2" className="dropdown-placeholder">{placeholder}</Text>
        )}
        {!showPlaceholder && selected.length > 0 && !multiple && (
            <span style={{ flex: 1 }} />
        )}
        {!showPlaceholder && selected.length === 0 && (
             <span style={{ flex: 1 }} />
        )}
      </div>

      {isOpen && availableOptions.length > 0 && (
        <div className="dropdown-list">
          {availableOptions.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              <Text variant="body2">{option}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  testid: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
};

export default Dropdown; 