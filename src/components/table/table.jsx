import React, { useState, useEffect } from 'react';
import './table.css'; // Custom CSS styles

const TableComponent = ({ headers, data, showStatusLast }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check for screen size and adjust view
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // For screens ≤ 768px
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check screen size initially

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const reorderData = (row) => {
        const { Status, ...rest } = row; // Separate the "Status" from the rest
        return showStatusLast ? { ...rest, Status } : { ...row }; // Reorder based on the boolean
    };

    return (
        <div className="table-container">
            {isMobile ? (
                <div className="mobile-view">
                    {data.map((row, rowIndex) => {
                        const reorderedRow = reorderData(row); // Ensure "Status" is at the end if needed

                        return (
                            <div
                                key={rowIndex}
                                className="json-tree-item"
                                style={{ border: '2px solid black', fontFamily: 'Pacifico' }}
                            >
                                <div className="json-left">
                                    {Object.entries(reorderedRow).map(([key, value], keyIndex) => (
                                        <div key={keyIndex}>
                                            <strong>{key}:</strong> {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <table className="custom-table" style={{ fontFamily: 'Pacifico' }}>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => {
                            const reorderedRow = reorderData(row);
                            return (
                                <tr key={rowIndex}>
                                    {Object.values(reorderedRow).map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TableComponent;
