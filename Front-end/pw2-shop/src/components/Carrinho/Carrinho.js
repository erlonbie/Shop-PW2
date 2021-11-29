import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCarrinho,
  loginEndereco,
} from "../../redux/slicer/carrinhoSlicer";

function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const userDispatch = useDispatch();
  const carrinho = useSelector((state) => state.carrinho);
  const [soma, setSoma] = useState(0);

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

  useEffect(() => {
    var soma = 0;
    for (let value of produtos) {
      soma += value.preco * value.quantidade;
    }
    setSoma(Number(soma).toFixed(2));
  }, [produtos]);

  const handleClick = () => {
    history.push("/product/add");
  };

  const handleCompra = (e) => {
    e.preventDefault();
    if (carrinho.quantidade !== 0) {
      if (user.logado) {
        history.push("/endereco");
      } else {
        userDispatch(loginEndereco(true));
        history.push("/login");
      }
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

      {/* <ul> */}
      {/*   <li> */}
      {/*     <span className="float-end mx-3">Total(R$)</span> */}
      {/*     <span className="float-end mx-3">Valor(R$)</span> */}
      {/*     <span className="float-end mx-3">Quantidade</span> */}
      {/*   </li> */}
      {/* </ul> */}
      {/* <ul className="list-group"> */}
      {/*   {searchString === "" */}
      {/*     ? produtos.map((prod) => ( */}
      {/*         <li key={prod.id} className="list-group-item"> */}
      {/*           <Link to={`/product/${prod.id}`}>{prod.nome}</Link> */}
      {/*           <span className="float-end mx-3"> */}
      {/*             {prod.quantidade * prod.preco} */}
      {/*           </span> */}
      {/*           <span className="float-end mx-3">{prod.preco}</span> */}
      {/*           <span className="float-end mx-3">{prod.quantidade}</span> */}
      {/*         </li> */}
      {/*       )) */}
      {/*     : searchResult.map((prod) => ( */}
      {/*         <li key={prod.id} className="list-group-item"> */}
      {/*           <Link to={`/product/${prod.id}`}>{prod.nome}</Link> */}
      {/*           <span className="float-end">{prod.quantidade}</span> */}
      {/*         </li> */}
      {/*       ))} */}
      {/* </ul> */}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col" className="table-info">
              Quantidade
            </th>
            <th scope="col" className="table-warning">
              Valor (R$)
            </th>
            <th scope="col" className="table-danger">
              Total (R$)
            </th>
          </tr>
        </thead>
        <tbody>
          {searchString === ""
            ? produtos.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <Link to={`/product/${prod.id}`}>{prod.nome}</Link>
                  </td>
                  <td>{prod.quantidade}</td>
                  <td>{prod.preco}</td>
                  <td>{Number(prod.preco * prod.quantidade).toFixed(2)}</td>
                </tr>
              ))
            : searchResult.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <Link to={`/product/${prod.id}`}>{prod.nome}</Link>
                  </td>
                  <td>{prod.quantidade}</td>
                  <td>{prod.preco}</td>
                  <td>{prod.preco * prod.quantidade}</td>
                </tr>
              ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{soma}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Carrinho;
