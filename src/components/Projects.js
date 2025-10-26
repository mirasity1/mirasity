import { motion } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import { ExternalLink, Github, Eye, Calendar, Image, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackProjectView, trackExternalLink } from './GoogleAnalytics';
import LazyImage from './LazyImage';

// Lazy load ProjectGallery component
const ProjectGallery = lazy(() => import('./ProjectGallery'));

const Projects = () => {
  const { t, language } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const projects = (t.projects?.list || []).map((project, index) => ({
    id: index + 1,
    title: project.title || '',
    description: project.description || '',
    image: index === 0 ? `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format&q=80&fm=webp` : // BookTrack - books/library image
          index === 1 ? `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&auto=format&q=80&fm=webp` : // Portfolio - development/code image
          index === 2 ? `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&auto=format&q=80&fm=webp` : // Advcatia - Law/Legal system
          index === 3 ? require('../imgs/main.jpeg') : // Real Business Center local image
          index === 4 ? `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format&q=80&fm=webp` : // Real Vida Trip - Travel/Trip
          index === 5 ? require('../imgs/leads.png') : // Real Vida Seguros - leads image
          index === 6 ? `https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop&auto=format&q=80&fm=webp` : // Wein.plus - Wine/Restaurant
          index === 7 ? require('../imgs/hexsicor.jpg') : // Hexsicor local image (apenas imagem)
          `https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&auto=format&q=80&fm=webp`,
    video: index === 0 ? { 
      type: 'youtube', 
      id: 'bm0E1hvf12A',
      thumbnail: null,
      additionalVideos: [
        {
          type: 'youtube',
          id: 'JiblkDn6wgQ',
          title: 'Sistema de Badges - BookTrack'
        }
      ]
    } : // BookTrack - dois vídeos disponíveis
    index === 1 ? null : // Portfolio - sem vídeo
    index === 2 ? { 
      type: 'youtube', 
      id: 'JU3sQZHc9zQ',
      si: 'YJG-n3lND509uD-N',
      thumbnail: null
    } : // Advcatia
    index === 3 ? { 
      type: 'youtube', 
      id: 'AiA_qjZtYsc',
      thumbnail: null
    } : // Real Business Center
    index === 4 ? { 
      type: 'youtube', 
      id: 'P0zdVl4JOGo',
      thumbnail: null
    } : // Real Vida Trip
    index === 5 ? { 
      type: 'youtube', 
      id: 'sRxYCh0JULQ',
      thumbnail: null
    } : // Real Vida Seguros - Leads
    index === 6 ? null : // Wein.plus - sem vídeo
    index === 7 ? null : // Hexsicor sem vídeo (apenas imagem)
    null,
    technologies: [
      ["React", "Tailwind", "Strapi", "TypeScript", "Node.js", "SQLite"], // BookTrack
      ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "Vercel","RailWay"], // Portfolio
      ["React", "MySQL", "Tailwind"], // Advcatia
      ["React", "CMS","Strapi","Tailwind","Cron Jobs", "Bootstrap"], // Real Business Center
      ["React", "Strapi","Tailwind", "HTML", "Markdown", "CMS"], // Real Vida Trip
      ["React","Tailwind", "Strapi","Typescript","Python","PostgreSQL","HTML", "Markdown", "CMS", "Cron Jobs"], // Sistema de Leads - Real Vida Seguros
      ["Laravel", "PHP", "MySQL", "JavaScript", "Cron Jobs"], // Wein.plus
      ["Laravel", "PHP", "React", "TypeScript", "MySQL","Python"] // Hexsicor CRM
    ][index] || [],
    category: project.category || '',
    year: index === 0 ? "2024" : index === 1 ? "2025" : index === 7 ? "2022-2023" : "2024", // BookTrack: 2024, Portfolio: 2025, Hexsicor: 2022-2023, outros: 2024
    status: index === 0 ? (t.projects?.inProgress || 'In Progress') : (t.projects?.completed || 'Completed'), // Apenas BookTrack em desenvolvimento
    features: project.features || [],
    liveUrl: index === 0 ? null : // BookTrack - sem site público ainda
             index === 1 ? "https://mirasity.pt/" : // Portfolio - site público
             index === 2 ? "https://github.com/mirasity1/advcatia" : // Advcatia - link para GitHub
             index === 3 ? "https://realbusinesscenter.pt/" : // Real Business Center - site público
             index === 4 ? "https://mirasity.pt" : // Real Vida Trip - redireciona para portfolio
             index === 5 ? "https://mirasity.pt" : // Real Vida Seguros - redireciona para portfolio
             index === 6 ? "https://wein.plus/" : // Wein.plus - site público
             index === 7 ? "https://mirasity.pt" : // Hexsicor - redireciona para portfolio
             "https://mirasity.pt",
    githubUrl: index === 1 ? "https://github.com/mirasity1/mirasity" : // Portfolio público
               index === 2 ? "https://github.com/mirasity1/advcatia" : // Advcatia público
               null,
    isPublic: index === 1 || index === 2, // Portfolio e Advcatia são públicos
    isCodePrivate: !(index === 1 || index === 2), // Inverso do isPublic
    hasLiveUrl: index === 1 || index === 2 || index === 3 || index === 6, // Portfolio, Advcatia, Real Business Center, Wein.plus têm sites ativos
    color: [
      "from-amber-500 to-yellow-600", // BookTrack
      "from-teal-500 to-blue-500", // Portfolio
      "from-blue-500 to-cyan-500", // Advcatia
      "from-orange-500 to-red-500", // Real Business Center
      "from-green-500 to-emerald-500", // Real Vida Trip
      "from-purple-500 to-pink-500", // Real Vida Seguros - Leads
      "from-yellow-500 to-orange-500", // Wein.plus
      "from-indigo-500 to-purple-500" // Hexsicor
    ][index] || "from-blue-500 to-cyan-500"
  }));

  const [selectedProject, setSelectedProject] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const openGallery = (project) => {
    setSelectedProject(project);
    setShowGallery(true);
    trackProjectView(project.title, 'gallery_open');
  };

  const closeGallery = () => {
    setShowGallery(false);
    setSelectedProject(null);
    trackProjectView(selectedProject?.title || 'unknown', 'gallery_close');
  };

  const handleAskAboutProject = (projectTitle) => {
    // Scroll para o formulário de contacto
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Aguarda um pouco para o scroll terminar e depois preenche o formulário
      setTimeout(() => {
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (subjectField) {
          subjectField.value = `Questão sobre o projeto: ${projectTitle}`;
          subjectField.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        if (messageField) {
          messageField.value = `Olá! Gostaria de saber mais sobre o projeto "${projectTitle}". Pode partilhar mais detalhes sobre este projeto?`;
          messageField.dispatchEvent(new Event('input', { bubbles: true }));
          messageField.focus();
        }
      }, 1000);
    }
    
    // Track da ação
    trackProjectView(projectTitle, 'ask_about_project');
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-50 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.projects?.title || 'My'} <span className="text-blue-600">{t.projects?.subtitle || 'Projects'}</span>
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {t.projects?.description || 'A selection of projects I\'ve worked on'}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group touch-manipulation"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-40 md:h-48 cursor-pointer" onClick={() => {
                  openGallery(project);
                  trackProjectView(project.title, 'details_click');
                }}>
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Concluído' || project.status === 'Completed'
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {project.status}
                  </div>
                  
                  {/* Gallery indicator */}
                  <div className="absolute top-3 left-3 bg-black/50 text-white p-2 rounded-full opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <Image size={14} />
                  </div>
                  
                  {/* Hover overlay with buttons - Hidden on mobile, visible on tap */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(project);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-900 p-2.5 md:p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      <Eye size={16} className="md:w-5 md:h-5" />
                    </motion.button>
                    {project.hasLiveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackExternalLink(project.liveUrl, `${project.title} Live Site`, 'Projects');
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-gray-900 p-2.5 md:p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink size={16} className="md:w-5 md:h-5" />
                      </motion.a>
                    )}
                    {project.isPublic && project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackExternalLink(project.githubUrl, `${project.title} GitHub`, 'Projects');
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-gray-900 p-2.5 md:p-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300"
                      >
                        <Github size={16} className="md:w-5 md:h-5" />
                      </motion.a>
                    )}
                    {!project.isPublic && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-gray-400 text-white p-2.5 md:p-3 rounded-full cursor-not-allowed"
                        title="Projeto Privado"
                      >
                        <Lock size={16} className="md:w-5 md:h-5" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-white`}>
                      {project.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {project.year}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {(project.technologies || []).slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 md:px-2 md:py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 4 && (
                        <span className="px-2 py-1 md:px-2 md:py-1 bg-gray-200 text-gray-600 rounded-full text-xs md:text-sm">
                          +{(project.technologies || []).length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons for mobile */}
                  <div className="flex gap-2 mb-3 md:hidden">
                    <button
                      onClick={() => {
                        openGallery(project);
                        trackProjectView(project.title, 'view_details_button');
                      }}
                      className="flex-1 bg-blue-500 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2 touch-manipulation"
                    >
                      <Eye size={16} />
                      {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                    </button>
                    {project.hasLiveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalLink(project.liveUrl, `${project.title} Live Site`, 'Projects')}
                        className="bg-gray-100 text-gray-700 py-2.5 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center touch-manipulation"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.isPublic && project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalLink(project.githubUrl, `${project.title} GitHub`, 'Projects')}
                        className="bg-gray-100 text-gray-700 py-2.5 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center touch-manipulation"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>

                  {/* Project Features - Hidden on mobile for space */}
                  <div className="hidden md:block mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">{t.projects?.features || 'Features:'}</h4>
                    <ul className="space-y-1">
                      {(project.features || []).slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="text-blue-500 mr-2 text-xs">•</span>
                          {feature}
                        </li>
                      ))}
                      {(project.features || []).length > 3 && (
                        <li className="text-gray-500 text-xs">
                          +{(project.features || []).length - 3} {language === 'pt' ? 'mais recursos' : 'more features'}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    {project.hasLiveUrl ? (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalLink(project.liveUrl, `${project.title} Live Site`, 'Projects')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                      >
                        {t.projects?.viewProject || 'View Project'}
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={() => handleAskAboutProject(project.title)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                      >
                        {t.projects?.askMoreAbout || 'Ask me about this project'}
                      </motion.button>
                    )}
                    {project.isPublic && project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalLink(project.githubUrl, `${project.title} GitHub`, 'Projects')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 border border-gray-300 text-gray-700 text-center py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                      >
                        <Github size={16} className="mr-1" />
                        {t.projects?.code || 'Code'}
                      </motion.a>
                    )}
                    {!project.isPublic && (
                      <motion.div
                        className="flex-1 border border-gray-300 text-gray-400 text-center py-2 rounded-lg text-sm font-medium bg-gray-50 cursor-not-allowed flex items-center justify-center"
                        title="Código Privado"
                      >
                        <Lock size={16} className="mr-1" />
                        Código Privado
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-gray-600 mb-6">
              {t.projects?.callToAction || 'Interested in working together?'}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.projects?.startProject || 'Start Project'}
              <ExternalLink className="ml-2" size={16} />
            </motion.a>
          </motion.div>

          {/* Gallery Modal */}
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4">A carregar...</div>
          </div>}>
            <ProjectGallery 
              project={selectedProject}
              isOpen={showGallery}
              onClose={closeGallery}
            />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;