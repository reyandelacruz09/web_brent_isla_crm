import React from "react";

interface date_formattedProps {
  date_formatted: string;
}
function Date_Format({ date_formatted }: date_formattedProps) {
  const date = new Date(date_formatted);

  if (isNaN(date.getTime())) {
    return <span>-</span>;
  }

  // Format the date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedDate = `${month}/${day}/${year} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return <span>{formattedDate}</span>;
}

export default Date_Format;
