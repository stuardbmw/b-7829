import { BookOpen, Briefcase, Wrench, BarChart2, MessageSquare, Mail } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useRef } from "react";

interface Section {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  gradient: string;
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
      id: "about",
      titleKey: "about_title",
      descriptionKey: "about_content",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "linear-gradient(225deg, rgba(255,226,159,0.1) 0%, rgba(255,169,159,0.1) 48%, rgba(255,113,154,0.1) 100%)"
    },
    {
      id: "services",
      titleKey: "services_title",
      descriptionKey: "services_content",
      icon: <Wrench className="w-8 h-8" />,
      gradient: "linear-gradient(90deg, rgba(255,200,169,0.1) 0%, rgba(236,106,140,0.1) 100%)"
    },
    {
      id: "skills",
      titleKey: "skills_title",
      descriptionKey: "skills_content",
      icon: <BarChart2 className="w-8 h-8" />,
      gradient: "linear-gradient(102.3deg, rgba(147,39,143,0.1) 5.9%, rgba(234,172,232,0.1) 64%)"
    },
    {
      id: "projects",
      titleKey: "projects_title",
      descriptionKey: "projects_content",
      icon: <Briefcase className="w-8 h-8" />,
      gradient: "linear-gradient(90deg, rgba(157,178,217,0.1) 0%, rgba(24,54,126,0.1) 100%)"
    },
    {
      id: "testimonials",
      titleKey: "testimonials_title",
      descriptionKey: "testimonials_content",
      icon: <MessageSquare className="w-8 h-8" />,
      gradient: "linear-gradient(90deg, rgba(136,219,159,0.1) 0%, rgba(229,236,121,0.1) 100%)"
    },
    {
      id: "contact",
      titleKey: "contact_title",
      descriptionKey: "contact_content",
      icon: <Mail className="w-8 h-8" />,
      gradient: "linear-gradient(90deg, rgba(252,180,103,0.1) 0%, rgba(247,129,129,0.1) 100%)"
    }
  ];

  const handleCardClick = async (sectionId: string, index: number) => {
    const clickedCard = cardRefs.current.get(sectionId);
    if (!clickedCard) return;

    clickedCard.classList.add('snake-animation');
    
    const cards = Array.from(cardRefs.current.values());
    const positions = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    });

    const snakeOrder = [0, 1, 2, 5, 4, 3];
    
    for (const orderIndex of snakeOrder) {
      if (orderIndex === index) continue;
      
      const pos = positions[orderIndex];
      const startPos = positions[index];
      clickedCard.style.transform = `translate(${pos.x - startPos.x}px, ${pos.y - startPos.y}px)`;
      cards[orderIndex].classList.add('eaten');
      
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    clickedCard.style.transform = 'translate(0, 0)';
    await new Promise(resolve => setTimeout(resolve, 400));

    onSectionClick(sectionId);
  };

  useEffect(() => {
    if (!expandingCard) {
      cardRefs.current.forEach(card => {
        card.classList.remove('snake-animation', 'snake-expanded', 'eaten');
        card.style.transform = '';
      });
    }
  }, [expandingCard]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[80vw] mx-auto h-[calc(100vh-40vh)] mt-[20vh] mb-[20vh]">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={el => el && cardRefs.current.set(section.id, el)}
          className="relative overflow-hidden rounded-[2rem] aspect-square cursor-pointer transform transition-transform duration-300 hover:scale-105"
          onClick={() => handleCardClick(section.id, index)}
          style={{
            background: section.gradient,
          }}
        >
          <div className="absolute inset-0 bg-black/90" />
          <div className="relative h-full p-6 flex flex-col items-center justify-center text-white">
            <div className="mb-4">
              {section.icon}
            </div>
            <h2 className="text-2xl font-bold text-center">
              {t(section.titleKey)}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;
