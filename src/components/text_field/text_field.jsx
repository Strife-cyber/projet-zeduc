import React from 'react';

const TextFieldComponent = ({ 
    inputType = 'text', 
    width = '200px', 
    height = '40px', 
    placeholder = 'Enter text', 
    value, // Accept value prop for controlled input
    onChange // Accept onChange prop to handle input changes from parent
}) => {
    return (
        <input
            type={inputType}
            value={value}
            onChange={onChange} // Use the onChange prop passed from the parent
            placeholder={placeholder}
            style={{
                width: width,
                height: height,
                padding: '10px',
                border: '2px solid #cfbd97',
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                fontFamily: 'Montaga, sans-serif',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
            }}
            className="flashing-input"
        />
    );
};

// Adding CSS for animations
const styles = `
@keyframes flash-border {
    0% {
        border-color: #cfbd97;
    }
    50% {
        border-color: black;
    }
    100% {
        border-color: #cfbd97;
    }
}

.flashing-input {
    animation: none;
}

.flashing-input:hover {
    animation: flash-border 1s infinite;  // Flash between #cfbd97 and black on hover
}

.flashing-input:focus {
    border-color: black;  // Solid black on focus
    animation: none;      // Stop the flashing when focused
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
}
`;

// Append the styles to the document's head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TextFieldComponent;
