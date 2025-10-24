import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Download, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from './GoogleAnalytics';
import emailService from '../services/emailService';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', null
  const [formErrors, setFormErrors] = useState({});
  
  // Verificação anti-bot - pergunta matemática simples
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userMathAnswer, setUserMathAnswer] = useState('');

  // Gerar nova pergunta matemática
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setMathQuestion({ num1, num2, answer });
    setUserMathAnswer('');
  };

  // Gerar pergunta inicial
  useEffect(() => {
    generateMathQuestion();
  }, []);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    
    // Rastrear tentativa de envio
    trackEvent('form_submit_attempt', 'Contact', 'Contact Form');
    
    // Validação do formulário
    const errors = emailService.validateForm(formData);
    
    // Verificação anti-bot
    if (parseInt(userMathAnswer) !== mathQuestion.answer) {
      errors.mathVerification = t?.contact?.mathError || 'Resposta matemática incorreta. Tente novamente.';
      generateMathQuestion(); // Gerar nova pergunta
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      trackEvent('form_validation_error', 'Contact', 'Form Validation Failed');
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
    try {
      // Aqui você pode escolher qual método usar:
      // 1. Backend próprio com SMTP
      await emailService.sendEmail(formData);
      
      // 2. EmailJS (descomente para usar)
      // await emailService.sendEmailWithEmailJS(formData);
      
      // 3. Netlify Functions (descomente para usar)
      // await emailService.sendEmailWithNetlify(formData);
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset verificação matemática
      generateMathQuestion();
      
      // Rastrear sucesso
      trackEvent('form_submit_success', 'Contact', 'Contact Form Sent Successfully');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      
      // Rastrear erro
      trackEvent('form_submit_error', 'Contact', 'Contact Form Error');
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => setFormStatus(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t.contact.contactTypes.email,
      value: "filipe.ac.braga@gmail.com",
      href: "mailto:filipe.ac.braga@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: t.contact.contactTypes.linkedin,
      value: "filipe-braga-49a4391a9",
      href: "https://linkedin.com/in/filipe-braga-49a4391a9/",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: t.contact.contactTypes.github,
      value: "@mirasity1",
      href: "https://github.com/mirasity1",
      color: "from-gray-700 to-gray-900"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t.contact.contactTypes.location,
      value: "Portugal",
      href: null,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.contact.title} <span className="text-blue-400">{t.contact.subtitle}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t.contact.info}
                </h3>
                <p className="text-gray-300 mb-8">
                  {t.contact.infoDescription}
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="group"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="flex items-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500/30"
                      >
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${info.color} mr-4`}>
                          <div className="text-white">
                            {info.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{info.title}</h4>
                          <p className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center p-4 bg-gray-800 rounded-xl border border-gray-700">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${info.color} mr-4`}>
                          <div className="text-white">
                            {info.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{info.title}</h4>
                          <p className="text-gray-300">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="pt-8">
                <h4 className="text-white font-semibold mb-4">{t.contact.quickActions}</h4>
                <div className="space-y-3">
                  <motion.a
                    href="https://drive.google.com/file/d/1p9JETWrxIt_fdDl8gsNRhsgHvRBEWyvw/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cv_view', 'Contact', 'CV View Full Resume')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                  >
                    <Eye className="mr-2" size={20} />
                    {t.contact.viewResume}
                  </motion.a>

                  <motion.a
                    href="https://drive.google.com/uc?export=download&id=1p9JETWrxIt_fdDl8gsNRhsgHvRBEWyvw"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cv_download', 'Contact', 'CV Download')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <Download className="mr-2" size={20} />
                    {t.contact.downloadResume}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t.contact.sendMessage}
                </h3>
                
                {/* Status Messages */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <p className="text-green-300">{t.contact.form.successMessage}</p>
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                    <p className="text-red-300">{t.contact.form.errorMessage}</p>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                        {t.contact.form.name} *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                          formErrors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                        placeholder={t.contact.form.namePlaceholder}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        {t.contact.form.email} *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                          formErrors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                        placeholder={t.contact.form.emailPlaceholder}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                      {t.contact.form.subject} *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                        formErrors.subject 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      placeholder={t.contact.form.subjectPlaceholder}
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      {t.contact.form.message} *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                        formErrors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Verificação Anti-Bot */}
                  <div>
                    <label htmlFor="mathVerification" className="block text-gray-300 text-sm font-medium mb-2">
                      {t.contact?.form?.mathVerification || 'Verificação de Segurança'} *
                    </label>
                    <div className="flex items-center space-x-3">
                      <span className="text-white text-lg font-semibold bg-gray-700 px-3 py-2 rounded">
                        {mathQuestion.num1} + {mathQuestion.num2} = ?
                      </span>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        id="mathVerification"
                        value={userMathAnswer}
                        onChange={(e) => setUserMathAnswer(e.target.value)}
                        required
                        className={`w-20 px-3 py-2 bg-gray-700 border rounded-lg text-white text-center focus:outline-none focus:ring-1 transition-all duration-300 ${
                          formErrors.mathVerification 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                        placeholder="?"
                      />
                      <motion.button
                        type="button"
                        onClick={generateMathQuestion}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                        title={t.contact?.form?.refreshMath || 'Gerar nova pergunta'}
                      >
                        🔄
                      </motion.button>
                    </div>
                    {formErrors.mathVerification && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.mathVerification}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        {t.contact.form.send}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              {t.contact.footer}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;