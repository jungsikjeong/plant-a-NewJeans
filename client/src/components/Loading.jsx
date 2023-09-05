import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Wrapper = styled.div`
  img {
    width: 100%;
    max-width: 100px;
    height: 100%;
    border-radius: 50%;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Wrapper>
        <img src={'/images/loading.gif'} alt='' />
      </Wrapper>
    </Container>
  );
};

export default Loading;
