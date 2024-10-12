import React, { useEffect, useState } from 'react';
import questionsData from './questions.json'; // Assurez-vous d'importer votre fichier JSON
import './quiz_game.css';
import ButtonComponent from '../../components/button/button';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userScore, setUserScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        // Sélectionner 5 questions aléatoires
        const shuffledQuestions = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(shuffledQuestions);
    }, []);

    const handleAnswer = (option) => {
        if (option === questions[currentQuestionIndex].answer) {
            setUserScore(prevScore => prevScore + 1);
        }

        // Passer à la question suivante
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setUserScore(0);
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
        // Réinitialiser les questions si nécessaire
        const shuffledQuestions = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(shuffledQuestions);
    };

    return (
        <div className="quiz-container">
            {quizFinished ? (
                <div className="quiz-result">
                    <h2 style={{color: 'black'}}>Votre score: {userScore}/{questions.length}</h2>
                    <ButtonComponent onClickFunction={handleRestart} placeholder='Recommencer'/>
                </div>
            ) : (
                <div className="quiz-question">
                    <h3 className='size'>{questions[currentQuestionIndex]?.question}</h3>
                    <ul className="quiz-options">
                        {questions[currentQuestionIndex]?.options.map((option, index) => (
                            <li key={index}>
                                <ButtonComponent onClickFunction={() => handleAnswer(option)} placeholder={option}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Quiz;
