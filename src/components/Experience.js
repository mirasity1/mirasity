import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Users, Code, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Experience = () => {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const experiences = [
    {
      company: t.experience.positions.landbell.company,
      position: t.experience.positions.landbell.position,
      period: t.experience.positions.landbell.period,
      location: t.experience.positions.landbell.location,
      type: t.experience.positions.landbell.type,
      description: t.experience.positions.landbell.description,
      highlights: t.experience.positions.landbell.highlights,
      technologies: ["Laravel", "PHP", "SQL", "Postman", "Git"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      company: t.experience.positions.realvida.company,
      position: t.experience.positions.realvida.position,
      period: t.experience.positions.realvida.period,
      location: t.experience.positions.realvida.location,
      type: t.experience.positions.realvida.type,
      description: t.experience.positions.realvida.description,
      highlights: t.experience.positions.realvida.highlights,
      technologies: ["React", "TypeScript", "Node.js", "Python", "Strapi"],
      color: "from-purple-500 to-pink-500"
    },
    {
      company: t.experience.positions.hexsicor.company,
      position: t.experience.positions.hexsicor.position,
      period: t.experience.positions.hexsicor.period,
      location: t.experience.positions.hexsicor.location,
      type: t.experience.positions.hexsicor.type,
      description: t.experience.positions.hexsicor.description,
      highlights: t.experience.positions.hexsicor.highlights,
      technologies: ["Laravel", "React", "TypeScript", "Python", "Lua"],
      color: "from-green-500 to-emerald-500"
    },
    {
      company: t.experience.positions.gasodata.company,
      position: t.experience.positions.gasodata.position,
      period: t.experience.positions.gasodata.period,
      location: t.experience.positions.gasodata.location,
      type: t.experience.positions.gasodata.type,
      description: t.experience.positions.gasodata.description,
      highlights: t.experience.positions.gasodata.highlights,
      technologies: ["POS Systems", "Remote Support", "Troubleshooting"],
      color: "from-orange-500 to-red-500"
    },
    {
      company: t.experience.positions.typing.company,
      position: t.experience.positions.typing.position,
      period: t.experience.positions.typing.period,
      location: t.experience.positions.typing.location,
      type: t.experience.positions.typing.type,
      description: t.experience.positions.typing.description,
      highlights: t.experience.positions.typing.highlights,
      technologies: ["Laravel", "Vue.js", "PHP", "JavaScript"],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const methodologies = [
    {
      name: t.experience.methodologyList[0].name,
      icon: <Users className="w-6 h-6" />,
      description: t.experience.methodologyList[0].description
    },
    {
      name: t.experience.methodologyList[1].name,
      icon: <Target className="w-6 h-6" />,
      description: t.experience.methodologyList[1].description
    },
    {
      name: t.experience.methodologyList[2].name,
      icon: <Code className="w-6 h-6" />,
      description: t.experience.methodologyList[2].description
    },
    {
      name: t.experience.methodologyList[3].name,
      icon: <Award className="w-6 h-6" />,
      description: t.experience.methodologyList[3].description
    }
  ];  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.experience.title} <span className="text-blue-600">{t.experience.subtitle}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.experience.description}
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></div>

                {/* Content card */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                    <div className="mb-4">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${exp.color} text-white mb-2`}>
                        {exp.type}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.position}
                      </h3>
                      <h4 className="text-lg font-semibold text-blue-600 mb-2">
                        {exp.company}
                      </h4>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{exp.description}</p>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">{t.common.mainActivities}</h5>
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">{t.common.technologies}</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Methodologies section */}
          <motion.div variants={itemVariants} className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {t.experience.methodologies} <span className="text-blue-600">{t.experience.tools}</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologies.map((method, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {method.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{method.name}</h4>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;