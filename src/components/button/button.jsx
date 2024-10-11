import React, { useState } from 'react';

const ButtonComponent = ({ 
    placeholder = 'Click Me', 
    onClickFunction, 
    width = '200px', 
    height = '50px' 
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            setError(false);

            await onClickFunction();  // Perform the passed function
        } catch (err) {
            setError(true);  // Handle error state
        } finally {
            setLoading(false);  // Reset loading state once done
        }
    };

    return (
        <div style={styles.container}>
            {!loading ? (
                <button
                    onClick={handleClick}
                    style={{
                        ...styles.button,
                        backgroundColor: error ? '#ff6666' : '#cfbd97', // Error color
                        width: width, // Set button width
                        height: height, // Set button height
                    }}
                    className="animated-button"
                >
                    {placeholder}
                </button>
            ) : (
                <div className="progress-indicator" style={styles.loader}></div>
            )}
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: 'inline-block',
        position: 'relative',
    },
    button: {
        color: '#fff',
        fontSize: '1rem',
        fontFamily: 'Montaga, sans-serif',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)', // Nice shadow
        transition: 'transform 0.3s ease',  // Transition for animation
    },
    loader: {
        border: '4px solid rgba(0, 0, 0, 0.1)',  // Background circle
        borderTop: '4px solid #cfbd97',  // Active part of the loader
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        animation: 'spin 1s linear infinite',
    },
};

// CSS for animations
const stylesCss = `
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.animated-button {
    position: relative;
    overflow: hidden;
}

.animated-button:before {
    content: '';
    position: absolute;
    width: 300%;
    height: 300%;
    top: 50%;
    left: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease-out;
}

.animated-button:hover:before {
    transform: translate(-50%, -50%) scale(1);
}

.animated-button:active {
    transform: scale(0.98);  // Button click effect
}
`;

// Injecting the CSS into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesCss;
document.head.appendChild(styleSheet);

export default ButtonComponent;
