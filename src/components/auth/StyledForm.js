import styled from "styled-components";

// export const StyledForm = styled.form`
//   max-width: 350px;
//   width: 100%;
//   margin: 2rem auto;
export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 40px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  

  h1 {
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 800;
    color: #00483d;
  }

  button
   {
    height: 35px;
    width: 100%;
    padding: 7px;
    outline: none;
    background: #00483d;
    color: white;
    border-radius: 10px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;
    font-size: 16px;

    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }

  button {
    cursor: pointer;

    &:focus {
      border: none;
    }
  }

  p {
    font-size: 14px;
    color: red;
  }
`;
