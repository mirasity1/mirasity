import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Code, Palette, Database, GitBranch, Settings, Smartphone, 
  Server, Globe, Layers, Wrench, Monitor, Zap, Users, Target,
  FileText, Briefcase, Phone, CreditCard, Headphones, Camera,
  Moon, Cpu
} from 'lucide-react';

const Skills = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Icon mapping function
  const getSkillIcon = (skillName) => {
    const iconMap = {
      'React': <Code size={20} className="text-blue-400" />,
      'JavaScript': <Code size={20} className="text-yellow-400" />,
      'TypeScript': <Code size={20} className="text-blue-600" />,
      'Vue.js': <Code size={20} className="text-green-400" />,
      'HTML5': <Globe size={20} className="text-orange-500" />,
      'CSS3': <Palette size={20} className="text-blue-500" />,
      'Tailwind CSS': <Palette size={20} className="text-cyan-400" />,
      'Bootstrap': <Layers size={20} className="text-purple-500" />,
      'Laravel': <Server size={20} className="text-red-500" />,
      'PHP': <Server size={20} className="text-indigo-500" />,
      'Node.js': <Server size={20} className="text-green-500" />,
      'Python': <Code size={20} className="text-blue-400" />,
      'MySQL': <Database size={20} className="text-orange-500" />,
      'PostgreSQL': <Database size={20} className="text-blue-600" />,
      'APIs REST': <Globe size={20} className="text-green-400" />,
      'Git': <GitBranch size={20} className="text-orange-500" />,
      'Jira': <Briefcase size={20} className="text-blue-500" />,
      'Bitbucket': <GitBranch size={20} className="text-blue-600" />,
      'Linux': <Monitor size={20} className="text-gray-400" />,
      'Docker': <Layers size={20} className="text-blue-400" />,
      'Nginx': <Zap size={20} className="text-green-500" />,
      'Scrum': <Users size={20} className="text-blue-500" />,
      'Kanban': <Target size={20} className="text-green-500" />,
      'Atlassian Suite': <Wrench size={20} className="text-blue-600" />,
      'Confluence': <FileText size={20} className="text-blue-500" />,
      'Metodologias Ágeis': <Zap size={20} className="text-yellow-500" />,
      'Figma': <Palette size={20} className="text-purple-500" />,
      'UI/UX Design': <Palette size={20} className="text-pink-500" />,
      'Responsive Design': <Smartphone size={20} className="text-blue-400" />,
      'Adobe Photoshop': <Camera size={20} className="text-blue-600" />,
      'Freeswitch': <Phone size={20} className="text-green-500" />,
      'Sistemas POS': <CreditCard size={20} className="text-yellow-500" />,
      'Call Center CRM': <Headphones size={20} className="text-purple-500" />,
      'Lua': <Moon size={20} className="text-blue-400" />,
      'Strapi CMS': <Cpu size={20} className="text-purple-600" />
    };
    
    return iconMap[skillName] || <Settings size={20} className="text-gray-400" />;
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Simple variants for mobile without transforms
  const mobileVariants = {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 1, scale: 1 }
  };

  const skillCategories = [
    {
      title: t.skills.categories.frontend,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 80 },
        { name: "Vue.js", level: 75 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 }
      ]
    },
    {
      title: t.skills.categories.backend,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Laravel", level: 85 },
        { name: "PHP", level: 85 },
        { name: "Node.js", level: 75 },
        { name: "Python", level: 70 },
        { name: "MySQL", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "APIs REST", level: 85 }
      ]
    },
    {
      title: t.skills.categories.tools,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git", level: 90 },
        { name: "Jira", level: 85 },
        { name: "Bitbucket", level: 90 },
        { name: "Linux", level: 80 },
        { name: "Docker", level: 70 },
        { name: "Nginx", level: 70 }
      ]
    },
    {
      title: t.skills.categories.pm,
      color: "from-teal-500 to-blue-500",
      skills: [
        { name: "Scrum", level: 85 },
        { name: "Kanban", level: 80 },
        { name: "Atlassian Suite", level: 85 },
        { name: "Confluence", level: 80 },
        { name: "Metodologias Ágeis", level: 85 }
      ]
    },
    {
      title: t.skills.categories.design,
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: "Figma", level: 75 },
        { name: "UI/UX Design", level: 70 },
        { name: "Responsive Design", level: 85 },
        { name: "Adobe Photoshop", level: 65 }
      ]
    },
    {
      title: "Telecomunicações & Sistemas",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Freeswitch", level: 75 },
        { name: "Sistemas POS", level: 80 },
        { name: "Call Center CRM", level: 85 },
        { name: "Lua", level: 70 },
        { name: "Strapi CMS", level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={isMobile ? mobileVariants : containerVariants}
          initial="visible"
          animate="visible"
          className="max-w-7xl mx-auto"
          style={{ opacity: 1 }}
        >
                    <motion.div 
            variants={isMobile ? mobileVariants : itemVariants}
            initial="visible"
            animate="visible"
            className="text-center mb-16"
            style={{ opacity: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.skills.title} <span className="text-blue-400">{t.skills.subtitle}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.skills.description}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={isMobile ? mobileVariants : itemVariants}
                initial="visible"
                animate="visible"
                whileHover={isMobile ? {} : { y: -5 }}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all duration-300"
                style={{ opacity: 1, transform: 'scale(1)' }}
              >
                <div className={`text-center mb-6`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}>
                    {category.title}
                  </h3>
                </div>

                  <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillItem
                      key={skillIndex}
                      skill={skill}
                      skillIndex={skillIndex}
                      categoryColor={category.color}
                      getSkillIcon={getSkillIcon}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional info */}
          <motion.div
            variants={isMobile ? mobileVariants : itemVariants}
            initial="visible"
            animate="visible"
            className="mt-16 text-center"
            style={{ opacity: 1 }}
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t.skills.alwaysLearning}
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {t.skills.learningDescription}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

      // Reusable SkillItem that falls back to visible state on small screens
      const SkillItem = ({ skill, skillIndex, categoryColor, getSkillIcon }) => {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
          const check = () => setIsMobile(window.innerWidth <= 768);
          check();
          window.addEventListener('resize', check);
          return () => window.removeEventListener('resize', check);
        }, []);

        if (isMobile) {
          // Simple rendering for mobile without animations
          return (
            <div className="group" style={{ opacity: 1, transform: 'translateX(0px)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getSkillIcon(skill.name)}
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-gray-400 text-sm">{skill.level}%</span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${categoryColor}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          );
        }

        return (
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: skillIndex * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getSkillIcon(skill.name)}
                <span className="text-white font-medium">{skill.name}</span>
              </div>
              <span className="text-gray-400 text-sm">{skill.level}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                viewport={{ once: true }}
                className={`h-2 rounded-full bg-gradient-to-r ${categoryColor}`}
              />
            </div>
          </motion.div>
        );
      };

      export default Skills;