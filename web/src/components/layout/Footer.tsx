const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 5.5 5.5 0 0 0-.1-3.5s-1.13-.36-3.5 1.25a12.8 12.8 0 0 0-6 0C6.13 2.76 5 3.12 5 3.12a5.5 5.5 0 0 0-.1 3.5A5.2 5.2 0 0 0 3.51 10c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="w-full py-10 text-center border-t border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-950 flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Built by{" "}
        <a 
          href="https://github.com/patrikbartas" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-neutral-900 dark:text-white font-medium hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 ml-1"
        >
          Patrik Bartas
          <GithubIcon className="w-3.5 h-3.5" />
        </a>
      </p>
      <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-2">
        Open-source smart gadget pre vyššiu bezpečnosť cyklistov.
      </div>
    </footer>
  );
};
