import Auth from "@/components/authentication/App";
import Navbar from "@/components/navbar/App";

const App = () => {
  return (
    <div>
      <Navbar newCss={"static"} />
      <Auth />
    </div>
  );
};

export default App;