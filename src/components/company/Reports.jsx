import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormHelperText, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const GradientAnimation = keyframes`
0% {
  background-position: 0 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0 50%;
}
`;

const Span = styled('span')(({ theme }) => ({
  background: `linear-gradient(-45deg, #0077be, #00ad7c ,#0077be)`,
  backgroundSize: '400% 400%',
  animation: `${GradientAnimation} 3s ease-in-out infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const Container = styled.div`
  height: 100%;
  margin: 4% 7%;
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px 8px;
  text-align: left;
  background-color: black;
  color: white;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Header = styled.h1`
  text-align: center;
  padding-bottom: 10px;
  colot: #222831;
`;

const Button = styled.button`
  background-color: #393e46;
  color: #eeeeee;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Reports = () => {
  const [userDatas, setUserDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examDatas, setExamDatas] = useState([]);
  const [companyDatas, setCompanyDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state variable for search query
  const { userId } = useParams();

  const getExamDatas = async () => {
    const response = await axios.get(`http://localhost:5000/exam`);
    setExamDatas(response.data);
    setIsLoading(false);
  };

  const getCompanyData = async (creatorUserId) => {
    try {
      const response = await axios.get(`http://localhost:5000/royecruit/companyinfoos/${creatorUserId}`);
      console.log(response.data); // Check the response data
      return response.data.companyname;
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const getcompanyDatas = async () => {
    const companyNames = await Promise.all(examDatas.map((exam) => getCompanyData(exam.creatorUserId)));
    console.log(companyNames); // Check the company names array
    setCompanyDatas(companyNames);
  };

  useEffect(() => {
    getcompanyDatas();
  }, [examDatas]);

  useEffect(() => {
    getUserDatas();
    getExamDatas();
  }, []);

  const getUserDatas = async () => {
    const { data } = await axios.get(`http://localhost:5000/userexams/` + userId);
    setUserDatas(data);
    console.log(data);
  };

// Filter examDatas and companyDatas based on search query
const filteredExamDatas = examDatas.filter((exam, index) =>
  companyDatas[index]?.toLowerCase().includes(searchQuery.toLowerCase())
);
const filteredCompanyDatas = companyDatas.filter((company) =>
  company?.toLowerCase().includes(searchQuery.toLowerCase())
);


  if (isLoading) {
    return (
      <>
        <div
          style={{
            verticalAlign: 'middle',
            display: 'flex',
            border: '16px solid #f3f3f3',
            borderRadius: '50%',
            borderTop: '16px solid #3498db',
            width: '120px',
            height: '120px',
            WebkitAnimation: 'spin 2s linear infinite',
          }}
        ></div>
      </>
    );
  }

  return (
    <>
      <Container>
        <Typography sx={{fontFamily:"Oswald", fontSize:50, textAlign:"center", mt:15, fontWeight:"bold"}}>Find The Job <Span>You've Been Waiting</Span> For</Typography>
        <Typography sx={{fontFamily:"Oswald", fontSize:22, textAlign:"center", fontWeight:"300"}}>Today Is Yours And So Is The Job, Go For It.</Typography>

<Typography sx={{mt:8}}></Typography>
         <span style={{fontFamily:"Oswald"}}>Find Job</span> <SearchBar
          type="text"
          placeholder="Search By Company"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <FormHelperText sx={{ color:"black", fontFamily:"Oswald"}}>Use The Search Bar To Filter The Offers</FormHelperText>
       

        <Table>
          <Tr>
            <Th>Exam Name</Th>
            <Th>Company Name</Th>
            <Th>Link</Th>
            <Th>Score</Th>
          </Tr>
          {filteredExamDatas.map((exam, index) => (
            <Tr key={index}>
              <Td>{exam.examname}</Td>
              <Td>{filteredCompanyDatas[index]}</Td>
              <Td>
                {userDatas.findIndex((u) => u.examId === exam._id) > -1 ? (
                  <p>You passed this exam</p>
                ) : (
                  <Link to={`/quiz/${exam._id}/${userId}`}>
                    <Button>Go to exam</Button>
                  </Link>
                )}
              </Td>
              <Td>
                {userDatas.findIndex((u) => u.examId === exam._id) > -1 ? (
                  <span
                    style={{
                      border: 'none',
                      borderRadius: '10px',
                      padding: '5px',
                      color: '#080808',
                      fontWeight: '500',
                    }}
                  >
                    {userDatas.find((u) => u.examId === exam._id).grade}0
                  </span>
                ) : (
                  <span
                    style={{
                      border: 'none',
                      borderRadius: '10px',
                      padding: '5px',
                      backgroundColor: '#007E33',
                      color: '#EEEEEE',
                      fontWeight: '500',
                    }}
                  >
                    Available
                  </span>
                )}
              </Td>
            </Tr>
          ))}
        </Table>
      </Container>
    </>
  );
};

export default Reports;