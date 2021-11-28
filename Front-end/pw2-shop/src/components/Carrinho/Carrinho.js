import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const carrinho = useSelector((state) => state.carrinho);

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
              </li>
            ))
          : searchResult.map((prod) => (
              <li key={prod.id} className="list-group-item">
                <Link to={`/product/${prod.id}`}>{prod.nome}</Link>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Carrinho;
