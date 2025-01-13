import { Language, useTranslations } from "@/hooks/useTranslations";

const Header = () => {
  const { t, currentLanguage, setCurrentLanguage } = useTranslations();

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[22.2vh] px-6 md:px-10 lg:px-12 mb-8">
      <div className="h-full w-full max-w-6xl mx-auto">
        <div 
          className="relative h-full w-full overflow-hidden rounded-2xl border border-gray-800/20 shadow-xl bg-card/50"
          style={{
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="absolute inset-0 backdrop-blur-[2px]" />
          
          <div className="relative h-full flex flex-col md:flex-row items-center justify-between px-8 py-6 md:px-12 md:py-8">
            <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                Vitalii Berbeha
              </h1>
              <h2 className="text-sm md:text-base lg:text-lg text-white/90">
                Marketing and Analytics Expert | Creator of Elvarika
              </h2>
              <p className="text-xs md:text-sm lg:text-base text-white/80 max-w-2xl">
                I help implement innovations and develop business solutions by combining marketing, analytics and modern technologies
              </p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              {["NO", "EN", "UA"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang as Language)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    currentLanguage === lang
                      ? "bg-white/20 text-white"
                      : "bg-black/20 hover:bg-black/40 text-white/80"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;