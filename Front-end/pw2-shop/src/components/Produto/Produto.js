import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function Produto() {
  const [produto, setProduto] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:3001/product/${id}`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((json) => {
        setProduto(json);
        console.log(json);
      });
  }, []);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div>
      <h3>
        {produto.nome}{" "}
        <button className="btn btn-sm btn-primary mx-2" onClick={handleClick}>
          Voltar
        </button>{" "}
      </h3>
      <p>{produto.descricao}</p>
    </div>
  );
}

export default Produto;
