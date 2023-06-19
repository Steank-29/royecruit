import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "../quizHandler/Quiz";
import { useParams, useNavigate, Link } from 'react-router-dom';
import CountDownTimer from "../CountDownTimer";

const QuizController = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timerData, setTimerData] = useState(0);
  const [userexamId, setUserExam_id] = useState("");
  const navigate = useNavigate();
  const { examId, userId } = useParams();

  useEffect(() => {
    getExams();
  }, []);

  const getExams = async () => {
    const { data } = await axios.get('http://localhost:5000/examquestions/' + examId);
    setQuestions(data);
    setIsLoading(false);
    securityData()
  }

  const securityData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${authToken}` } };

      const { data } = await axios.get(`http://localhost:5000/royecruit/users/stage/${userId}`, config);
      const { data: examData } = await axios.get(`http://localhost:5000/exam/exam/${examId}`, config);

      const dummyData = {
        userId: userId,
        examId: examId,
        userInfo: {
          username: data.firstname + " " + data.lastname,
          examname: examData[0].examname,
          email:data.email,
          score: 0,
        }
      };

      const response = await axios.post("http://localhost:5000/userexams/", dummyData);
      console.log(response.status);
      console.log(response.data);

      if (response.data && response.data.length > 0) {
        setUserExam_id(response.data[0]._id);
        console.log(response.data[0]._id);
      }

      setTimerData(examData[0].time);

      setTimeout(() => {
        navigate(`/result/${examId}/${userId}`);
      }, (examData[0].time * 60) + "000");
    } catch (error) {
      console.log(error);
    }
  }

  const hoursMinSecs = { hours: 0, minutes: timerData, seconds: 0 };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          verticalAlign: "middle", display: "inline-block",
          border: "16px solid #f3f3f3", borderRadius: "50%",
          borderTop: "16px solid #3498db", width: "120px", height: "120px",
          WebkitAnimation: "spin 2s linear infinite"
        }}></div>
      </div>
    );
  }

  return (
    <div>
      <CountDownTimer hoursMinSecs={hoursMinSecs} />

      <Quiz
        questions={questions}
        score={score}
        setScore={setScore}
        setQuestions={setQuestions}
        userId={userId}
        exam_id={userexamId}
      />

      <CountDownTimer hoursMinSecs={hoursMinSecs} />
      </div>
      );
}

export default QuizController;