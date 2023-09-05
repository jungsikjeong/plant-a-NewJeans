import { styled } from 'styled-components';

export const Button = styled.button<{ bgColor?: string }>`
  margin-top: 0.6rem;
  background-color: ${({ bgColor }) => bgColor};
  color: #ffffff;
  border-radius: 5px;
  padding: 0.5rem 1rem;

  span {
    font-family: ${({ theme }) => theme.fonts.logo};
  }
`;

export const EditFormButton = styled(Button)<{ buttonStyles: string }>`
  cursor: ${({ buttonStyles }) => (buttonStyles ? 'pointer' : 'default')};
  transition: all 0.3s ease;
  color: #ffffff;
  font-weight: bold;
  background-color: ${({ buttonStyles }) => (buttonStyles ? 'gray' : '#eee')};
`;
