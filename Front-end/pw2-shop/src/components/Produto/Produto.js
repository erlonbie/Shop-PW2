import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
      <div>
        <h3 className="float-start">Listagem de Produtos</h3>
        <div className="float-end">
          <button onClick={handleClick} className="btn btn-sm btn-primary m-2">
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
          </button>
          <button onClick={handleClick} className="btn btn-sm btn-danger m-2">
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <h3>{produto.nome}</h3>
      <p>{produto.descricao}</p>
    </div>
  );
}

export default Produto;
