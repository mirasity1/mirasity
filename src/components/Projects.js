import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Eye, Calendar, Image, Lock, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from './GoogleAnalytics';
import ProjectGallery from './ProjectGallery';

const Projects = () => {
  const { t } = useLanguage();
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
    image: index === 0 ? `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop` : // Law/Legal system - Advcatia
          index === 1 ? require('../imgs/leads.png') : // Real Vida Seguros - leads image
          index === 2 ? `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop` : // Travel/Trip - Real Vida Trip
          index === 3 ? `https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&h=400&fit=crop` : // Wine/Restaurant - Wein.plus
          index === 4 ? require('../imgs/main.jpeg') : // Real Business Center local image
          index === 5 ? require('../imgs/hexsicor.jpg') : // Hexsicor local image (apenas imagem)
          `https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop`,
    video: index === 0 ? { 
      type: 'youtube', 
      id: 'JU3sQZHc9zQ',
      si: 'YJG-n3lND509uD-N',
      thumbnail: null
    } : 
    index === 1 ? { 
      type: 'youtube', 
      id: 'sRxYCh0JULQ',
      thumbnail: null
    } : 
    index === 2 ? { 
      type: 'youtube', 
      id: 'P0zdVl4JOGo',
      thumbnail: null
    } : 
    index === 3 ? null : // Wein.plus - sem vídeo
    index === 4 ? { 
      type: 'youtube', 
      id: 'AiA_qjZtYsc',
      thumbnail: null
    } : null, // Hexsicor sem vídeo (apenas imagem)
    technologies: [
      ["React", "Laravel", "PHP", "MySQL", "Bootstrap"], // Advcatia
      ["React", "Strapi", "HTML", "Markdown", "CMS"], // Sistema de Leads - Real Vida Seguros
      ["React", "Strapi", "HTML", "Markdown", "CMS"], // Real Vida Trip
      ["Laravel", "PHP", "MySQL", "JavaScript", "Cron Jobs"], // Wein.plus
      ["React", "Laravel", "PHP", "MySQL", "Bootstrap"], // Real Business Center
      ["Laravel", "PHP", "React", "TypeScript", "MySQL"] // Hexsicor CRM
    ][index] || [],
    category: project.category || '',
    year: index === 5 ? "2022-2023" : "2024", // Hexsicor foi em 2022-2023
    status: (t.projects?.completed || 'Completed'),
    features: project.features || [],
    liveUrl: index === 0 ? "https://github.com/mirasity1/advcatia" : // Advcatia - link para GitHub
             index === 4 ? "https://realbusinesscenter.pt/" : // Real Business Center - único site visitável
             "https://mirasity.pt", // Outros redirecionam para portfolio
    githubUrl: index === 0 ? "https://github.com/mirasity1/advcatia" : null, // Apenas Advcatia público
    isCodePrivate: index !== 0, // Apenas Advcatia tem código público
    color: [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500"
    ][index] || "from-blue-500 to-cyan-500"
  }));

  const [selectedProject, setSelectedProject] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const openGallery = (project) => {
    setSelectedProject(project);
    setShowGallery(true);
    trackEvent('project_gallery_open', 'Projects', project.title);
  };

  const closeGallery = () => {
    setShowGallery(false);
    setSelectedProject(null);
    trackEvent('project_gallery_close', 'Projects');
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.projects?.title || 'My'} <span className="text-blue-600">{t.projects?.subtitle || 'Projects'}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.projects?.description || 'A selection of projects I\'ve worked on'}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 cursor-pointer" onClick={() => openGallery(project)}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Concluído' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {project.status}
                  </div>
                  
                  {/* Gallery indicator */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image size={16} />
                  </div>
                  
                  {/* Hover overlay with buttons */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(project);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      <Eye size={20} />
                    </motion.button>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    {!project.isCodePrivate ? (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300"
                      >
                        <Github size={20} />
                      </motion.a>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-gray-400 text-white p-3 rounded-full cursor-not-allowed"
                        title="Código Privado"
                      >
                        <Lock size={20} />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-white`}>
                      {project.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {project.year}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 4 && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                          +{(project.technologies || []).length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">{t.projects?.features || 'Features:'}</h4>
                    <ul className="space-y-1">
                      {(project.features || []).slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                          <Award size={12} className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_live_click', 'Projects', project.title)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                    >
                      {t.projects?.viewProject || 'View Project'}
                    </motion.a>
                    {!project.isCodePrivate ? (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('project_github_click', 'Projects', project.title)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 border border-gray-300 text-gray-700 text-center py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                      >
                        <Github size={16} className="mr-1" />
                        {t.projects?.code || 'Code'}
                      </motion.a>
                    ) : (
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
          <ProjectGallery 
            project={selectedProject}
            isOpen={showGallery}
            onClose={closeGallery}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;