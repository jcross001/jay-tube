import styled from "styled-components";

const Container = styled.div``;

const Content = styled.h2`
  color: red;
`;

const ErrorPage = ({ desc }) => {
  return (
    <Container>
      <Content>{desc}</Content>
    </Container>
  );
};

export default ErrorPage;
