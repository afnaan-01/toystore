import Auth from "@/components/authentication/App";
import Navbar from "@/components/navbar/App";
import { Suspense } from "react";

const App = () => {
  return (
    <div>
      <Navbar newCss={"static"} />
      <Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </Suspense>
    </div>
  );
};

export default App;