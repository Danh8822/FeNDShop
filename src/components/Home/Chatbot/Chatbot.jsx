import React, { useState } from 'react';
import './Chatbot.css';
import chatbot from '../../Assets/chatbox-icon.svg';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const onSendButton = () => {
        if (inputText.trim() === '') return;

        const userMessage = { name: 'User', message: inputText };
        setMessages(prevMessages => [userMessage, ...prevMessages]); // Sử dụng callback để cập nhật state
        setInputText('');

        // fetch('http://127.0.0.1:5000/predict',
        // fetch('https://chatbotndshop.onrender.com/predict'
        fetch('https://chatbotndshop.onrender.com/predict', {
            method: 'POST',
            body: JSON.stringify({ message: inputText }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const botMessage = { name: 'Danh', message: data.answer };
                setMessages(prevMessages => [botMessage, ...prevMessages]);
            })
            .catch(error => console.error('Error:', error));

    };

    const onClickChatbotButton = () => {
        const chatbox = document.querySelector('.chatbox__support');
        chatbox.classList.toggle('chatbox--active');
    };

    return (
        <div className="container">
            <div className="chatbox">
                <div className="chatbox__support">
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                        </div>
                        <div className="chatbox__content--header">
                            <h4 className="chatbox__heading--header">Chat support</h4>
                            <p className="chatbox__description--header">Hi. My name is Danh. How can I help you?</p>
                        </div>
                    </div>
                    <div className="chatbox__messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`messages__item ${msg.name === 'Danh' ? 'messages__item--visitor' : 'messages__item--operator'}`}>
                                {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="chatbox__footer">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            onKeyUp={e => { if (e.key === 'Enter') onSendButton(); }}
                        />
                        <button className="chatbox__send--footer send__button" onClick={onSendButton}>Send</button>
                    </div>
                </div>
                <div className="chatbox__button">
                    <button onClick={onClickChatbotButton}><img src={chatbot} alt="Chat" /></button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
