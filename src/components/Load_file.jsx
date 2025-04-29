import React from "react";
import * as XLSX from "xlsx";

const LoadFile = ({ show, handleClose, onFileLoaded }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const maxColumns = 15;
        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        if (range.e.c >= maxColumns) {
          range.e.c = maxColumns - 1;
          worksheet["!ref"] = XLSX.utils.encode_range(range);
        }

        const json = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });
        onFileLoaded(json);
        handleClose();
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    show && (
      <div className="modal modal-open  z-50">
        <div className="modal-box relative max-w-xl bg-sky-100 p-6 rounded-lg shadow-lg">
          {/* Close Button
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button> */}
          {/* Header */}
          <h3 className="font-bold text-lg text-center text-gray-800 mb-4">
            Cargar Excel
          </h3>
          {/* Instruction Text */}
          <p className="text-gray-600 text-sm text-center mb-4">
            Excel que contenga la disponibilidad de las piezas en el almacén.
          </p>
          {/* File Input */}
          <div className="text-center ">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="file-input file-input-accent file-input-bordered w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default LoadFile;
