import styled from 'styled-components';

export const Content = styled.div`
  padding: 20px;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 20px;
  display: flex;
  color: white;
  background-color: ${({ sentiment }) => {
    if (sentiment < -6) {
      return '##f44641';
    }
    if (sentiment >= -6 && sentiment < -2) {
      return '#f46242';
    }
    if (sentiment >= -2 && sentiment < 2) {
      return '#f49d41';
    }
    if (sentiment >= 2 && sentiment < 6) {
      return '#41a3f4';
    }
    if (sentiment >= 6) {
      return '#7941f4';
    }
    return 'black';
  }};
`;

export const Tweet = styled.div`
  margin-top: 25%;
`;

export const SearchInput = styled.input`
  border-radius: 15px 0 0 15px;
  height: 30px;
  padding: 0 10px;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  background-color: #fff;
  border-radius: 0 15px 15px 0;
  height: 30px;
  padding: 0 8px;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    color: red;
  }
`;
