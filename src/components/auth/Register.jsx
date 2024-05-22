import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineUser,AiOutlineMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: "",
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
    dispatch(registerUser(user));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <>  
    <StyledForm onSubmit={handleSubmit}>
        <h1>Register</h1>
        <InputWrapper>
        <StyledInput
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <AiOutlineUser />
        </InputWrapper>
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
          {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
        <Signin>
             <div>Have account?<span><StyledLink to="/login">Sign in</StyledLink></span></div>
        </Signin>
        </StyledForm>
    </>
  );
};

export default Register;

const Signin = styled.div`
  margin-top: 20px;
    color: #5c5c5c;
    font-size: 16px;
    font-weight: 500;

    span {
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

