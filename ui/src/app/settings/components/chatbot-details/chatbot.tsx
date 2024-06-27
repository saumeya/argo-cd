import * as React from 'react';
import { Page} from '../../../shared/components';
// import {services} from '../../../shared/services';
// import axios from 'axios';

require('./chatbot.scss');

export const ChatBot = () => {

  const [message, setMessage] = React.useState('');
  const [conversations, setConversations] = React.useState([]);

  const handleSubmit =  (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
      fetch('http://localhost:5000/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message}),
      })
      .then(response => {
        setConversations([...conversations, { message: message, response: response.json() }]);
        setMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      })
      
  };
    return (
        <Page
            title={'Argo ChatBot'}
            toolbar={{
                breadcrumbs: [{title: 'Settings', path: '/settings'}, {title: 'ChatBot'}]
            }}>
            {/* <DataLoader load={() => services.viewPreferences.getPreferences()}>
                {pref => (
                    <div className='appearance-list'>
                        <div className='argo-container'>
                            <div className='appearance-list__panel'>
                                <div className='columns'>Dark Theme</div>
                                <div className='columns'>
                                    <button
                                        className='argo-button argo-button--base appearance-list__button'
                                        onClick={() => {
                                            const targetTheme = pref.theme === 'light' ? 'dark' : 'light';
                                            services.viewPreferences.updatePreferences({theme: targetTheme});
                                        }}>
                                        {pref.theme === 'light' ? 'Enable' : 'Disable'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DataLoader> */}
            <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send Message</button>
      </form>
      {conversations.map((conv, index) => (
        <div key={index} className="chat-box">
          <div className="message"><strong>Message:</strong> {conv.message}</div>
          <div className="response"><strong>Response:</strong> {conv.response}</div>
        </div>
      ))}
    </div>
        </Page>
    );
};
