import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slicer/userSlicer";
import { clearCarrinho } from "../../redux/slicer/carrinhoSlicer";

function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const userDispatch = useDispatch();
  const carrinho = useSelector((state) => state.carrinho);
  const [carrinhoVazioError, setCarrinhoVazioError] = useState(false);

  //useEffect(() => {
  //  fetch("http://localhost:3001/product/getList", { credentials: "include" })
  //    .then((resp) => resp.json())
  //    .then((json) => setProdutos(json));
  //}, []);
  useEffect(() => {
    setSearchResult(
      produtos.filter((prod) =>
        prod.nome.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    //eslint-disable-next-line
  }, [searchString, produtos]);

  useEffect(() => {
    setProdutos(carrinho.produtos);
  }, [carrinho.produtos]);

  const handleClick = () => {
    history.push("/product/add");
  };

  const handleCompra = (e) => {
    e.preventDefault();
    if (carrinho.quantidade !== 0) {
      if (user.logado) {
        history.push("/endereco");
      } else {
        history.push("/login");
      }
    } else {
      setCarrinhoVazioError(true);
    }
  };

  const handleClear = () => {
    userDispatch(clearCarrinho());
  };

  return (
    <div>
      <div>
        <h3 className="float-start">Carrinho de Compra</h3>
        {user.tipo === "colaborador" && (
          <div className="float-end">
            <button onClick={handleClick} className="btn btn-sm btn-primary">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
          </div>
        )}
        <button
          onClick={handleCompra}
          className="btn btn-sm btn-primary float-end"
        >
          Comprar
        </button>

        <button
          onClick={handleClear}
          style={{ backgroundColor: "red" }}
          className="btn btn-sm btn-primary float-end mx-3"
        >
          Limpar
        </button>
      </div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="form-control mb-3"
      ></input>
      <ul className="list-group">
        {searchString === ""
          ? produtos.map((prod) => (
              <li key={prod.id} className="list-group-item">
                <Link to={`/product/${prod.id}`}>{prod.nome}</Link>
                <span className="float-end">{prod.quantidade}</span>
              </li>
            ))
          : searchResult.map((prod) => (
              <li key={prod.id} className="list-group-item">
                <Link to={`/product/${prod.id}`}>{prod.nome}</Link>
                <span className="float-end">{prod.produto}</span>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Carrinho;
