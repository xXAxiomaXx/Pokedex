import Title from "./pages/Title/index.jsx";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Title/>
      <Analytics />
    </>
  );
}

export default App;
