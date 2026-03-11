import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Skills", "Certifications", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "MoneyList - DigiUp 2024",
    description: "Personalized money management application designed to help users track expenses and manage finances effectively.",
    tags: ["Figma", "UI/UX Design", "Mobile App"],
  },
  {
    id: 2,
    title: "Solivio - Techcomfort 2025",
    description: "Mental wellness app combining doctor chat, habit tracking, mood journaling, and gamification for emotional balance.",
    tags: ["UI/UX", "Figma", "Competition"],
  },
  {
    id: 3,
    title: "Perpusja - School Fullstack Project",
    description: "Digital library platform. Led UI/UX design and implemented responsive interface using Tailwind CSS.",
    tags: ["Tailwind CSS", "UI/UX Lead", "Full Stack"],
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
    icon: "📊"
  },
  {
    id: 2,
    title: "Designer Multimedia Muda",
    issuer: "Badan Nasional Sertifikasi Profesi",
    icon: "🎨"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    issuer: "PT Telkom Prima Cipta",
    icon: "✨"
  },
  {
    id: 4,
    title: "Samsung Innovation Campus Batch 6",
    issuer: "Hacktiv8",
    icon: "📱"
  }
];

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

export default function Portfolio() {
  const activeSection = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");

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
          
          {/* Desktop menu */}
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
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700 hover:text-orange-500 transition-colors"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        
        {/* Mobile menu */}
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

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-6">
                👋 Available for work
              </span>
              <h1 className="text-5xl md:text-6xl font-light leading-tight mb-4">
                Elian Malik<br />
                <span className="font-medium">Achmad Uluelang</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                UI/UX Designer & Full Stack Developer from Semarang, Indonesia. 
                I create simple, functional digital experiences.
              </p>
              <div className="flex gap-4">
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
          
          <div className="grid gap-6">
            {PROJECTS.map((project, i) => (
              <FadeInSection key={project.id} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
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
                <div className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow border border-orange-100">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{cert.icon}</span>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{cert.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{cert.issuer}</p>
                      {cert.score && (
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          {cert.score}
                        </span>
                      )}
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
            <a href="#" className="hover:text-orange-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-orange-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}