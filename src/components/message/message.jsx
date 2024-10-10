import React, { useEffect } from 'react';

const MessageComponent = ({ message, type }) => {
    useEffect(() => {
        if (message) {
            alert(`${type === 'success' ? 'Success: ' : 'Error: '} ${message}`);
        }
    }, [message, type]);

    return null; // No need to render anything in the UI
};

export default MessageComponent;
