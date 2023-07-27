import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const SLink = styled(Link)``;

interface CustomLinkProps {
  children: ReactNode;
  to: string;
  onMenuClick?: () => void;
}

const CustomLink = ({ children, onMenuClick, to }: CustomLinkProps) => {
  const onLinkClick = () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0 });
    if (onMenuClick) {
      onMenuClick();
    }
  };
  return (
    <SLink to={to} onClick={onLinkClick}>
      {children}
    </SLink>
  );
};

export default CustomLink;
