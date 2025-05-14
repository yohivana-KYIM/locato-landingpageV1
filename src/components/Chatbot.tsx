import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types de messages et réponses
type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

type BotResponse = {
  pattern: RegExp;
  response: string | ((input: string) => string);
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Bonjour ! Je suis l'assistant Locato. Comment puis-je vous aider à trouver votre logement idéal à Douala ?", 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Patterns de reconnaissance et réponses
  const botResponses: BotResponse[] = [
    {
      pattern: /^bonjour|salut|hello|hi$/i,
      response: "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
    },
    {
      pattern: /^merci|thanks/i,
      response: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions."
    },
    {
      pattern: /^au revoir|bye|goodbye/i,
      response: "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions."
    },
    {
      pattern: /(prix|cout|tarif|budget)/i,
      response: "Nos logements sont disponibles dans différentes gammes de prix, allant de 50 000 FCFA à 500 000 FCFA par mois. Quel est votre budget approximatif ?"
    },
    {
      pattern: /(quartier|zone|secteur)/i,
      response: "Nous avons des logements dans plusieurs quartiers de Douala : Akwa, Bonanjo, Bonapriso, Deido, Bali, Makepe. Avez-vous une préférence ?"
    },
    {
      pattern: /(visite|voir|rendez-vous)/i,
      response: "Je peux vous aider à organiser une visite. Dans quel quartier souhaitez-vous visiter un logement ?"
    },
    {
      pattern: /(disponible|disponibilité)/i,
      response: "La plupart de nos logements sont disponibles immédiatement. Souhaitez-vous voir les biens disponibles dans un quartier particulier ?"
    },
    {
      pattern: /(appartement|studio|villa|maison)/i,
      response: (input) => {
        const type = input.toLowerCase().includes('appartement') ? 'appartement' :
                    input.toLowerCase().includes('studio') ? 'studio' :
                    input.toLowerCase().includes('villa') ? 'villa' : 'maison';
        return `Nous avons plusieurs ${type}s disponibles. Souhaitez-vous voir nos offres en ${type} ?`;
      }
    },
    {
      pattern: /(aide|help|sos)/i,
      response: "Je peux vous aider à :\n- Trouver un logement selon vos critères\n- Organiser une visite\n- Répondre à vos questions sur les quartiers\n- Vous informer sur les prix\nQue souhaitez-vous faire ?"
    }
  ];

  // Fonction pour obtenir une réponse du bot
  const getBotResponse = (userInput: string): string => {
    // Recherche d'une correspondance dans les patterns
    for (const { pattern, response } of botResponses) {
      if (pattern.test(userInput)) {
        return typeof response === 'function' ? response(userInput) : response;
      }
    }

    // Réponses par défaut si aucun pattern ne correspond
    const defaultResponses = [
      "Je comprends votre demande. Pouvez-vous me donner plus de détails ?",
      "Je peux vous aider à trouver un logement selon vos critères. Que recherchez-vous exactement ?",
      "Pour mieux vous aider, pourriez-vous préciser votre demande ?",
      "Je suis là pour vous aider à trouver le logement idéal. Quels sont vos critères principaux ?"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const validateMessage = (message: string): boolean => {
    if (message.trim().length === 0) {
      setError("Le message ne peut pas être vide");
      return false;
    }
    if (message.length > 500) {
      setError("Le message ne peut pas dépasser 500 caractères");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    
    if (!validateMessage(trimmedInput)) {
      return;
    }

    try {
      setIsSending(true);
      
      // Ajouter le message de l'utilisateur
      const userMessage: Message = {
        text: trimmedInput,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Simuler le temps de réponse du bot
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse: Message = {
        text: getBotResponse(userMessage.text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      setError("Une erreur s'est produite lors de l'envoi du message");
    } finally {
      setIsSending(false);
      // Focus sur l'input après l'envoi
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-scroll vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus sur l'input quand le chat est ouvert
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Bouton du chat */}
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

      {/* Fenêtre de chat */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-30 w-80 overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 md:w-96',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        {/* En-tête du chat */}
        <div className="bg-gradient-to-r from-primary to-[#F9AA31] p-4">
          <h3 className="text-lg font-medium text-white">Assistant Locato</h3>
          <p className="text-sm text-white/80">Nous sommes là pour vous aider</p>
        </div>

        {/* Zone des messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col max-w-[85%]',
                msg.isUser ? 'ml-auto' : 'mr-auto'
              )}
            >
              <div
                className={cn(
                  'rounded-lg p-3',
                  msg.isUser
                    ? 'bg-primary/10 text-right'
                    : 'bg-gray-100'
                )}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="border-t p-4">
          {error && (
            <div className="mb-2 text-sm text-red-500">
              {error}
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              className={cn(
                "flex-1 rounded-full border px-4 py-2 focus:outline-none",
                error ? "border-red-500" : "border-gray-300 focus:border-primary",
                isSending && "opacity-50 cursor-not-allowed"
              )}
              disabled={isSending}
              maxLength={500}
            />
            <Button
              onClick={handleSend}
              className={cn(
                "rounded-full bg-primary hover:bg-primary-dark",
                isSending && "opacity-50 cursor-not-allowed"
              )}
              size="icon"
              disabled={isSending}
            >
              {isSending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <div className="mt-1 text-xs text-gray-500 text-right">
            {input.length}/500 caractères
          </div>
        </div>
      </div>
    </>
  );
};
