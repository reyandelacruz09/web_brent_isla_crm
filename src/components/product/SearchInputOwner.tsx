import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useClientListQuery } from "../../store";

// export interface Client {
//   data(data: any): unknown;
//   id: number;
//   name: string;
// }

// export default function SearchInputOwner() {
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState<readonly Client[]>([]);
//   const loading = open && options.length === 0;

//   const { data, error, isLoading, isSuccess } = useClientListQuery("");

//   React.useEffect(() => {
//     if (isSuccess) {
//       let result: any = [];
//       let content: any = [];
//       result = data;

//       const size = Object.keys(result.data).length;
//       const client: Client[] = [];

//       for (let i = 0; i < size; i++) {
//         client.push({
//           id: result.data[i].id,
//           name: result.data[i].name,
//         });
//       }

//       setOptions(client);
//     }
//   }, [data, isSuccess]);

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     return () => {
//       active = false;
//     };
//   }, [loading]);

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([...options]);
//     }
//   }, [open]);

//   return (
//     <Autocomplete
//       className="w-full"
//       id="asynchronous-demo"
//       //sx={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       isOptionEqualToValue={(option, value) => option.id === value.id}
//       getOptionLabel={(option) => option.name}
//       options={options}
//       loading={loading}
//       renderInput={(params) => (
//         <TextField
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm"
//           {...params}
//           fullWidth
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : null}
//                 {params.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//             style: { fontSize: 14, padding: 0 },
//           }}
//         />
//       )}
//     />
//   );
// }
