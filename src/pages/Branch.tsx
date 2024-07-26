import { Toaster } from "react-hot-toast";
import AddBranch from "../components/branch/AddBranch";
import AllBranches from "../components/branch/AllBranches";
import NavBar from "../components/NavBar";

function Branch() {
  return (
    <>
      <NavBar />
      <AddBranch />
      <AllBranches />
      <Toaster position="top-right" />
    </>
  );
}

export default Branch;
