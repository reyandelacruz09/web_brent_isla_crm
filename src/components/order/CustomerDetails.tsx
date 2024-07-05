import NavBar from "../NavBar";
import CustomerDetails_L from "./CustomerDetails_L";
import CustomerDetails_R1 from "./CustomerDetails_R1";
import CustomerDetails_R2 from "./CustomerDetails_R2";

function CustomerDetails() {
  return (
    <>
      <NavBar />
      <div className="px-10 pt-5 flex">
        <div className="w-1/4 h-64 pt-3">
          <CustomerDetails_L />
        </div>
        <div className="pt-3 w-3/4">
          <div className="w-full">
            <CustomerDetails_R1 />
          </div>
          <div className="w-full">
            <CustomerDetails_R2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
