import React, { useEffect } from "react";
import * as XLSX from "xlsx";

const LoadInternalFile = ({ filePath, onFileLoaded }) => {
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(filePath);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          
          // Limit the number of columns (optional)
          const maxColumns = 15;
          const range = XLSX.utils.decode_range(worksheet["!ref"]);
          if (range.e.c >= maxColumns) {
            range.e.c = maxColumns - 1;
            worksheet["!ref"] = XLSX.utils.encode_range(range);
          }

          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          onFileLoaded(json);
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error loading the file:", error);
      }
    };

    fetchFile();
  }, [filePath, onFileLoaded]);

  return (
    <div className="p-4 bg-sky-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-center text-gray-800 mb-4">
        Cargando Excel...
      </h3>
      <p className="text-sm text-gray-600 text-center">
        Procesando datos desde el archivo interno.
      </p>
    </div>
  );
};

export default LoadInternalFile;
