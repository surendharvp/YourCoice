import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Messaging: React.FC = () => {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Simulating API call to fetch conversations
    setTimeout(() => {
      setConversations([
        { id: 1, name: 'John Doe', lastMessage: 'Hey, are we still on for tomorrow?' },
        { id: 2, name: 'Jane Smith', lastMessage: 'Thanks for the great lesson!' },
        { id: 3, name: 'Mike Johnson', lastMessage: 'Can we reschedule our meeting?' },
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Simulating API call to fetch messages for the selected conversation
      setTimeout(() => {
        setMessages([
          { id: 1, sender: 'John Doe', content: 'Hey, are we still on for tomorrow?', timestamp: '10:30 AM' },
          { id: 2, sender: 'You', content: 'Yes, absolutely! Looking forward to it.', timestamp: '10:35 AM' },
          { id: 3, sender: 'John Doe', content: 'Great! See you then.', timestamp: '10:36 AM' },
        ]);
      }, 500);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      // Here you would typically make an API call to send the message
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      <div className="flex bg-gray-800 rounded-lg shadow-md overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="w-1/3 border-r border-gray-700 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 hover:bg-gray-700 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-gray-700' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <h3 className="font-semibold">{conversation.name}</h3>
              <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
            </div>
          ))}
        </div>
        <div className="w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === 'You' ? 'text-right' : ''}`}>
                    <p className={`inline-block rounded-lg p-2 max-w-xs ${msg.sender === 'You' ? 'bg-red-600' : 'bg-gray-700'}`}>
                      {msg.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-700">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 text-white p-2 rounded-r-lg hover:bg-red-700 transition duration-300"
                    onClick={handleSendMessage}
                  >
                    <Send />
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;