import React, { useEffect, useState } from 'react';
import TextFieldComponent from '../../../components/text_field/text_field';
import ButtonComponent from '../../../components/button/button';
import useSecurity from '../../../utilities/client/security_function';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const { fetchQuestion, resetPassword } = useSecurity();

  const [email, setEmail] = useState('');
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isPasswordPhase, setIsPasswordPhase] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    if (email) {
      const data = await fetchQuestion(email);
      setSecurityQuestions(data.map((element) => ({
        question: element.question,
        answer: element.answer,
      })));
      setEmailSubmitted(true);
      
      if (data.length === 0) {
        setErrorMessage("Oups ! Il semble que vous n'ayez pas de questions de sécurité. Veuillez contacter l'admin... ou quelqu'un qui a plus de chance. 😅");
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('Veuillez entrer une adresse e-mail valide.');
    }
  };

  const handleAnswerChange = (question, value) => {
    setSubmittedAnswers({ ...submittedAnswers, [question]: value });
  };

  const handleCheckAnswers = () => {
    const correctAnswers = Object.keys(submittedAnswers).filter(
      (question) => submittedAnswers[question] === securityQuestions.find(q => q.question === question)?.answer
    );

    const requiredCorrectAnswers = Math.ceil(securityQuestions.length * 0.8);
    if (correctAnswers.length >= requiredCorrectAnswers) {
      setIsPasswordPhase(true); // Allow user to input new password
      setErrorMessage('');
    } else {
      setErrorMessage('Vous devez répondre correctement à 80% des questions. Encore un effort, vous y êtes presque!');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(email, newPassword);
      setSuccessMessage(response.reset_password);
      setErrorMessage('');
      navigate('/login')
    } catch (error) {
      setErrorMessage('Erreur lors de la réinitialisation du mot de passe.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{color: '#cfbd97', margin: '10% 0 0 0', fontFamily: 'pacifico'}}>Vous avez oublié votre mot de passe ?</h2>
      <h2 style={{fontSize: '25px', color: '#cfbd97', marginTop: '10px', fontFamily: 'pacifico'}}>Pas de panique, on va tout arranger !</h2>
      <h2 style={{fontSize: '20px', color: "#cfbd97", margin: '10px 0 20% 0', fontFamily: 'pacifico'}}>Réinitialiser le mot de passe</h2>

      {!emailSubmitted ? (
        <div>
          <TextFieldComponent
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width="100%"
            height="45px"
          />
          <div style={{height: '20px'}}></div>
          <ButtonComponent placeholder="Vérifier" onClickFunction={handleEmailSubmit} />
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          {securityQuestions.length > 0 && !isPasswordPhase ? (
            <div>
              {securityQuestions.map((item, index) => (
                <div key={index} style={styles.questionContainer}>
                  <strong>Q:</strong> {item.question} <br />
                  <TextFieldComponent
                    placeholder="Votre réponse"
                    onChange={(e) => handleAnswerChange(item.question, e.target.value)}
                    width="100%"
                    height="45px"
                  />
                </div>
              ))}
              <ButtonComponent placeholder="Soumettre les réponses" onClickFunction={handleCheckAnswers} />
              {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            </div>
          ) : isPasswordPhase ? (
            <div>
              <TextFieldComponent
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                width="100%"
                height="45px"
              />
              <div style={{height: '20px'}}></div>
              <ButtonComponent placeholder="Réinitialiser" onClickFunction={handleResetPassword} />
              {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
              {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            </div>
          ) : (
            <h1 style={{marginTop: '50%', fontFamily: 'pacifico'}}>Aucune question de sécurité trouvée. Contactez l'admin... ou un dev qui aurait plus de chance. 😅</h1>
          )}
        </div>
      )}
    </div>
  );
};

// CSS-in-JS Styling
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '600px',
    minHeight: '100vh',
    margin: '20px auto',
    backgroundColor: '#f8f9fa',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#333',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  successMessage: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  },
};

export default ForgotPassword;
