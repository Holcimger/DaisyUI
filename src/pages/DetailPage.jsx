import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "./NotFoundPage"; // Import the 404 component

const DetailPage = ({ data }) => {
  console.log("data :>> ", data);
  if (!data) {
    return <></>; // Render a fallback component or return null
  }

  // Find the current image
  const Maquina = data["0"] && `${data["0"][0]["Modelo maquina"]}`;
  const currentImage = `/${Maquina}.svg`;

  if (!currentImage) {
    return <div className="p-6">Image not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-64px)] maxh-full bg-neutral-200">
      {" "}
      {/* Contenedor principal*/}
      {/* Texto Izquierda */}
      {/* Imagen */}
      <img
        src={currentImage}
        alt={Maquina}
        loading="lazy"
        className="flex-grow m-1 p-1 object-contain bg-neutral-100 max-h-full max-w-full rounded-md"
      />
      {/* Sidebar con botones o referencias */}
      <div className="flex flex-col w-full md:w-64 justify-start bg-stone-100 m-1 p-1 rounded-md overflow-y-auto">
        <div className="flex flex-col items-center justify-star bg-neutral-100 h-fit  rounded-md">
          <h1 className="text-xs md:text-2xl font-bold text-center mb-5">
            {Maquina}
          </h1>
          <Link
            to="/"
            className="text-blue-500 text-center hover:underline text-xs md:text-lg mb-5"
          >
            &larr; Volver al inicio
          </Link>
        </div>
        <h1 className="text-xs md:text-2xl font-bold text-center">
          Referencias
        </h1>
        <div className="m-1 p-1">
          <div className="grid grid-cols-1 gap-4">
            {data.map((posicion, i) => (
              <React.Fragment key={i}>
                {/* Botón que activa un modal */}
                <label
                  htmlFor={`modal-${i}`}
                  className="btn w-full text-start font-semibold bg-[#04bbf1] hover:bg-[#94c12e] rounded-md min-h-13 h-fit"
                >
                  <div>{i + 1}</div>
                  <div className="w-full text-start">
                    {posicion[0]["Descripción"]}
                  </div>
                </label>
                <input
                  type="checkbox"
                  id={`modal-${i}`}
                  className="modal-toggle"
                />
                {/* Modal */}
                <div id={`modal-${i}`} className="modal">
                  <form
                    method="dialog"
                    className="modal-backdrop"
                    onClick={() =>
                      (document.getElementById(`modal-${i}`).checked = false)
                    }
                  >
                    <button>close</button>{" "}
                    {/* Este botón es necesario para que el backdrop funcione con el formulario */}
                  </form>
                  <div className="modal-box relative max-w-[98vw] p-1 bg-gray-200">
                    <div className="flex items-center justify-between bg-stone-100 rounded-md m-1 p-2">
                      <h3 className="w-full font-bold text-lg text-center flex-1">
                        {i + 1} - {posicion[0]["Descripción"]}
                      </h3>

                      <label
                        htmlFor={`modal-${i}`}
                        className="btn btn-sm btn-error absolute right-0 top-0"
                      >
                        ✕
                      </label>
                    </div>

                    <div className="flex flex-col md:flex-row h-[90vh] w-full rounded-lg">
                      {/* Imagen principal dentro del modal */}
                      <img
                        loading="lazy"
                        src={`/${Maquina}_${i + 1}.svg`}
                        alt={`/${Maquina}_${i + 1}.svg`}
                        className="flex-grow object-contain bg-stone-100 rounded-md m-1 p-1"
                      />

                      {/* Sidebar interno con botones/detalles en el modal */}
                      <div className="flex flex-col justify-between bg-stone-100 rounded-md m-1 p-1 w-full md:w-2/10">
                        {/* Título siempre visible */}
                        <div className="bg-blue-200 mb-1 border-2 border-double rounded-lg border-black ">
                          <h2 className="w-full font-bold text-lg text-center">
                            Leyenda:
                          </h2>
                          <div className=" text-black  m-1 p-1 shadow-md rounded-md min-h-13 h-fit">
                            <h2 className="font-bold text-sm">
                              El color representa la cantidad de piezas que hay
                              en el <strong>almacén</strong> vs la cantidad de
                              piezas de <strong>stock de seguridad</strong>
                            </h2>
                          </div>

                          <div className="flex flex-col justify-between text-center">
                            <div className="bg-emerald-400 text-black  m-1 p-2 shadow-md rounded-md min-h-13 h-fit">
                              <h2 className="font-bold text-sm ">
                                Piezas almacen <strong>{">"}</strong> piezas SS
                              </h2>
                            </div>
                          </div>
                          <div className="bg-amber-300 text-black m-1 p-2 rounded-md shadow-md min-h-13 h-fit">
                            <h2 className="font-bold text-sm">
                              Piezas almacen <strong>{"="}</strong> piezas SS
                            </h2>
                          </div>
                          <div className="bg-rose-400 text-black m-1 p-2 rounded-md shadow-md min-h-13 h-fit">
                            <h2 className="font-bold text-sm">
                              Piezas almacen <strong>{"<"}</strong> piezas SS
                            </h2>
                          </div>
                        </div>
                        {/* Botones / Contenido collapse */}

                        <div className="flex-1 overflow-y-auto  rounded-xl bg-stone-100 ">
                          <h2 className="w-full font-bold text-lg text-center mt-3">
                            Referencias
                          </h2>
                          <div className="grid grid-cols-1 gap-4 ">
                            {posicion.map((elemento, j) => {
                              let background = "bg-neutral-300"; // Default background

                              if (elemento?.["SS"] === 1) {
                                background = "bg-rose-400"; // Red
                              } else if (elemento?.["SS"] >= 3) {
                                background = "bg-emerald-400"; // Green
                              } else if (elemento?.["SS"] >= 2) {
                                background = "bg-amber-300"; // Yellow
                              }

                              return (
                                <div
                                  key={j}
                                  className={`collapse ${background} border-base-100 border`}
                                >
                                  <input type="checkbox" />
                                  <div
                                    className="collapse-title font-bold text-sm rounded-md min-h-13 h-fit"
                                    tabIndex={0}
                                    // style={{ backgroundColor: background }}
                                  >
                                    {j + 1} - {elemento?.["descripcion VTM"]}
                                  </div>
                                  <div className="collapse-content text-sm  bg-stone-200">
                                    <p className="font-semibold pt-3">
                                      <strong className="font-bold text-blue-700">
                                        Posición:
                                      </strong>{" "}
                                      {elemento?.["Posición2"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Pieza:
                                      </strong>{" "}
                                      {elemento?.["descripcion VTM"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Código catálogo:
                                      </strong>{" "}
                                      {elemento?.["Código catálogo"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        cod VTM:
                                      </strong>{" "}
                                      {elemento?.["cod VTM"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Descripción:
                                      </strong>{" "}
                                      {elemento?.["Descripción"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Diseño N°:
                                      </strong>{" "}
                                      {elemento?.["Diseño N°"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Cant. conjuntos:
                                      </strong>{" "}
                                      {elemento?.["Cant. conjuntos"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Cant. por conjunto:
                                      </strong>{" "}
                                      {elemento?.["Cant. por conjunto"]}
                                    </p>
                                    <p className="font-semibold ">
                                      <strong className="font-bold text-blue-700">
                                        Cant. total:
                                      </strong>{" "}
                                      {elemento?.["Cant. total"]}
                                    </p>
                                    <p className="font-semibold">
                                      <strong className="font-bold text-blue-700">
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

                      {/* Sidebar interno con informacion del significado de los colores */}
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
