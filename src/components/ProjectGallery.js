import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ProjectGallery = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle modal close without any scroll manipulation
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Build gallery media array with images and videos
  const galleryMedia = project ? [
    { type: 'image', src: project.image },
    ...(project.video ? [{ 
      type: project.video.type || 'video', 
      src: project.video.type === 'youtube' ? project.video.id : project.video,
      si: project.video.si || null,
      thumbnail: project.video.thumbnail || null 
    }] : []),
    ...(project.video?.additionalVideos ? project.video.additionalVideos.map(video => ({
      type: video.type || 'video',
      src: video.type === 'youtube' ? video.id : video.src,
      title: video.title || null,
      thumbnail: video.thumbnail || null
    })) : []),
    { type: 'image', src: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop` },
  ].filter(item => item.src) : []; // Filter out any undefined sources

  // Reset current index when project changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project]);

  const nextImage = useCallback(() => {
    if (galleryMedia.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % galleryMedia.length);
    }
  }, [galleryMedia.length]);

  const prevImage = useCallback(() => {
    if (galleryMedia.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
    }
  }, [galleryMedia.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Apenas bloquear scroll sem mover nada
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // Restaurar scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Cleanup simples
      document.body.style.overflow = '';
    };
  }, [isOpen, nextImage, prevImage, handleClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 0,
      x: 0
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 0,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (!project) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/90 z-[9999]"
          onClick={handleClose}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            margin: 0,
            transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
            overflow: 'hidden',
            zIndex: 9999
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-xl md:rounded-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              margin: 0,
              transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 pr-4">{project.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{project.category}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 touch-manipulation"
                aria-label="Fechar galeria"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            {/* Media Gallery */}
            <div className="relative h-64 md:h-80 bg-gray-100 overflow-hidden flex-shrink-0">
              <AnimatePresence mode="wait" custom={currentImageIndex}>
                {galleryMedia.length > 0 && (galleryMedia[currentImageIndex]?.type === 'video' || galleryMedia[currentImageIndex]?.type === 'youtube') ? (
                  <motion.div
                    key={`video-${currentImageIndex}`}
                    custom={currentImageIndex}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 w-full h-full bg-black flex items-center justify-center"
                  >
                    {galleryMedia[currentImageIndex]?.type === 'youtube' ? (
                      <div className="w-full h-full bg-black flex items-center justify-center relative cursor-pointer group"
                           onClick={() => window.open(`https://www.youtube.com/watch?v=${galleryMedia[currentImageIndex]?.src}`, '_blank')}
                      >
                        {/* YouTube Thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${galleryMedia[currentImageIndex]?.src}/maxresdefault.jpg`}
                          alt="Video Thumbnail"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to medium quality thumbnail
                            e.target.src = `https://img.youtube.com/vi/${galleryMedia[currentImageIndex]?.src}/mqdefault.jpg`;
                          }}
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                          <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* YouTube Logo */}
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                          YouTube
                        </div>
                        
                        {/* Click to open message */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          Clique para abrir no YouTube
                        </div>
                      </div>
                    ) : (
                      <video
                        key={galleryMedia[currentImageIndex]?.src}
                        controls
                        className="max-w-full max-h-full object-contain"
                        playsInline
                        muted
                        preload="auto"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.error('Video load error:', e);
                          console.error('Video src:', galleryMedia[currentImageIndex]?.src);
                          console.error('Video element:', e.target);
                        }}
                        onLoadStart={() => console.log('Video loading started:', galleryMedia[currentImageIndex]?.src)}
                        onCanPlay={() => console.log('Video can play:', galleryMedia[currentImageIndex]?.src)}
                        onLoadedData={() => console.log('Video data loaded:', galleryMedia[currentImageIndex]?.src)}
                      >
                        <source src={galleryMedia[currentImageIndex]?.src} type="video/mp4" />
                        <p>Seu navegador não suporta reprodução de vídeo. 
                           <br />Tentando carregar: {galleryMedia[currentImageIndex]?.src}
                        </p>
                      </video>
                    )}
                  </motion.div>
                ) : galleryMedia.length > 0 ? (
                  <motion.img
                    key={`image-${currentImageIndex}`}
                    custom={currentImageIndex}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    src={galleryMedia[currentImageIndex]?.src}
                    alt={`${project.title || 'Project'} - ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => console.error('Image load error:', e)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <p>Nenhuma mídia disponível</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Navigation arrows - Larger on mobile */}
              {galleryMedia.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 md:p-3 rounded-full transition-all duration-200 z-10 shadow-lg touch-manipulation"
                    style={{ zIndex: 10 }}
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={20} className="md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 md:p-3 rounded-full transition-all duration-200 z-10 shadow-lg touch-manipulation"
                    style={{ zIndex: 10 }}
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={20} className="md:w-6 md:h-6" />
                  </button>
                </>
              )}

              {/* Media counter and type indicator */}
              {galleryMedia.length > 0 && (
                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium z-10">
                  {currentImageIndex + 1} / {galleryMedia.length}
                  {galleryMedia[currentImageIndex]?.type === 'video' && (
                    <span className="ml-2">🎥</span>
                  )}
                  {galleryMedia[currentImageIndex]?.type === 'youtube' && (
                    <span className="ml-2">📺</span>
                  )}
                  {galleryMedia[currentImageIndex]?.title && (
                    <span className="ml-2 text-xs opacity-90">- {galleryMedia[currentImageIndex].title}</span>
                  )}
                </div>
              )}
            </div>

            {/* Project details */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <p className="text-gray-700 text-sm md:text-base mb-4">{project.description || 'Sem descrição disponível'}</p>
              
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Tecnologias Utilizadas</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 md:px-3 md:py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Funcionalidades</h4>
                  <ul className="space-y-1.5 md:space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm md:text-base text-gray-700">
                        <span className="text-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                {project.hasLiveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-center text-sm md:text-base font-medium touch-manipulation"
                  >
                    Ver Projeto Live
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      // Fechar o modal primeiro
                      handleClose();
                      
                      // Aguardar um pouco para o modal fechar completamente
                      setTimeout(() => {
                        // Scroll para o formulário de contacto
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                          
                          // Aguarda um pouco para o scroll terminar e depois preenche o formulário
                          setTimeout(() => {
                            const subjectField = document.getElementById('subject');
                            const messageField = document.getElementById('message');
                            
                            if (subjectField) {
                              subjectField.value = `Questão sobre o projeto: ${project.title}`;
                              subjectField.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            
                            if (messageField) {
                              messageField.value = `Olá! Gostaria de saber mais sobre o projeto "${project.title}". Pode partilhar mais detalhes sobre este projeto?`;
                              messageField.dispatchEvent(new Event('input', { bubbles: true }));
                              messageField.focus();
                            }
                          }, 1000);
                        }
                      }, 300);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-center text-sm md:text-base font-medium touch-manipulation"
                  >
                    Questionar sobre este projeto
                  </button>
                )}
                {!project.isCodePrivate && project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-center text-sm md:text-base font-medium touch-manipulation"
                  >
                    Ver Código
                  </a>
                )}
              </div>
            </div>

            {/* Thumbnail navigation */}
            {galleryMedia.length > 1 && (
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="flex space-x-2 overflow-x-auto">
                  {galleryMedia.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative touch-manipulation ${
                        currentImageIndex === index
                          ? 'border-blue-500 opacity-100'
                          : 'border-gray-300 opacity-60 hover:opacity-80'
                      }`}
                    >
                      {media.type === 'video' || media.type === 'youtube' ? (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                          <span className="text-white text-xs">🎥</span>
                          {media.type === 'youtube' && media.thumbnail ? (
                            <img
                              src={media.thumbnail}
                              className="absolute inset-0 w-full h-full object-cover opacity-70"
                              alt="Video thumbnail"
                            />
                          ) : media.type === 'youtube' ? (
                            <img
                              src={`https://img.youtube.com/vi/${media.src}/mqdefault.jpg`}
                              className="absolute inset-0 w-full h-full object-cover opacity-70"
                              alt="Video thumbnail"
                            />
                          ) : (
                            <video
                              src={media.src}
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                              muted
                              preload="metadata"
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          src={media.src}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal directly to document.body
  return isOpen ? createPortal(modalContent, document.body) : null;
};

export default ProjectGallery;