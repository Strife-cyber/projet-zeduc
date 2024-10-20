import React, { useEffect, useState } from 'react';
import TextFieldComponent from '../../../components/text_field/text_field';
import ButtonComponent from '../../../components/button/button';
import useSecurity from '../../../utilities/client/security_function';
import { useUser } from '../../../contexts/user_context';
import { useNavigate } from 'react-router';

const SecurityQuestions = () => {
  const [predefinedQuestions] = useState([
    "Quel est le nom de jeune fille de ta mère ?",
    "Quel était le nom de ton premier animal de compagnie ?",
    "Quel est le nom de la ville où tu es né ?"
  ]);

  const [customQuestion, setCustomQuestion] = useState('');
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');
  const { insertQuestion, fetchQuestion } = useSecurity();
  const { user } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuestion(user.email);
      setSecurityQuestions([])
      data.forEach((element) => {
        setSecurityQuestions((prevQuestions) => [
          ...prevQuestions, 
          { question: element.question, answer: element.answer }
        ]);
      });
    };
    fetchData();
  }, []);

  // Add a predefined or custom question to the list
  const addQuestion = async () => {
    if (selectedQuestion && answer) {
      await insertQuestion(user.email, selectedQuestion, answer);
      setSecurityQuestions([...securityQuestions, { question: selectedQuestion, answer }]);
      setSelectedQuestion('');
      setAnswer('');
    }
  };

  // Add a custom question
  const addCustomQuestion = async () => {
    if (customQuestion && customAnswer) {
      await insertQuestion(user.email, customQuestion, customAnswer);  
      setSecurityQuestions([...securityQuestions, { question: customQuestion, answer: customAnswer }]);
      setCustomQuestion('');
      setCustomAnswer('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gérer vos questions de sécurité</h2>

      {/* Dropdown for predefined questions */}
      <div style={styles.section}>
        <label style={styles.label}>Choisissez une question pré-définie :</label>
        <select 
          value={selectedQuestion} 
          onChange={(e) => setSelectedQuestion(e.target.value)} 
          style={styles.selectInput}
        >
          <option value="">Sélectionnez une question</option>
          {predefinedQuestions.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </select>
        <TextFieldComponent 
          placeholder="Votre réponse" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          width="100%"
          height="45px"
        />
        <div style={{height: '10px'}}></div>
        <ButtonComponent onClickFunction={addQuestion} placeholder="Ajouter"/>
      </div>

      {/* Custom question input */}
      <div style={styles.section}>
        <label style={styles.label}>Ou ajoutez votre propre question :</label>
        <TextFieldComponent 
          placeholder="Entrez votre question" 
          value={customQuestion} 
          onChange={(e) => setCustomQuestion(e.target.value)} 
          width="100%"
          height="45px"
        />
        <div style={{height: '10px'}}></div>
        <TextFieldComponent 
          placeholder="Votre réponse" 
          value={customAnswer} 
          onChange={(e) => setCustomAnswer(e.target.value)} 
          width="100%"
          height="45px"
        />
        <div style={{height: '10px'}}></div>
        <ButtonComponent onClickFunction={addCustomQuestion} placeholder="Ajouter"/>
      </div>

      {/* Display list of added questions */}
      <div style={styles.questionsList}>
        <h3 style={styles.subTitle}>Vos Questions de Sécurité</h3>
        {
          securityQuestions.length > 0 ? (
            <ul style={styles.ul}>
              {securityQuestions.map((item, index) => (
                <li key={index} style={styles.li}>
                  <strong>Q:</strong> {item.question} <br />
                  <strong>A:</strong> {item.answer}
                </li>
              ))}
            </ul>
          ) : (
            <h1 style={{marginTop: '20%', fontFamily: 'Pacifico'}}>Aucune question de sécurité</h1>
          )
        }
      </div>
      <div style={{height: '100px'}}></div>
      <ButtonComponent placeholder='Terminer' onClickFunction={() => navigate('/home')}/>
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
  title: {
    fontSize: '1.8rem',
    color: '#cfbd97',
    margin: '10% 0 10% 0',
  },
  section: {
    marginBottom: '30px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    float: 'left',
    color: '#495057',
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '10px',
    border: '2px solid #cfbd97',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Montaga', serif",
    transition: 'border-color 0.2s',
  },
  questionsList: {
    marginTop: '50px',
  },
  subTitle: {
    fontSize: '1.5rem',
    color: '#495057',
    marginBottom: '20px',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
  },
  li: {
    backgroundColor: '#f6efe7',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    height: '80px',
    fontFamily: 'Montaga'
  }
};

export default SecurityQuestions;
