import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button } from "@mui/material";

const Container = styled.div`
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
  margin-Top:80px;
`
const Header = styled.h1`
  text-align:center;
  padding-bottom:10px;
  colot:#222831;
  margin-Top:10px;
  font-Family:"Oswald";
`

const Result = () => {

  const [score, setScore] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {examId , userId} = useParams();
  

  useEffect(() => {
    getExamNames();
  }, [setScore])

  const getExamNames = async () => {
    const { data } = await axios.get(`http://localhost:5000/userexams/exam/${userId}/${examId}`);
    setScore(data);
    console.log(data);
    getPassGrade();
  }
  const deleted = async () => {
    axios.delete('http://localhost:5000/userexams/' ).then((response) => {
        console.log(response.status);
        console.log(response.data);
    });
}
  const getPassGrade = async () => {
    await axios.get(`http://localhost:5000/exam/exam/${examId}`).then((response) => {
      setPassGrade(response.data);
      console.log(response.data);
    });
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <>
        
        <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", WebkitAnimation: "spin 2s linear infinite" }}></div>
     
      </>)
  }
  return (
    <>
      
      <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <Header>Result </Header>
        <span style={{fontFamily:"Oswald", fontSize:20}}>Final Score : <u>{score[0]?.grade}0</u></span> <br />
        {passGrade[0]?.passGrade <= score[0]?.grade ? (<><span>congratulations you passed the exam</span><br />
        <img src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png" 
        style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>) 
        : (<><span style={{fontFamily:"Oswald", fontSize:20}}>sorry you failed the test</span><br />
        <img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png" 
        style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>)}
       <Link to={`/reports/${userId}`}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
          >
            Go to dashboard
          </Button>
        </Link>
      </Container>
  
    </>
  );
};

export default Result;