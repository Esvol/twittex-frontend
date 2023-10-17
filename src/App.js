import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import { useDispatch } from "react-redux";
import TagPosts from "./pages/TagPosts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/tags/:id" element={<TagPosts />} />

          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
