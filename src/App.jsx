import React, { useState, useEffect, useRef } from 'react';
import { MdFace } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
import UploadForm from './components/UploadForm'; // Import the UploadForm component
import './index.css';

const ChatDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [pdfUploaded, setPdfUploaded] = useState(false); // Add a state to track if a PDF is uploaded
  const bottomRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() && pdfUploaded) {
      setMessages((prevMessages) => [...prevMessages, { text: message, user: true }]);

      try {
        const response = await axios.post('https://pdfai-backend.onrender.com/', { question: message });

        if (response.data.answer) {
          console.log(response);
          setMessages((prevMessages) => [...prevMessages, { text: response.data.answer, user: false }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'Failed to get answer from the backend.', user: false }]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [...prevMessages, { text: `Error contacting backend: ${error.message}`, user: false }]);
      }

      setMessage('');
    }
    else if (!pdfUploaded) {
      alert("Upload PDF First");
    }
    else {
      alert("Enter Prompt")
    }


  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://pdfai-backend.onrender.com/upload', formData);

      if (response.status === 200) {
        setMessages((prevMessages) => [...prevMessages, { text: 'File uploaded successfully!', user: false }]);
        setPdfUploaded(true); // Set the state to true on successful upload
      } else {
        setMessages((prevMessages) => [...prevMessages, { text: 'File upload failed.', user: false }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Error uploading file.', user: false }]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex justify-center w-full h-screen py-5 bg-gray-50'>
      <div className="flex flex-col w-11/12 h-full overflow-hidden bg-white rounded-lg md:w-8/12 lg:w-6/12">
        <header className="flex items-center justify-between p-4 text-black">
          <div className="text-xl font-semibold">PDFPilot</div>
          <div className="flex items-center justify-center w-10 h-10">
            <MdFace className="w-5/6 text-2xl h-5/6" />
          </div>
        </header>
        <div className="flex-1 p-4 overflow-y-auto">
          <ScrollToBottom className="flex-1">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
                <span className={`inline-block max-w-lg break-words px-4 py-2 rounded-lg ${msg.user ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </ScrollToBottom>
        </div>
        <form className="flex p-4 space-x-2" onSubmit={handleSend}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
          <UploadForm onFileUpload={handleFileUpload} />
          <button
            type="submit"
            className="flex items-center justify-center px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiSend className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDashboard;
