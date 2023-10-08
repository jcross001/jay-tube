import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import ErrorPage from "../error/ErrorPage";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `/api/videos/${type}`
        );
        setVideos(res.data);
        setErr(null);
      } catch (err) {
        setErr(err);
      }
    };
    fetchVideos();
  }, [type]);

  return err ? (
    <ErrorPage desc="Error Occured from Server!!!" />
  ) : (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
