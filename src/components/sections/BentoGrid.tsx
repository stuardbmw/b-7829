import { BookOpen, Briefcase, Wrench, BarChart2, MessageSquare, Mail } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useRef } from "react";

interface Section {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  gradient: string;
  backgroundImage: string;
}

interface BentoGridProps {
  onSectionClick: (sectionId: string) => void;
  expandingCard: string | null;
}

const BentoGrid = ({ onSectionClick, expandingCard }: BentoGridProps) => {
  const { t } = useTranslations();
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const sections: Section[] = [
    {
      id: "1",
      titleKey: "section1.title",
      descriptionKey: "section1.description",
      icon: <BookOpen />,
      gradient: "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
      backgroundImage: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "2",
      titleKey: "section2.title",
      descriptionKey: "section2.description",
      icon: <Briefcase />,
      gradient: "linear-gradient(135deg, rgba(255, 154, 158, 0.8) 0%, rgba(250, 208, 196, 0.8) 100%)",
      backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "3",
      titleKey: "section3.title",
      descriptionKey: "section3.description",
      icon: <Wrench />,
      gradient: "linear-gradient(135deg, rgba(246, 211, 101, 0.8) 0%, rgba(253, 160, 133, 0.8) 100%)",
      backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "4",
      titleKey: "section4.title",
      descriptionKey: "section4.description",
      icon: <BarChart2 />,
      gradient: "linear-gradient(135deg, rgba(161, 140, 209, 0.8) 0%, rgba(251, 194, 235, 0.8) 100%)",
      backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "5",
      titleKey: "section5.title",
      descriptionKey: "section5.description",
      icon: <MessageSquare />,
      gradient: "linear-gradient(135deg, rgba(255, 236, 210, 0.8) 0%, rgba(252, 182, 159, 0.8) 100%)",
      backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "6",
      titleKey: "section6.title",
      descriptionKey: "section6.description",
      icon: <Mail />,
      gradient: "linear-gradient(135deg, rgba(137, 247, 254, 0.8) 0%, rgba(102, 166, 255, 0.8) 100%)",
      backgroundImage: "https://images.unsplash.com/photo-1512626120412-faf41adb4874?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const handleCardClick = async (sectionId: string, index: number) => {
    const clickedCard = cardRefs.current.get(sectionId);
    if (!clickedCard) return;

    cardRefs.current.forEach((card, id) => {
      if (id !== sectionId) {
        card.style.animation = 'fadeOut 0.5s ease-out forwards';
        card.style.opacity = '0';
      }
    });

    clickedCard.style.animation = 'expandCard 0.8s ease-out forwards';
    
    await new Promise(resolve => setTimeout(resolve, 800));
    onSectionClick(sectionId);
  };

  useEffect(() => {
    if (!expandingCard) {
      cardRefs.current.forEach(card => {
        card.style.animation = '';
        card.style.opacity = '1';
        card.style.transform = '';
      });
    }
  }, [expandingCard]);

  return (
    <div className="grid grid-cols-3 gap-12 w-[90vw] max-w-7xl mx-auto min-h-[60vh] mt-[10vh] mb-[10vh] p-8">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={el => el && cardRefs.current.set(section.id, el)}
          className="relative overflow-hidden rounded-[2rem] aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-gray-800/20 shadow-xl bg-card/50"
          onClick={() => handleCardClick(section.id, index)}
          style={{
            backgroundImage: `url(${section.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div 
            className="absolute inset-0 backdrop-blur-[2px]" 
            style={{ 
              background: section.gradient,
            }} 
          />
          <div className="relative h-full p-8 flex flex-col items-center justify-center text-white">
            <div className="mb-6 transform transition-transform group-hover:scale-110 bg-white/20 p-4 rounded-full">
              {section.icon}
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              {t(section.titleKey)}
            </h2>
            <p className="text-sm text-center text-white/90">
              {t(section.descriptionKey)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;
