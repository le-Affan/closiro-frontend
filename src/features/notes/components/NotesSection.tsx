import React, { useState } from 'react';
import NoteIcon from '@mui/icons-material/Note';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

interface Note {
  id: string;
  text: string;
  completed: boolean;
}

export function NotesSection({ targetId }: { targetId: string }) {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', text: 'Mentioned interest in the Wrigleyville area', completed: false },
    { id: '2', text: 'Asks about seasonal promotions and bundles', completed: false },
  ]);

  const [isOpen, setIsOpen] = useState(true);

  const toggleNote = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n));
  };

  return (
    <div className="border-b border-neutral-100">
      <div 
        className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <NoteIcon sx={{ width: 16, height: 16 }} className="text-neutral-700" />
          <span className="text-[14px] font-semibold text-neutral-900">Notes</span>
        </div>
        <ExpandMoreIcon
          sx={{ width: 16, height: 16 }}
          className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          <div className="space-y-4">
            {notes.map(note => (
              <label key={note.id} className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative flex items-start pt-0.5">
                  <input 
                    type="checkbox" 
                    checked={note.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleNote(note.id);
                    }}
                    className="peer appearance-none w-[15px] h-[15px] border border-neutral-300 rounded-[3px] checked:bg-[#3B82F6] checked:border-[#3B82F6] transition-colors cursor-pointer" 
                  />
                  <CheckIcon
                    sx={{ width: 15, height: 15 }}
                    className="absolute pointer-events-none hidden peer-checked:block text-white p-[2px]"
                  />
                </div>
                <span className={`text-[13px] leading-tight ${note.completed ? "text-neutral-400 line-through" : "text-neutral-500"}`}>
                  {note.text}
                </span>
              </label>
            ))}
          </div>
          <button className="flex items-center space-x-2 text-[13px] text-[#3B82F6] hover:text-blue-600 font-medium mt-2">
            <AddIcon sx={{ width: 14, height: 14 }} />
            <span>Add note</span>
          </button>
        </div>
      )}
    </div>
  );
}
