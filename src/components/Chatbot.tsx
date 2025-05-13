
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Bonjour ! Comment puis-je vous aider à trouver votre logement idéal à Douala ?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Je peux vous aider à trouver un logement dans les quartiers populaires de Douala.",
        "Avez-vous des préférences en termes de quartier ou de budget ?",
        "Nous avons plusieurs options disponibles à Akwa, Bonanjo et Bonapriso.",
        "N'hésitez pas à utiliser notre filtre de recherche pour affiner vos critères.",
        "Je suis là pour répondre à toutes vos questions sur la location à Douala !"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChatbot}
        className={cn(
          'fixed right-6 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform',
          'bg-gradient-to-r from-primary to-[#F9AA31]',
          'hover:scale-110'
        )}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-30 w-80 overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 md:w-96',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        {/* Chat header */}
        <div className="bg-gradient-to-r from-primary to-[#F9AA31] p-4">
          <h3 className="text-lg font-medium text-white">Assistant Locato</h3>
          <p className="text-sm text-white/80">Nous sommes là pour vous aider</p>
        </div>

        {/* Messages area */}
        <div className="h-80 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'mb-4 max-w-[85%] rounded-lg p-3',
                msg.isUser
                  ? 'ml-auto bg-primary/10 text-right'
                  : 'mr-auto bg-gray-100'
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
            <Button
              onClick={handleSend}
              className="rounded-full bg-primary hover:bg-primary-dark"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-90"
              >
                <path d="m5 12 14-9v18z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
