import React from 'react';
import { styled } from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: 64px;
  padding: 8px 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg.soft};
  color: ${({ theme }) => theme.colors.fg.contrast};
  ${({ theme }) => theme.media('sm')`
    padding: 16px 40px;
  `}
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <span> Some logo here</span>
  </HeaderWrapper>
);

export default Header;
