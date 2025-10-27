// cypress/support/test-translations.js
// Traduções para testes Cypress

export const testTranslations = {
  pt: {
    contact: {
      title: 'Vamos',
      subtitle: 'Trabalhar Juntos',
      form: {
        sending: 'Enviando...',
        send: 'Enviar Mensagem',
        successMessage: 'Mensagem enviada com sucesso! Entrarei em contacto em breve.',
        errorMessage: 'Erro ao enviar mensagem. Tente novamente ou entre em contacto diretamente.',
      },
      mathError: 'Resposta matemática incorreta. Tente novamente.',
      validationErrors: {
        nameRequired: 'Nome é obrigatório',
        emailRequired: 'Email é obrigatório', 
        emailInvalid: 'Email inválido',
        subjectRequired: 'Assunto é obrigatório',
        messageRequired: 'Mensagem é obrigatória'
      }
    }
  },
  en: {
    contact: {
      title: 'Let\'s Work',
      subtitle: 'Together',
      form: {
        sending: 'Sending...',
        send: 'Send Message',
        successMessage: 'Message sent successfully! I\'ll get back to you soon.',
        errorMessage: 'Error sending message. Please try again or contact me directly.',
      },
      mathError: 'Incorrect math answer. Please try again.',
      validationErrors: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email',
        subjectRequired: 'Subject is required', 
        messageRequired: 'Message is required'
      }
    }
  }
};

// Helper function to get translations for tests
export const getTestTranslations = (language = 'en') => {
  return testTranslations[language] || testTranslations.en;
};

// Cypress command to get translations
Cypress.Commands.add('getTranslations', (language = 'en') => {
  return cy.wrap(getTestTranslations(language));
});