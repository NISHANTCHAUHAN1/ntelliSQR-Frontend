export default function Footer() {
  return (
    <footer className="py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center ">
          <p className="text-sm text-gray-600">
            Built by{" "}
            <a
              href="https://nishh3.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-400 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              Nishant
              <span className="text-red-500">🤍</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}