import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components"
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SingleQuestion = styled.div`
  width: 95%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 5px solid grey;
  padding: 20px;
  margin-top: 10px;
`
const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`
const SingleOption = styled.button`
  width: 46%;
  height: 50px;
  padding: 15px 20px;
  margin: 10px;
  box-shadow: 0 0 2px black;
`
const Control = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
const Select = styled.div`
  background-color: rgb(7, 207, 0);
  color: white;
  box-shadow: 0 0 1px black;
`
const Wrong = styled.div`
  background-color: rgb(233, 0, 0);
  color: white;
  box-shadow: 0 0 1px black;
`

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  userId,
  exam_id
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userexamId, setUserexamId] = useState();



  const navigate = useNavigate()

  const {examId} = useParams();
 

  useEffect(() => {
    handleCreatorUser();
  }, [])

  const handleCreatorUser = async () => {
    const { data } = await axios.get('http://localhost:5000/exam/exam/' + examId)
    setPass(data[0].creatorUserId == userId)
    setIsLoading(false)
  }

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) { setScore(score + 1); }
    setError(false);
  };

  const handleNext = () => {
    if (currQues >= (questions.length - 1)) {
      navigate(`/result/${examId}/${userId}`);
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };
 const userIdFunction= async () => {
  const { data } = await axios.get(`http://localhost:5000/userexams/exam/${userId}/${examId}`);
  console.log(data);
  console.log(data[0]._id);
  setUserexamId(data[0]._id);

 }
 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(score);
  userIdFunction();
  try {
    await axios.delete(`http://localhost:5000/userexams/many/${userId}/${examId}`);
    console.log("Duplicate user exams deleted successfully.");
  } catch (error) {
    console.error("Failed to delete duplicate user exams:", error);
  }
  const userExam = {
    grade: score,
  };
  axios.patch(`http://localhost:5000/userexams/userexam/${userId}/${examId}`, userExam).then((response) => {
    console.log(response.status);
    console.log(response.data);
  });
};




  const handleReview = (i) => {
    if (pass == userId) {
      console.log("datas did not saved")
    } else {
      const userOptions = {
        examReview: {
          qAnswers: i,
          qCorrect: correct,
          qTitle: questions[currQues].questionTitle,
        }
      };
      userIdFunction();
      console.log(userOptions)
      axios.put(`http://localhost:5000/userexams/${examId}/${userId}`, userOptions).then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
    }
  }

  if (isLoading) {
    return (
      <>

        <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", 
        borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", 
        WebkitAnimation: "spin 2s linear infinite" }}></div>
      
      </>)
  }
  return (
    <Container>
      <h1 style={{fontFamily:"Oswald", marginTop:100, fontWeight:"bold", textTransform:"uppercase", marginBottom:25}}>Question Number {currQues + 1} :</h1>
      <SingleQuestion>
        <h2>{questions[currQues].questionTitle}</h2>
        <Options>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((option) => (
              <button className={`singleOption  ${selected && handleSelect(option.option)}`}
                key={option._id} creator
                onClick={() => { handleCheck(option.option); handleReview(option.option) }}
                disabled={selected}>
                {option.option}
              </button>
            ))}
        </Options>
        <Control>
          <button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185, height:40, color:"black", background:"#eee" }}
            onClick={handleNext}>
            {currQues >= (questions.length - 1) ? (<span onClick={handleSubmit} >Submit</span>)
             : (<span onClick={handleSubmit}>Next Question</span>)}
          </button>
        </Control>
      </SingleQuestion>
    </Container >
  );
};

export default Question;