import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';

interface ChatComposerProps {
  onSendMessage: (text: string) => void;
  placeholder?: string;
}

export function ChatComposer({ onSendMessage, placeholder = "New message..." }: ChatComposerProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-5 py-3 flex items-center space-x-2 bg-white mt-auto border-t border-neutral-100">
      <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors shrink-0">
        <AttachFileIcon sx={{ width: 22, height: 22 }} className="transform -rotate-45" />
      </button>
      
      <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors shrink-0">
        <SentimentSatisfiedAltIcon sx={{ width: 22, height: 22 }} />
      </button>

      <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors shrink-0 mr-1">
        <MessageIcon sx={{ width: 22, height: 22 }} />
      </button>

      <div className="flex-1 px-1">
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-9 px-4 rounded-[6px] border border-neutral-300 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-neutral-400"
        />
      </div>

      <button 
        onClick={handleSend}
        disabled={!text.trim()}
        className="p-2 text-[#3B82F6] hover:text-blue-700 transition-colors disabled:text-neutral-300 shrink-0 ml-1"
      >
        <SendIcon sx={{ width: 20, height: 20 }} />
      </button>
    </div>
  );
}
