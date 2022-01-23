import styled from 'styled-components';

const Row = styled.div<{ centered?: boolean }>`
  display: flex;
  justify-content: ${({ centered }) => (centered ? 'center' : 'space-between')};
  align-items: baseline;
`;

export default Row;
