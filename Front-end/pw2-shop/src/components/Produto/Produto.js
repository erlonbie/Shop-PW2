import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMinus,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Comentario } from "../../components";
import { addItem, updateCarrinho } from "../../redux/slicer/carrinhoSlicer";

function Produto() {
  const [produto, setProduto] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const carrinho = useSelector((state) => state.carrinho);
  const carrinhoDispatch = useDispatch();
  const [comentarios, setComentarios] = useState([]);
  const [inputComentario, setInputComentario] = useState("");
  const [qntdProd, setQntdProd] = useState(1);
  const [erroEstoque, setErroEstoque] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setComentarios([
      ...comentarios,
      { id: comentarios.length, texto: inputComentario, like: false },
    ]);
    setInputComentario("");
  };

  const setLike = useCallback(
    (id) => {
      setComentarios(
        comentarios.map((c) => (c.id === id ? { ...c, like: !c.like } : c))
      );
    },
    [comentarios]
  );

  const qntLikes = useMemo(() => {
    return comentarios.filter((c) => c.like).length;
  }, [comentarios]);

  const handleAdiciona = (e) => {
    e.preventDefault();

    const indiceExistente = carrinho.produtos.findIndex(
      (i) => i.id === produto.id
    );

    if (indiceExistente !== -1) {
      const tmp = carrinho.produtos[indiceExistente];
      if (qntdProd + tmp.quantidade > tmp.estoque) {
        setErroEstoque(true);
        return;
      }
      carrinhoDispatch(
        updateCarrinho({
          id: tmp.id,
          qnt: qntdProd,
        })
      );
      history.push("/carrinho");
    } else {
      carrinhoDispatch(addItem({ ...produto, quantidade: qntdProd }));
      history.push("/carrinho");
    }
  };

  const increment = useCallback(() => {
    if (qntdProd < produto.estoque) setQntdProd(qntdProd + 1);
  }, [produto, qntdProd]);

  const decrement = useCallback(() => {
    if (qntdProd > 0) setQntdProd(qntdProd - 1);
  }, [produto, qntdProd]);

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
      <p>Estoque: {produto.estoque}</p>
      <p>Preço: {produto.preco}</p>
      <div className="clearfix">
        <div className="float-start">
          <button
            onClick={decrement}
            className="btn btn-sm btn-primary float-start"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <h2 className="float-start mx-3" style={{ marginTop: "-4px" }}>
            {qntdProd}
          </h2>
          <button
            onClick={increment}
            className="btn btn-sm btn-primary float-start"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>

          {erroEstoque && (
            <div
              className="invalid-feedback mt-3 float-end"
              style={{ display: "inline" }}
            >
              "Quantidade Acima do estoque"
            </div>
          )}
        </div>
        <button
          onClick={handleAdiciona}
          className="btn btn-sm btn-primary float-end"
        >
          Adicionar
        </button>
      </div>
      <div>
        <h5>
          Comentários
          <span className="badge rounded-pill bg-primary">{qntLikes}</span>
        </h5>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            value={inputComentario}
            onChange={(e) => setInputComentario(e.target.value)}
            type="text"
          />
        </form>
        <ul className="list-group mt-3">
          {comentarios.map((c) => (
            <Comentario setLike={setLike} key={c.id} comentario={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Produto;
