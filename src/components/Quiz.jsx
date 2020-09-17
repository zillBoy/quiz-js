import React, { useState } from 'react'
import axios from 'axios'
import '../styles.css'

function Quiz() {
    
    const [quizData, setQuizData] = useState([])
    const [category, setCategory] = useState("Linux")
    const [limit, setLimit] = useState("1")
    const [difficulty, setDifficulty] = useState("Easy")
    
    const [totalCorrect, setTotalCorrect] = useState(0)

    let API_KEY = "OSnosGEkHpodofWjteoZNuz2BngCwENXjglNjA8F"
    let url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${category}&difficulty=Easy&limit=${limit}`

    const getQuizData = () => {
        
        axios(url)
        .then(res => {
            setQuizData(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const submitQuiz = () => {
        let correctAnswers = quizData[0].correct_answers
        let correctOption = ""
        let userOption = ""

        let a = document.getElementById("answer_a")
        let b = document.getElementById("answer_b")
        let c = document.getElementById("answer_c")
        let d = document.getElementById("answer_d")

        if (a.checked) userOption = "a" 
        else if (b.checked) userOption = "b"
        else if (c.checked) userOption = "c"
        else if (d.checked) userOption = "d"

        if (userOption.length === 0) {
            alert("Choose an option") 
            return
        }

        for (let property in correctAnswers) {
            if (correctAnswers[property]) {
                correctOption = property
                break
            }
        }

        correctOption = correctOption.split("_")

        if (correctOption[1] === userOption) {
            setTotalCorrect(prevCount => prevCount + 1)
        }

        console.log(totalCorrect)

        a.checked = false
        b.checked = false
        c.checked = false
        if (c !== null) c.checked = false
        if (d !== null) d.checked = false

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
                            <input type="checkbox" id="answer_a" /> <label>{val.answers.answer_a}</label>
                            <br/>
                            <input type="checkbox" id="answer_b"/> <label>{val.answers.answer_b}</label>
                            <br/>
                            {val.answers.answer_c !== null ? <><input type="checkbox" id="answer_c"/> <label>{val.answers.answer_c}</label></> : null}
                            <br/>
                            {val.answers.answer_d !== null ? <><input type="checkbox" id="answer_d"/> <label>{val.answers.answer_d}</label></> : null}
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
