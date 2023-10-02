import React from 'react';
import { keyframes, styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Styles';
import { api } from '../../api';

// 페이지 전환효과
const ScreenFrames = keyframes`
 from{
  transform:translateY(-10px);
 }
 to{
  transform:translateY(0);
 }
`;

const Form = styled.form`
  animation: ${ScreenFrames} 0.75s;
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.786rem;
    margin-top: 0.2rem;
    padding: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #bbb;
  transition: all 0.3s ease;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border: 1px solid #777;
  }
`;
const Message = styled.div`
  text-align: center;
  margin: 0.5rem 0;
  color: tomato;
  font-size: 0.785rem;
`;

const EditFormButton = styled(Button)<{ buttonStyles: string }>`
  cursor: ${({ buttonStyles }) => (buttonStyles ? 'pointer' : 'default')};
  margin-top: 0;
  transition: all 0.3s ease;
  color: #ffffff;
  font-weight: bold;
  background-color: ${({ buttonStyles }) => (buttonStyles ? 'gray' : '#eee')};
`;

interface ICheckForm {
  setFormVisible: (visible: boolean) => void;
  setUserCheck: (visible: boolean) => void;
  email: string;
}

const CheckForm = ({ setFormVisible, setUserCheck, email }: ICheckForm) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/users/password/check', {
        email: email,
        password: data.password,
      });

      if (res.status === 200) {
        setFormVisible(true);
        setUserCheck(false);
        alert('인증완료');
      }
    } catch (err: any) {
      console.log(err);
      alert(err?.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p>정보 확인을 위해 비밀번호를 입력해주세요</p>
      <Input
        type='password'
        placeholder='비밀번호 입력'
        {...register('password', {
          required: true,
          maxLength: {
            value: 6,
            message: '6글자이하로 입력해주세요',
          },
          minLength: {
            value: 6,
            message: '6글자까지 입력해주세요.',
          },
        })}
      />
      {errors && <Message>{errors.password?.message as any}</Message>}

      <EditFormButton buttonStyles={isValid ? 'true' : ''}>
        입력하기
      </EditFormButton>
    </Form>
  );
};
export default CheckForm;
