import React from "react";

const Dashboard_Content = () => {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("user_info") || "{}"
  );
  return (
    <>
      <div>
        Welcome {account_detailed1.first_name} {account_detailed1.last_name}
      </div>
    </>
  );
};

export default Dashboard_Content;
