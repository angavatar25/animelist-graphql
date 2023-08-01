import { useEffect } from "react";
import useRequester from "../hooks/useRequester";

const TestComponent = () => {
  const { fetchAnimeList } = useRequester();
  useEffect(() => {
    fetchAnimeList();
  }, []);
  return (
    <div>
      test
    </div>
  )
};

export default TestComponent;