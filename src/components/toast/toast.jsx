import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './toast.css'; // Your custom styles

const ToastComponent = ({ message, activate }) => {
  useEffect(() => {
    if (activate && message) {
      toast(message, {
        className: 'montaga-font', // Apply custom class here
        style: {backgroundColor: '#cfbd97', color: 'white'}
      });
    }
  }, [activate, message]);

  return <ToastContainer />;
};

export default ToastComponent;
