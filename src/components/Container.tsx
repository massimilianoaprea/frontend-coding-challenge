import styled from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.xs.viewport}px) {
    max-width: 100%;
    padding: 0 ${theme.spacing(3)};
  }

  @media (min-width: ${theme.breakpoints.xs.viewport}px) and (max-width: ${theme
      .breakpoints.md.viewport}px) {
    max-width: ${theme.breakpoints.md.container}px;
    padding: 0 ${theme.spacing(3)};
  }

  @media (min-width: ${theme.breakpoints.md.viewport}px) and (max-width: ${theme
      .breakpoints.lg.viewport}px) {
    max-width: ${theme.breakpoints.lg.container}px;
    padding: 0 ${theme.spacing(3)};
  }

  @media (min-width: ${theme.breakpoints.lg.viewport}px) {
    max-width: ${theme.breakpoints.lg.container}px;
  }
`;

export default Container;
