import React, {useState, useEffect} from 'react'
import Layout from './components/Layout'
import Main from './components/Main'
import Signin from './components/widgets/Signin';
import { createBrowserRouter, RouterProvider , Navigate} from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Signup from './components/widgets/Signup';
import Register from './components/widgets/Register';
import Company from './components/widgets/Company';
import Loginlayout from './components/Loginlayout';
import About from './components/About';
import Moderator from './components/widgets/Moderator';
import Ctalk from './components/widgets/Ctalk';
import CompanyAddQuestion from './components/company/CompanyAddQuestion'
import Blog from './components/Blog';
import Service from './components/Service';
import Info from './components/widgets/Info';
import LMain from './components/Log/LMain'
import LAbout from './components/Log/LAbout'
import Profile from './components/Log/Profile';
import LService from './components/Log/LService';
import CompanySignin from './components/widgets/CompanySignin';


import { isAuthenticated } from './components/auth';
import { iCsAuthenticated } from './components/Cauth'
import CompanyLayout from './components/CompanyLayout'
import CompanyContact from './components/company/ContactRoyecruit';
import CompanyMails from './components/company/CompanyMails';

import JobOffer from './components/company/JobOffer';
import LInterview from './components/Log/LInterview';
import Offers from './components/Log/Offers';
import CompanyProfile from './components/company/CompanyProfile';
import Dashboard1 from './components/company/Dashboard1';
import Error from './components/company/Error';
import UserAnswer from './components/company/UserAnswer';
import Resume from './components/Log/Resume';

import QuizController from "./components/company/QuizController";
import Result from "./components/quizHandler/Result";
import TestQCM from './components/company/TestQCM';
import ExamReview from './components/company/ExamReview';
import Anlyze from './components/company/Anlyze';
import Reports from './components/company/Reports';
import CreateQuiz from './components/company/CreateQuiz';
import UpdateTest from './components/company/UpdateTest';





function App() {

  const isAuth = isAuthenticated();
  const CisAuth = iCsAuthenticated();


  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '8px',
    backgroundColor: '#339476',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    opacity: showButton ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  const iconstyle = {
    width: '20px',
    height: '20px',
  };


  const router = createBrowserRouter([
    {
      path : '/',
      element :<Layout> <Main/> </Layout>
    },
    {
      path : '/about',
      element :<Layout> <About/> </Layout>
    },
    {
      path : '/blog',
      element :<Layout> <Blog/> </Layout>
    },
    {
      path : '/service',
      element :<Layout> <Service/> </Layout>
    },
    {
      path : '/info',
      element :<Layout> <Info/> </Layout>
    },
    {
      path : '/signin',
      element : <Signin/>
    },
    {
      path : '/signup',
      element :<Signup/>
    },
    {
      path : '/companysignin',
      element :<CompanySignin/>
    },
    {
      path : '/client',
      element : <Register/>
    },
    {
      path : '/company',
      element : <Company/>
    },
    {
      path : '/moderator',
      element : <Layout> <Moderator/> </Layout>
    },
    {
      path : '/ctalk',
      element : <Layout> <Ctalk/> </Layout>
    },
    {
    path : '/lmain',
    element : isAuth ? <Loginlayout> <LMain/> </Loginlayout> : <Navigate to='/' replace/>
    },
    {
      path : '/labout',
      element : isAuth ? <Loginlayout> <LAbout/> </Loginlayout> : <Navigate to='/' replace/>
      },
      {
        path : '/lservice',
        element : isAuth ? <Loginlayout> <LService/> </Loginlayout>: <Navigate to='/' replace/>
        },
      {
      path : '/linterview',
      element : isAuth ? <Loginlayout> <LInterview/> </Loginlayout>: <Navigate to='/' replace/>
      },
      {
        path : '/jobOffers',
        element : isAuth ? <Loginlayout> <Offers/> </Loginlayout>: <Navigate to='/' replace/>
        },
    {
    path : '/profile',
    element :isAuth ? <Loginlayout> <Profile/> </Loginlayout> : <Navigate to='/' replace/>
    },
    {
    path : '/evaluation',
    element :CisAuth ? <CompanyLayout> <CompanyAddQuestion/> </CompanyLayout>  : <Navigate to='/' replace/>
    },
    {
    path : '/royecruit',
    element :CisAuth ? <CompanyLayout> <CompanyContact/> </CompanyLayout>  : <Navigate to='/' replace/>
    },
    {
    path : '/messages',
    element :CisAuth ? <CompanyLayout> <CompanyMails/> </CompanyLayout>  : <Navigate to='/' replace/>
    },
    {
    path : '/job',
    element :CisAuth ? <CompanyLayout> <JobOffer/> </CompanyLayout>  : <Navigate to='/' replace/>
    },
    {
    path : '/companyprofile',
    element :CisAuth ? <CompanyLayout> <CompanyProfile/> </CompanyLayout>  : <Navigate to='/' replace/>
    }, 
    {
      path : '/companydashboard',
      element :CisAuth ? <CompanyLayout> <Dashboard1/> </CompanyLayout>  : <Navigate to='/' replace/>
    },     
    {
      path:"/userAnswer/:id",
      element:CisAuth ? <CompanyLayout>  <UserAnswer/> </CompanyLayout>  : <Navigate to='/' replace/>
    },
    {
      path : '/testqcm/:id',
      element :CisAuth ? <CompanyLayout> <TestQCM/> </CompanyLayout>  : <Navigate to='/' replace/>
      }, 
  {
    path : '/create/:examId/:userId',
    element :CisAuth ? <CompanyLayout> <CreateQuiz/> </CompanyLayout>  : <Navigate to='/' replace/>
  },
  {
    path : '/examreview/:examId',
    element :CisAuth ? <CompanyLayout> <ExamReview/> </CompanyLayout>  : <Navigate to='/' replace/>
  },
  {
    path : '/anlyze/:examId',
    element :CisAuth ? <CompanyLayout> <Anlyze/> </CompanyLayout>  : <Navigate to='/' replace/>
  },
  {
    path : '/updatest/:examId/:userId',
    element :CisAuth ? <CompanyLayout> <UpdateTest/> </CompanyLayout>  : <Navigate to='/' replace/>
  }, 
  {
    path : '/reports/:userId',
    element : isAuth ? <Loginlayout> <Reports/> </Loginlayout> : <Navigate to='/' replace/>
    },
    {
      path : '/quiz/:examId/:userId',
      element : isAuth ? <Loginlayout> <QuizController/> </Loginlayout> : <Navigate to='/' replace/>
      }, 
      {
        path : '/result/:examId/:userId',
        element : isAuth ? <Loginlayout> <Result/> </Loginlayout> : <Navigate to='/' replace/>
        },

    {
      path:'/resume',
      element:isAuth ? <Loginlayout> <Resume/> </Loginlayout> : <Navigate to='/' replace/>
    },

    {
      path : '*',
      element : <Error/>
    }
  ])

  return (
    <React.Fragment>
      <RouterProvider router={router} />
        <button onClick={handleClick} style={buttonStyle}>
      <KeyboardArrowUpIcon style={iconstyle}/>
    </button>
    </React.Fragment>
  )
}

export default App;