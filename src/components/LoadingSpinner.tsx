
export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
          <img 
            src="/lovable-uploads/f57da0a1-0095-4f23-b813-cfc3e39f8403.png" 
            alt="Locato Logo" 
            className="h-16 w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Chargement...</p>
      </div>
    </div>
  );
}
