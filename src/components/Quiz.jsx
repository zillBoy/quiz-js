import React, { useState } from 'react'
import axios from 'axios'
import '../styles.css'

function Quiz() {
    
    const [quizData, setQuizData] = useState([])
    const [category, setCategory] = useState("Linux")
    const [limit, setLimit] = useState("1")
    const [difficulty, setDifficulty] = useState("Easy")
    
    const [totalCorrect, setTotalCorrect] = useState(0)
    let quizCheck = []

    let API_KEY = "OSnosGEkHpodofWjteoZNuz2BngCwENXjglNjA8F"
    let url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${category}&difficulty=Easy&limit=${limit}`

    const getQuizData = () => {
        console.log(url)
        axios(url)
        .then(res => {
            setQuizData(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const submitQuiz = () => {
        for (let i = 0; i < quizData.length; i++) {
            let correctAnswer = Object.keys(quizData[i].correct_answers).filter(e => quizData[i].correct_answers[e] === "true")[0]
            let userAnswer = quizCheck[i]

            if (typeof(userAnswer) === 'undefined' || userAnswer.checked === false) {
                alert(`Please answer the question#${i + 1}`)
                return
            }

            if(correctAnswer === userAnswer.answer+"_correct") {
                setTotalCorrect(prevCount => prevCount + 1)
            }
        }
        getQuizData()
    }

    return (
        <div>
            <h1 className="header">TAKE A QUIZ</h1>
            
            <div className="quiz-section-div">
                <SelectComponent label={"Category"} state={category} updateState={setCategory} 
                    val={[{val: "linux"}, {val: "code"}, {val: "sql"}, {val: "cms"}, {val: "devops"}, {val: "docker"}]} />

                <SelectComponent label={"Limit"} state={limit} updateState={setLimit} 
                    val={[{val: "1"}, {val: "5"}, {val: "10"}, {val: "20"}]} />

                <SelectComponent label={"Difficulty"} state={difficulty} updateState={setDifficulty} 
                    val={[{val: "Easy"}, {val: "Medium"}, {val: "Hard"}]} />

                <button onClick={getQuizData} className="select-quiz btn-quiz">Generate Quiz</button>
            </div>

            {quizData.length !== 0 ?
            quizData.map((val, index) => {
                return(
                    <div className="quiz-question" key={index}>
                        <h4>{index + 1}. {val.question}</h4>
                        <ol>
                            <input type="checkbox" id="answer_a" onChange={(e) => quizCheck[index] = {answer: e.target.id, checked: e.target.checked} }/> <label>{val.answers.answer_a}</label>
                            <br/>
                            <input type="checkbox" id="answer_b" onChange={(e) => quizCheck[index] = {answer: e.target.id, checked: e.target.checked} } /> <label>{val.answers.answer_b}</label>
                            <br/>
                            {val.answers.answer_c !== null ? <><input type="checkbox" id="answer_c" onChange={(e) => quizCheck[index] = {answer: e.target.id, checked: e.target.checked} } /> <label>{val.answers.answer_c}</label></> : null}
                            <br/>
                            {val.answers.answer_d !== null ? <><input type="checkbox" id="answer_d" onChange={(e) => quizCheck[index] = {answer: e.target.id, checked: e.target.checked} } /> <label>{val.answers.answer_d}</label></> : null}
                        </ol>
                    </div>
                );
            })
            : null}
            <button onClick={submitQuiz} className="select-quiz btn-quiz">Submit Answer</button>
            <p style={{textAlign: "center"}}>Total Score: {totalCorrect}</p>
        </div>
    )
}

const SelectComponent = ({label, state, updateState, val}) => {
    return(
        <div>
            <label className="label-quiz" htmlFor={label}>{label}</label>
            <select value={state} className="select-quiz" name={label} onChange={(e) => updateState(e.target.value)} >
                {val.map((value, index) => {
                    return <option key={index} className="option-quiz" value={value.val}>{value.val}</option>
                })}
            </select>
        </div>
    );
}

export default Quiz
