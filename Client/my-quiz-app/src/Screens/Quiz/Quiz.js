import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../Store'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { getError } from "../../Helper/util"
import "../Quiz/style.css"
import HtmlDisplay from '../../Helper/HtmlDisplay'
import LoadingBox from '../../Components/LoadingBox/LoadingBox'
let rightAns = 0;

function Quiz() {
    const { regID, setRegID, state, eventID, setEventID, events } = useContext(Store)
    const { userInfo } = state
    const navigate = useNavigate()
    const { event_ID, reg_ID } = useParams()
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState()
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState();
    const [myEvent, setMyEvent] = useState(events.find(e => e.id === eventID))

    useEffect(() => {
        if (!userInfo || !userInfo.jwtToken || regID === 0 || regID !== reg_ID || event_ID != eventID) {
            setEventID(0)
            setRegID(0)
            navigate("/home")
            return
        }

        const callQuestionApi = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/question/get/random/${event_ID}?limit=${myEvent ? myEvent.total : 1}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userInfo.jwtToken}`
                    }
                })
                setLoading(false)
                setQuestions(data)
            } catch (error) {
                toast.error(getError(error))
            }
        }

        const callExamApi = async () => {
            try {
                setLoading(true)
                const { data } = await axios.post(`/exam/create`, {
                    right: 0,
                    wrong: 0,
                    category: myEvent
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userInfo.jwtToken}`
                    }
                })
                setLoading(false)
                setResult(data)
            } catch (error) {
                toast.error(getError(error))
            }
        }
        callQuestionApi()
        callExamApi()
    }, [regID, eventID])
    /////////////////////////////////////
    // Detecting for changing tabs
    /////////////////////////////////////

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            setEventID(0)
            setRegID(0)
            toast.error("You have been disqualified from the quiz for changing tab")
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    ///////////
    // ENDS
    ///////////


    const handleAnswerOptionClick = async (isCorrect) => {
        if (isCorrect === questions[currentQuestion].answer) {
            rightAns++;
            setScore((prev) => prev + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setLoading(true)
            console.log(score)
            const { data } = await axios.post(`/exam/create`, {
                id: result.id,
                right: rightAns,
                wrong: questions.length - rightAns,
                category: myEvent
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.jwtToken}`
                }
            })
            setLoading(false)
            setResult(data)
            setShowScore(true);
            rightAns = 0;
        }
    };

    return (
        <>{
            loading ?
                <LoadingBox />
                : <div className='quiz-main' >
                    {questions?.length > 0 ? <div className='quiz-app'>
                        {showScore ? (
                            <div className='quiz-score-section'>
                                You scored {score} out of {questions.length}
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyItems: "end",
                                    alignItems: "center"
                                }}
                            >
                                <div className='quiz-question-section'>
                                    <div className='quiz-question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className='quiz-question-text'>{questions[currentQuestion].question}</div>
                                    <div className='quiz-question-text quiz-code'>
                                        {
                                            questions[currentQuestion].codeSnippet ? <HtmlDisplay htmlText={questions[currentQuestion].codeSnippet} /> : ""
                                        }
                                    </div>
                                </div>
                                <div className='quiz-answer-section'>
                                    <button className="quiz-btn" onClick={() => handleAnswerOptionClick(questions[currentQuestion].a)}>{questions[currentQuestion].a}</button>

                                    <button className="quiz-btn" onClick={() => handleAnswerOptionClick(questions[currentQuestion].b)}>{questions[currentQuestion].b}</button>

                                    <button className="quiz-btn" onClick={() => handleAnswerOptionClick(questions[currentQuestion].c)}>{questions[currentQuestion].c}</button>

                                    <button className="quiz-btn" onClick={() => handleAnswerOptionClick(questions[currentQuestion].d)}>{questions[currentQuestion].d}</button>
                                </div>
                            </div>
                        )}
                    </div> : <>QUIZ NOT UPDATED</>
                    }
                </div >
        }
        </>
    );
}

export default Quiz
