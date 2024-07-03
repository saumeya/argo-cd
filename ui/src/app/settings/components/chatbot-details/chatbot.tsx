import * as React from 'react';
import {Page} from '../../../shared/components';

require('./chatbot.scss');

export const ChatBot = () => {
    const [message, setMessage] = React.useState('');
    const [conversations, setConversations] = React.useState([]);

    const fetchData = async (e: any) => {
        e.preventDefault();
        console.log('functions');
        const body = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        };
        try {
            const response = await fetch('https://362d-106-51-168-70.ngrok-free.app/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            console.log(result);
            setConversations([...conversations, {message: message, response: result.choices[0].message.content}]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (event: any) => {
        event.preventDefault();
        setMessage(event.target.value);
    };

    return (
        <Page
            title={'Argo ChatBot'}
            toolbar={{
                breadcrumbs: [{title: 'Settings', path: '/settings'}, {title: 'ChatBot'}]
            }}>
            <div>
                <form className='form-container'>
                    <input type='text' value={message} onChange={handleInputChange} placeholder='Type your question' style={{width: '80%'}} />
                    <button className='submit-button' onClick={fetchData}>
                        Ask me
                    </button>
                </form>
                {conversations.map((conv, index) => (
                    <div key={index} className='chat-box'>
                        <div className='message'>
                            <strong>Message:</strong> {conv.message}
                        </div>
                        <div className='response'>
                            <strong>Response:</strong> {conv.response}
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    );
};