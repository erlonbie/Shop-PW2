import React, { useEffect, useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    document.title = `Counter ${contador}`;
  }, [contador]);

  useEffect(() => {
    console.log("Carregamento inicial do componente");
  }, []);

  return (
    <div>
      <h3>{contador}</h3>
      <button
        className="btn btn-primary"
        onClick={() => {
          setContador(contador + 1);
        }}
      >
        +
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          setContador(contador - 1);
        }}
      >
        -
      </button>
    </div>
  );
}

export default Contador;
