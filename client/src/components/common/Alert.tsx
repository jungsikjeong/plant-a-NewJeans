import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

const Component = styled.div`
  p {
    color: tomato;
    padding: 0.5rem;
  }
`;

const Alert = ({ children }: { children: ReactNode }) => {
  return (
    <Component>
      <p>{children}</p>
    </Component>
  );
};

export default Alert;
