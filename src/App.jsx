import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Skills", "Certifications", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "MoneyList - DigiUp 2024",
    description: "Personalized money management application designed to help users track expenses and manage finances effectively.",
    tags: ["Figma", "UI/UX Design", "Mobile App"],
    image: "/assets/projects/moneylist.jpg"
  },
  {
    id: 2,
    title: "Solivio - Techcomfort 2025",
    description: "Mental wellness app combining doctor chat, habit tracking, mood journaling, and gamification for emotional balance.",
    tags: ["UI/UX", "Figma", "Competition"],
    image: "/assets/projects/solivio.jpg"
  },
  {
    id: 3,
    title: "MoneyList v2 - Kids Hackathon 2025",
    description: "Fullstack web application for small businesses with inventory tracking. Built with ReactJS and Firebase, featuring secure authentication and real-time inventory management.",
    tags: ["ReactJS", "Firebase", "Full Stack", "Inventory Management"],
    image: "/assets/projects/moneylistv2.jpg"
  },
];

const SKILLS = {
  technical: ["UI/UX Design", "Front-end Development", "Back-end Development", "Mobile Design", "Web Design"],
  languages: ["Tailwind CSS", "JavaScript", "ReactJS", "NodeJS"],
  soft: ["Teamwork", "Creativity", "Flexibility", "Problem Solving"],
  other: ["English", "Indonesian"]
};

const CERTIFICATIONS = [
  {
    id: 1,
    title: "TOEIC Listening and Reading",
    issuer: "Official Score Certificate",
    score: "Score 940",
    image: "/assets/certifications/toeic.jpg",
    icon: "📊"
  },
  {
    id: 2,
    title: "Designer Multimedia Muda",
    issuer: "Badan Nasional Sertifikasi Profesi",
    image: "/assets/certifications/multimedia.jpg",
    icon: "🎨"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    issuer: "PT Telkom Prima Cipta",
    image: "/assets/certifications/uiux.jpg",
    icon: "✨"
  },
  {
    id: 4,
    title: "Samsung Innovation Campus Batch 6",
    issuer: "Hacktiv8",
    image: "/assets/certifications/samsung.jpg",
    icon: "📱"
  }
];

const PLACEHOLDER_PROFILE = "https://placehold.co/200x200?text=Elian";
const PLACEHOLDER_CERT = "https://placehold.co/300x150?text=Certificate";
const PLACEHOLDER_PROJECT = "https://placehold.co/600x400?text=Project+Screenshot";

const useScrollPosition = () => {
  const [activeSection, setActiveSection] = useState("About");
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (const section of NAV_LINKS) {
        const element = document.getElementById(section.toLowerCase());
        if (element && scrollY >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return activeSection;
};

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Image Modal Component
const ImageModal = ({ isOpen, onClose, imageSrc, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-orange-400 text-3xl z-10"
        >
          ×
        </button>
        
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_PROJECT;
          }}
        />
        
        <p className="text-white text-center mt-4">{title}</p>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const activeSection = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  const openModal = (imageSrc, title) => {
    setSelectedImage({ src: imageSrc, title });
    setModalOpen(true);
  };

  return (
    <div className="font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center h-16">
          <button 
            onClick={() => scrollTo("about")} 
            className="text-xl font-medium hover:text-orange-500 transition-colors"
          >
            Elian<span className="text-orange-400">.</span>
          </button>
          
          <div className="hidden md:flex gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`text-sm transition-colors ${
                  activeSection === link 
                    ? "text-orange-500 font-medium" 
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700 hover:text-orange-500 transition-colors"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="block w-full text-left py-2 text-gray-700 hover:text-orange-500 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Image Modal */}
      <ImageModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={selectedImage?.src}
        title={selectedImage?.title}
      />

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-orange-200 shadow-lg flex-shrink-0">
                <img 
                  src="/assets/profile/elian.jpg"
                  alt="Elian Malik Achmad Uluelang"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_PROFILE;
                  }}
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-6">
                  👋 Available for work
                </span>
                <h1 className="text-5xl md:text-6xl font-light leading-tight mb-4">
                  Elian Malik<br />
                  <span className="font-medium text-orange-500">Achmad Uluelang</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  UI/UX Designer & Full Stack Developer from Semarang, Indonesia. 
                  I create simple, functional digital experiences.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => scrollTo("projects")} 
                    className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
                  >
                    View work →
                  </button>
                  <button 
                    onClick={() => scrollTo("contact")} 
                    className="px-8 py-3 border border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors font-medium"
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-light mb-12">
              Selected <span className="font-medium text-orange-500">projects</span>
            </h2>
          </FadeInSection>
          
          <div className="grid gap-8">
            {PROJECTS.map((project, i) => (
              <FadeInSection key={project.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                  {/* Project Image */}
                  <div 
                    className="relative h-64 cursor-pointer group"
                    onClick={() => openModal(project.image, project.title)}
                  >
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PLACEHOLDER_PROJECT;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="text-white bg-black/70 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-light mb-12">
              Skills & <span className="font-medium text-orange-500">tools</span>
            </h2>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInSection delay={0.1}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.technical.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.languages.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.soft.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.other.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 bg-orange-50">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-light mb-12">
              <span className="font-medium text-orange-500">Certifications</span>
            </h2>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <FadeInSection key={cert.id} delay={i * 0.1}>
                <div 
                  className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow border border-orange-100 cursor-pointer group"
                  onClick={() => openModal(cert.image, cert.title)}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{cert.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1 group-hover:text-orange-500 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{cert.issuer}</p>
                      {cert.score && (
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          {cert.score}
                        </span>
                      )}
                      
                      {/* Certificate Thumbnail */}
                      <div className="mt-4 relative h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={cert.image}
                          alt={`${cert.title} certificate`}
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = PLACEHOLDER_CERT;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to enlarge
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
              Get in <span className="font-medium text-orange-500">touch</span>
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Have a project in mind? Let's work together.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            {formStatus === "success" ? (
              <div className="text-center p-8 bg-orange-50 rounded-2xl">
                <p className="text-2xl mb-2">✓</p>
                <p className="text-lg font-medium mb-1">Message sent!</p>
                <p className="text-gray-600">Thanks for reaching out. I'll reply soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                    required
                  />
                </div>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                  required
                />
                <div className="text-center">
                  <button 
                    type="submit" 
                    className="px-10 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
                  >
                    Send message →
                  </button>
                </div>
              </form>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <span>© 2025 Elian Malik Achmad Uluelang</span>
          <div className="flex gap-6">
            <a href="https://github.com/Nakagi123" className="hover:text-orange-500 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/elian-malik-achmad-uluelang/" className="hover:text-orange-500 transition-colors">LinkedIn</a>
            <a href="mailto:elianstemba2610@gmail.com" className="hover:text-orange-500 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}