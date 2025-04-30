import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const DetailPage = ({ data }) => {
  // console.log("data :>> ", data);
  const { id } = useParams();
  const [activePopup, setActivePopup] = useState(null);

  // Find the current image
  const Maquina = data["1"] && `${data["1"][0]["Modelo maquina"]}`;
  const currentImage = `/${Maquina}.svg`;

  if (!currentImage) {
    return <div className="p-6">Image not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-64px)]">
      {/* Contenedor con texto e imagen */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Texto superior */}
        <div className="p-1 flex items-end justify-between">
          <Link to="/" className="text-blue-500 hover:underline mr-4">
            &larr; Volver a Galeria
          </Link>
          <h1 className="text-2xl font-bold">{Maquina}</h1>
        </div>
        {/* Imagen */}
        <div className="rounded-lg overflow-hidden shadow-lg h-full flex items-center justify-center">
          <img
            src={currentImage}
            alt={Maquina}
            className="object-contain bg-gray-100 max-h-full max-w-full"
          />
        </div>
      </div>

      {/* Sidebar con botones o referencias */}
      <div className="flex flex-col justify-start md:w-64 w-full bg-gray-200 p-2 md:border-l border-t border-gray-300">
        <h2 className="w-full text-lg text-center font-semibold mb-2">
          Referencias
        </h2>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {data.map((posicion, i) => (
              <React.Fragment key={i}>
                {/* Botón que activa un modal */}
                <label
                  htmlFor={`modal-${i}`}
                  className="btn w-full text-center py-2 px-2 bg-dark font-semibold hover:bg-lime-300 rounded-md shadow-sm transition-colors"
                >
                  {i + 1} - {posicion[0]["Descripción"]}
                </label>
                <input
                  type="checkbox"
                  id={`modal-${i}`}
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box relative max-w-[90vw] p-4">
                    <label
                      htmlFor={`modal-${i}`}
                      className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500"
                    >
                      ✕
                    </label>
                    <h3 className="font-bold text-lg text-center mb-4">
                      {posicion[0]["Descripción"]}
                    </h3>
                    <div className="flex flex-col md:flex-row h-[90vh] w-full rounded-lg">
                      {/* Imagen principal dentro del modal */}
                      <div className="rounded-lg flex-grow overflow-hidden shadow-lg h-full flex items-center justify-center">
                        <img
                          src={`/${Maquina}_${i + 1}.svg`}
                          alt={`/${Maquina}_${i + 1}.svg`}
                          className="object-contain bg-gray-100 max-h-full max-w-full"
                        />
                      </div>

                      {/* Sidebar interno con botones/detalles en el modal */}

                      <div className="flex flex-col justify-start md:w-64 w-full bg-gray-200 p-2 md:border-l border-t border-gray-300 mt-4 md:mt-0">
                        {/* Título siempre visible */}

                        {/* Imagen solo en pantallas pequeñas */}
                        <img
                          src={
                            currentImage
                          } /* o la fuente de imagen que corresponda */
                          alt={Maquina}
                          className="block md:hidden object-contain bg-gray-100 w-full mb-4"
                        />

                        {/* Botones / Contenido collapse */}
                        <div className="flex-1 overflow-y-auto">
                          <h2 className="w-full text-lg text-center font-semibold mb-2">
                            Referencias
                          </h2>
                          <div className="grid grid-cols-1 gap-4">
                            {posicion.map((elemento, j) => {
                              let background = "#998e93";
                              if (elemento?.["SS"] === 1)
                                background = "#ff5c53"; // rojo
                              else if (elemento?.["SS"] >= 3)
                                background = "#43ff7f"; // verde
                              else if (elemento?.["SS"] >= 2)
                                background = "#ffb533"; // naranja

                              return (
                                <div
                                  key={j}
                                  className="collapse bg-base-100 border-base-300 border"
                                >
                                  <input type="checkbox" />
                                  <div
                                    className="collapse-title font-bold text-sm"
                                    tabIndex={0}
                                    style={{ backgroundColor: background }}
                                  >
                                    {j + 1} - {elemento?.["descripcion VTM"]}
                                  </div>
                                  <div className="collapse-content text-sm">
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Posición:
                                      </strong>{" "}
                                      {elemento?.["Posición2"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Pieza:
                                      </strong>{" "}
                                      {elemento?.["descripcion VTM"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Código catálogo:
                                      </strong>{" "}
                                      {elemento?.["Código catálogo"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        cod VTM:
                                      </strong>{" "}
                                      {elemento?.["cod VTM"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Descripción:
                                      </strong>{" "}
                                      {elemento?.["Descripción"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Diseño N°:
                                      </strong>{" "}
                                      {elemento?.["Diseño N°"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Cant. conjuntos:
                                      </strong>{" "}
                                      {elemento?.["Cant. conjuntos"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Cant. por conjunto:
                                      </strong>{" "}
                                      {elemento?.["Cant. por conjunto"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        Cant. total:
                                      </strong>{" "}
                                      {elemento?.["Cant. total"]}
                                    </p>
                                    <p className="font-semibold text-xs">
                                      <strong className="font-semibold text-sm text-blue-700">
                                        SS:
                                      </strong>{" "}
                                      {elemento?.["SS"]}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
