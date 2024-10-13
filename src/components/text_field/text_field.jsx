import React, { useState } from 'react';

const TextFieldComponent = ({ 
    inputType = 'text', 
    width = '200px', 
    height = '40px', 
    placeholder = 'Enter text', 
    value, // Accept value prop for controlled input
    onChange // Accept onChange prop to handle input changes from parent
}) => {
    const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result); // Set the image preview
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null); // Reset preview if no file is selected
        }
    };

    return (
        <div style={{ position: 'relative', width: width }}>
            <input
                type={inputType}
                value={value}
                onChange={onChange} // Use the onChange prop passed from the parent
                placeholder={placeholder}
                onInput={inputType === 'file' ? handleFileChange : undefined} // Add event for file input
                style={{
                    width: '100%', // Full width for the input
                    height: height,
                    padding: '10px',
                    border: '2px solid #cfbd97',
                    borderRadius: '5px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    fontFamily: 'Montaga, sans-serif',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    position: 'relative', // Position relative for image overlay
                }}
                className="flashing-input"
                accept={inputType === 'file' ? '.jpg,.jpeg' : undefined} // Accept jpg and jpeg files for file input
            />
            {imagePreview && (
                <img 
                    src={imagePreview} 
                    alt="Image Preview" 
                    style={{ 
                        position: 'absolute', // Position absolute for overlay
                        top: '60%', // Center vertically
                        left: '10px', // Padding from left
                        transform: 'translateY(-50%)', // Center the image vertically
                        maxWidth: '80%', // Limit width of the preview image
                        maxHeight: '80%', // Limit height of the preview image
                        borderRadius: '5px',
                        pointerEvents: 'none', // Prevent interaction with the image
                    }} 
                />
            )}
        </div>
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
