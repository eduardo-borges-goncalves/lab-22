import styled, { css } from "styled-components";

import { MenuPaymentProps } from ".";

export const Wrapper = styled.nav<Pick<MenuPaymentProps, "isOpen">>`
  padding: 6.4rem 6.2rem 4rem 3rem;
  height: 100%;

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
  overflow-y: auto;

  h4 {
    margin-bottom: 3.2rem;
  }

  ${({ isOpen, theme }) => css`
    display: ${isOpen ? "block" : "none"};
    background-color: ${theme.colors.white};
  `}
`;

export const Subtotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.6rem;

  > svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    width: 3rem;
  }
`;
