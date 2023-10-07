const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto mt-auto lg:w-2/3 p-5 text-justify lg:text-left gap-4">
      <a
        href="https://github.com/wbydc/go-wschat"
        className="font-bold text-zinc-400 hover:text-indigo-400 pr-4"
      >
        GitHub repo
      </a>
      <a
        href="https://linkedin.com/in/wbydc"
        className="font-bold text-zinc-400 hover:text-indigo-400"
      >
        LinkedIn
      </a>
    </footer>
  );
};

export default Footer;
