import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <p>NavBar</p>
      <Outlet />
      <p>Footer</p>
    </>
  );
}

export default App;
