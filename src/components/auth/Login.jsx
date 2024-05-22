import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(loginUser(user));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <>
  <StyledForm onSubmit={handleSubmit}>
           <h1>Login</h1>
           <InputWrapper>
           <StyledInput
             type="email"
             placeholder="email"
             onChange={(e) => setUser({ ...user, email: e.target.value })}
           />
           <AiOutlineMail/>
           </InputWrapper>
           <InputWrapper>
           <StyledInput
             type={showPassword ? "text" : "password"}
             placeholder="password"
             onChange={(e) => setUser({ ...user, password: e.target.value })}
           />
           {showPassword ? <AiFillEyeInvisible onClick={togglePasswordVisibility} ></AiFillEyeInvisible> : <AiFillEye onClick={togglePasswordVisibility} />}
           </InputWrapper>
           <button>
             {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
           </button>
           {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
           <Signup>
             <div>Create an account?<span><StyledLink to="/register">Sign up</StyledLink></span></div>
           </Signup>
         </StyledForm> 
    </>
  );
};

export default Login;


const Signup = styled.div`
  margin-top: 20px;
    color: #5c5c5c;
    font-size: 16px;
    font-weight: 500;

    span {
        color: #ff4141 ;
        font-weight: 500;
        cursor: pointer;
    }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 7px;

  svg {
    margin-right: 8px;
    color: #00483d;
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 7px;
`;

const StyledLink = styled(Link)`
  color: #00483d; 
  font-weight: inherit; 
  /* text-decoration: none;  */
  &:hover {
    text-decoration: underline; 
  }
`;