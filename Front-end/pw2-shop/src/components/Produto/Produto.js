import React, { useEffect, useState, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMinus,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return state.count === 0 ? { count: 0 } : { count: state.count - 1 };
    default:
      throw new Error();
  }
};

function Produto() {
  const [produto, setProduto] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  useEffect(() => {
    fetch(`http://localhost:3001/product/${id}`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((json) => {
        setProduto(json);
        console.log(json);
      });
  }, [id]);

  const handleEdit = () => {
    history.push(`/product/${id}/edit`);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/product/${id}`, {
      credentials: "include",
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((json) => {
        history.push(`/`);
      });
  };

  return (
    <div>
      {user.tipo === "colaborador" && (
        <div>
          <div className="float-end">
            <button onClick={handleEdit} className="btn btn-sm btn-primary m-2">
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-danger m-2"
            >
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      )}
      <h3>{produto.nome}</h3>
      <p>{produto.descricao}</p>
      <div>
        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="btn btn-sm btn-primary float-start"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <h2 className="float-start mx-3" style={{ marginTop: "-4px" }}>
          {state.count}
        </h2>
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="btn btn-sm btn-primary float-start"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}

export default Produto;
