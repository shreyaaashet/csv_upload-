import React, { useState } from "react";
import CSVFileValidator from "csv-file-validator";
import { CSVLink } from "react-csv";

// import "./ValidateCSV.scss";

let requiredError = (headerName, rowNumber, columnNumber) => {
  return `<div class="red">${headerName} is required in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`;
};
let validateError = (headerName, rowNumber, columnNumber) => {
  return `<div class="red">${headerName} is not valid in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`;
};
let uniqueError = (headerName) => {
  return `<div class="red">${headerName} is not unique</div>`;
};
let isEmailValid = function (email) {
  let reqExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  return reqExp.test(email);
};
console.log("hello");
// let isPasswordValid = function (password) {
//   return password.length >= 4;
// };
let CSVConfig = {
  headers: [
    {
      name: "First Name",
      inputName: "firstName",
      required: true,
      requiredError
    },
    { name: "Last Name",
     inputName: "lastName",
      required: true, 
      requiredError },
    {
      name: "Email",
      inputName: "email",
      required: true,
      requiredError,
      // unique: true,
      uniqueError,
      validate: isEmailValid,
      validateError
    },

  ]
};
let headerCsvDownloadConfig = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },

 
];

export default function ValidateCSV() {
  let [csvData, setCsvData] = useState("");

  let handleChange = (e) => {
    CSVFileValidator(e.target.files[0], CSVConfig).then((csvData) => {
      csvData.inValidMessages.forEach((message) => {
        document
          .getElementById("invalidMessages")
          .insertAdjacentHTML("beforeend", message);
      });

      setCsvData(csvData.data);
    });
  };

  console.log({ csvData });

  return (
    <div className="validate-csv">
      <div className="input-box">
        <input type="file" accept=".csv" id="file" onChange={handleChange} />
        <div id="invalidMessages" />
      </div>
      <CSVLink
        className="download"
        headers={headerCsvDownloadConfig}
        data={csvData}
        filename="demo.csv"
        target="_blank"
      >
        Download
      </CSVLink>
    </div>
  );
}
