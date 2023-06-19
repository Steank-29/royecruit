import { useEffect, useState } from "react";
import Question from "./Question";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Quiz = ({ questions, score, setScore, setQuestions, userId, exam_id}) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [correct, setCorrect] = useState();
    const {examId} = useParams();
    const [userexamID,setUserExam]= useState();
    useEffect(() => {
        startFunction();
    }, [currQues, questions]);
   
    const startFunction = () => {
        UserExam();
        var data;
        var dataOptions;

        data = (questions[currQues].options)
        console.log(data)
        setOptions(data);

        for (let k = 0; k < data.length; k++) {
            dataOptions = (data[k].isCorrect);
            if (dataOptions == true) {
                setCorrect(data[k].option)
                console.log(data[k].option)
            }
        }
       


        // const { data } = questions[currQues]?.options[currQues];
        //   setOptions(data);
    }
    const UserExam = async () =>{
        const { data } = await axios.get(`http://localhost:5000/userexams/exam/${userId}/${examId}`);
        console.log(data);
        console.log(data[0]._id);
        setUserExam(data[0]._id);

    }
    console.log(userId);
    console.log(score);
    
    return (
        <div className="quiz">
            {questions ? (
                <>
                    <div className="quizInfo">
                        <span >
                            Score : {score}
                        </span>
                    </div>
                    <Question
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={correct}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                        userId={userId}
                        exam_id={userexamID}
                    />
                        <span style={{fontFamily:"Oswald",textTransform:"uppercase",  fontSize:22, position: 'fixed',top: '130px',right: '20px',}}>
                            Score : {score}0
                        </span>
                </>
            ) : (
                <div>Sorry we couldn't find any question</div>
            )}
        </div>
    );
};
export default Quiz;