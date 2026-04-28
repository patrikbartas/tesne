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

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
      <a 
        href="https://github.com/patrikbartas/tesne" 
        target="_blank" 
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-neutral-300/50 dark:border-neutral-700/50 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-sm transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-md text-sm font-medium text-neutral-800 dark:text-neutral-200"
      >
        <GithubIcon className="w-4 h-4" />
        <span>patrikbartas / tesne</span>
      </a>
    </header>
  );
};
