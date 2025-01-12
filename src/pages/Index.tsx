import { useState, useEffect, useRef } from "react";
import { BookOpen, Briefcase, Wrench, BarChart2, MessageSquare, Mail, Twitter, Facebook, MessageCircle, Linkedin, Instagram } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { translations } from "@/utils/translations";
import * as THREE from "three";

type Language = "EN" | "UA" | "NO";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  image: string;
}

const Index = () => {
  const [time, setTime] = useState(new Date());
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("EN");
  const avatarRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!avatarRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, avatarRef.current.clientWidth / avatarRef.current.clientHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    
    rendererRef.current.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);
    avatarRef.current.appendChild(rendererRef.current.domElement);

    // Add a simple sphere for testing
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const sphere = new THREE.Mesh(geometry, material);
    sceneRef.current.add(sphere);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 2);
    sceneRef.current.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    sceneRef.current.add(ambientLight);

    cameraRef.current.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && avatarRef.current) {
        avatarRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Handle cursor tracking for 3D avatar
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avatarRef.current && sceneRef.current && cameraRef.current) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = avatarRef.current.getBoundingClientRect();
        
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const angleX = (clientY - centerY) / 20;
        const angleY = (clientX - centerX) / 20;
        
        // Update camera or model rotation based on mouse position
        if (sceneRef.current.children[0]) {
          sceneRef.current.children[0].rotation.x = -angleX * 0.1;
          sceneRef.current.children[0].rotation.y = angleY * 0.1;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections: Section[] = [
    {
      id: "about",
      title: translations[currentLanguage].about,
      icon: <BookOpen className="w-8 h-8" />,
      content: translations[currentLanguage].aboutContent,
      image: "/images/about-bg.jpg"
    },
    {
      id: "projects",
      title: translations[currentLanguage].projects,
      icon: <Briefcase className="w-8 h-8" />,
      content: translations[currentLanguage].projectsContent,
      image: "/images/projects-bg.jpg"
    },
    {
      id: "services",
      title: translations[currentLanguage].services,
      icon: <Wrench className="w-8 h-8" />,
      content: translations[currentLanguage].servicesContent,
      image: "/images/services-bg.jpg"
    },
    {
      id: "skills",
      title: translations[currentLanguage].skills,
      icon: <BarChart2 className="w-8 h-8" />,
      content: translations[currentLanguage].skillsContent,
      image: "/images/skills-bg.jpg"
    },
    {
      id: "testimonials",
      title: translations[currentLanguage].testimonials,
      icon: <MessageSquare className="w-8 h-8" />,
      content: translations[currentLanguage].testimonialsContent,
      image: "/images/testimonials-bg.jpg"
    },
    {
      id: "contact",
      title: translations[currentLanguage].contact,
      icon: <Mail className="w-8 h-8" />,
      content: `
        <form action="mailto:info@vitalii.no" method="post" enctype="text/plain">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" class="w-full p-2 rounded bg-gray-800 border border-gray-700" required />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" class="w-full p-2 rounded bg-gray-800 border border-gray-700" required />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Message</label>
              <textarea name="message" rows="4" class="w-full p-2 rounded bg-gray-800 border border-gray-700" required></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </form>
      `,
      image: "/images/contact-bg.jpg"
    },
  ];

  const socialLinks = [
    { icon: <Twitter className="w-6 h-6" />, url: "https://twitter.com" },
    { icon: <Facebook className="w-6 h-6" />, url: "https://facebook.com" },
    { icon: <MessageCircle className="w-6 h-6" />, url: "https://t.me" }, // Using MessageCircle instead of Telegram
    { icon: <Instagram className="w-6 h-6" />, url: "https://instagram.com" },
    { icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      {/* 3D Avatar */}
      <div 
        ref={avatarRef} 
        className="fixed left-0 top-0 bottom-0 w-1/4 h-screen"
        style={{ perspective: '1000px' }}
      />

      <header className="fixed top-0 w-full bg-[#1a1a1a] p-4 z-50">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold">Vitalii Berbeha</h1>
          <h2 className="text-xl">{translations[currentLanguage].title}</h2>
          <p className="text-gray-400 mt-2 max-w-2xl text-center">
            {translations[currentLanguage].subtitle}
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setCurrentLanguage("NO")}
            className={`px-3 py-1 rounded ${
              currentLanguage === "NO" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            NO
          </button>
          <button
            onClick={() => setCurrentLanguage("EN")}
            className={`px-3 py-1 rounded ${
              currentLanguage === "EN" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setCurrentLanguage("UA")}
            className={`px-3 py-1 rounded ${
              currentLanguage === "UA" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            UA
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-40 mb-16 p-8">
        <div className="bento-grid">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bento-card group cursor-pointer"
              onClick={() => setOpenSection(section.id)}
            >
              <img src={section.image} alt={section.title} className="bento-card-image" />
              <div className="bento-card-content">
                {section.icon}
                <h2 className="text-xl font-semibold mt-4">{section.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#1a1a1a] p-4">
        <div className="flex justify-center items-center space-x-6">
          <p>{time.toLocaleTimeString()}</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Section Dialog */}
      {openSection && (
        <Dialog open={!!openSection} onOpenChange={() => setOpenSection(null)}>
          <DialogContent className="w-full max-w-4xl mx-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{sections.find((s) => s.id === openSection)?.title}</span>
                <button
                  onClick={() => setOpenSection(null)}
                  className="hover:text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4" dangerouslySetInnerHTML={{ 
              __html: sections.find((s) => s.id === openSection)?.content || '' 
            }} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;
