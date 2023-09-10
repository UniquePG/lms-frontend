
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const HomeLayout = ({ children }) => {

  return (
    <div className="min-h-[90vh] bg-base-200">
      <div className="shadow-md">
            {/* Make a drawer (header/sidebar/navbar) using daisy ui */}
        <Navbar />
      </div>

      {/* children ui  */}
      {children}

      {/* footer element */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
