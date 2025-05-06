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
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-64px)] maxh-full bg-gray-200">
      {" "}
      {/* Contenedor principal*/}
      {/* Texto Izquierda */}
      <div className="flex flex-col m-1 p-1 items-start justify-star bg-stone-100 h-fit  rounded-md">
        <h1 className="text-xs md:text-2xl font-bold">{Maquina}</h1>
        <Link
          to="/"
          className="text-blue-500 hover:underline text-xs md:text-lg pt-2"
        >
          &larr; Volver a Galeria
        </Link>
      </div>
      {/* Imagen */}
      <img
        src={currentImage}
        alt={Maquina}
        className="flex-grow m-1 object-contain bg-indigo-100 max-h-full max-w-full rounded-md"
      />
      {/* Sidebar con botones o referencias */}
      <div className="flex flex-col w-full md:w-64 justify-start bg-stone-100 m-1 p-1 rounded-md overflow-y-auto">
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
                  className="btn w-full text-center bg-dark font-semibold bg-neutral-300 hover:bg-[#94c12e] rounded-md min-h-13 h-fit"
                >
                  {i + 1} - {posicion[0]["Descripción"]}
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
                  <div className="modal-box relative max-w-[90vw] p-1 bg-gray-200">
                    <div className="flex items-center justify-between bg-stone-100 rounded-md m-1 p-2">
                      <h3 className="font-bold text-lg text-center flex-1 py-2">
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
                        src={`/${Maquina}_${i + 1}.svg`}
                        alt={`/${Maquina}_${i + 1}.svg`}
                        className="flex-grow object-contain bg-indigo-100 rounded-md m-1 p-1"
                      />

                      {/* Sidebar interno con botones/detalles en el modal */}
                      <div className="flex flex-col justify-start bg-stone-100 rounded-md m-1 p-1 w-full md:w-1/10 h-fit">
                        <h2 className="text-lg text-center font-semibold mb-2">
                          Leyenda
                        </h2>
                        <div className="">
                          <div className="bg-green-500 text-black  m-1 p-2 rounded-lg shadow-md">
                            <h2 className="font-bold text-sm">
                              Verde: Mas de 5 piezas en el almacen
                            </h2>
                          </div>
                          <div className="bg-yellow-500 text-black m-1 p-2  rounded-lg shadow-md">
                            <h2 className="font-bold text-sm">
                              Amarillo: 1 Pieza en el almacen
                            </h2>
                          </div>
                          <div className="bg-red-500 text-black m-1 p-2  rounded-lg shadow-md">
                            <h2 className="font-bold text-sm">
                              Rojo: Sin stock
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between bg-stone-100 rounded-md m-1 p-1 w-full md:w-2/10">
                        {/* Título siempre visible */}

                        {/* Botones / Contenido collapse */}

                        <div className="flex-1 overflow-y-auto  rounded-xl bg-stone-100 ">
                          <h2 className="w-full text-lg text-center font-semibold mb-2">
                            Referencias 2
                          </h2>
                          <div className="grid grid-cols-1 gap-4 ">
                            {posicion.map((elemento, j) => {
                              let background = "bg-neutral-300"; // Default background

                              if (elemento?.["SS"] === 1) {
                                background = "bg-red-500"; // Red
                              } else if (elemento?.["SS"] >= 3) {
                                background = "bg-green-500"; // Green
                              } else if (elemento?.["SS"] >= 2) {
                                background = "bg-yellow-500"; // Yellow
                              }

                              return (
                                <div
                                  key={j}
                                  className={`collapse ${background} border-base-100 border`}
                                >
                                  <input type="checkbox" />
                                  <div
                                    className="collapse-title font-bold text-sm"
                                    tabIndex={0}
                                    // style={{ backgroundColor: background }}
                                  >
                                    {j + 1} - {elemento?.["descripcion VTM"]}
                                  </div>
                                  <div className="collapse-content text-sm bg-indigo-100 ">
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
