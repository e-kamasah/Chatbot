import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import './App.css'


function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);



   function saveInputText(event) {
       setInputText(event.target.value);
   }

   async function sendMessage() {
       if (isLoading || inputText === '') {
           return;
       }

       setIsLoading(true);

       setInputText('');

       const newChatMessages = [
       ...chatMessages,
       {
           message: inputText,
           sender: 'user',
           id: crypto.randomUUID()
       }
     ];

       
       setChatMessages([
           ...newChatMessages,
            {
           message: <img src="images/loading-spinner.gif" className="loading-spinner" />,
           sender: 'robot',
           id: crypto.randomUUID()
       }
   ]);

      
       const response = await Chatbot.getResponseAsync(inputText);
       setChatMessages([
       ...newChatMessages,
       {
           message: response,
           sender: 'robot',
           id: crypto.randomUUID()
       }
     ]);

     setIsLoading(false);


   }

   function handleKeyDown(event) {
    if (event.key === "Enter") {
       sendMessage();
    }else if (event.key === "Escape") {
       setInputText('')
    }
  }


   return (
       <div className="chat-input-container">
           <input 
               placeholder="Send a message to Chatbot" 
               size="30" 
               onChange={saveInputText}
               value={inputText}
               onKeyDown={handleKeyDown}
               className="chat-input"
           />
           <button
               onClick={sendMessage}
               className="send-button"
           >Send</button>    
        </div>
      
   );
}


function ChatMessage({ message, sender }) {
//const message = props.message;
//const sender = props.sender;
//const { message, sender } = props;
   

  /* if (sender === 'robot') {
       return (
           <div>
           <img src="images/robot.png" width="50" />
           {message}
       </div>   
       );
   }
   */

   return (
       <div className={
           sender === 'user'
           ? 'chat-message-user'
           : 'chat-message-robot'
       }>
           {sender === 'robot' && (
           <img src="images/robot.png" className="chat-message-profile" />
           )}
           <div className="chat-message-text">
           {message}
           </div>
           {sender === 'user' && (
           <img src="images/user.png" className="chat-message-profile" />
           )}
       </div>
       );
}


function ChatMessages({ chatMessages }) {
const chatMessagesRef = useRef(null);

useEffect(() => {
 const containerElem = chatMessagesRef.current;
 if (containerElem) {
   containerElem.scrollTop = containerElem.scrollHeight;
 }
}, [chatMessages]);

return (
 <div className="chat-messages-container" ref={chatMessagesRef}>
   {chatMessages.map((chatMessage) => {
     return (
       <ChatMessage
         message={chatMessage.message}
         sender={chatMessage.sender}
         key={chatMessage.id}
       />
     );
   })}
 </div>
);


}


function App() {
  //const chatMessages = array[0];
  //const setChatMessages = array[1];
  //const [chatMessages, setChatMessages] = array;
  const [chatMessages, setChatMessages] = useState([]);
  
  return (
<div className="app-container">
  {chatMessages.length === 0 && (
    <p className="welcome-message">
      Welcome to the chatbot project! Send a message using the textbox below.
    </p>
  )}
  <ChatMessages
    chatMessages={chatMessages}
  />
  <ChatInput
    chatMessages={chatMessages}
    setChatMessages={setChatMessages}
  />
</div>
);

}
export default App
