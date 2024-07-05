import { Button } from "@mui/material";

function CustomerDetails_R1() {
  return (
    <>
      <div className="flex gap-4 pb-3 justify-end">
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="primary"
        >
          <span className="">Accept Order</span>
        </Button>
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="secondary"
        >
          <span className="">Dispatch Order</span>
        </Button>
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="success"
        >
          <span className="">Complete Order</span>
        </Button>
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="error"
        >
          <span className="">Cancel Order</span>
        </Button>
      </div>
    </>
  );
}

export default CustomerDetails_R1;
