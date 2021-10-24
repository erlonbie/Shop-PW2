import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3001/product/getList", { credentials: "include" })
      .then((resp) => resp.json())
      .then((json) => setProdutos(json));
  }, []);
  useEffect(() => {
    setSearchResult(
      produtos.filter((prod) =>
        prod.nome.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    //eslint-disable-next-line
  }, [searchString]);

  const handleClick = () => {
    history.push("/product/add");
  };

  return (
    <div>
      <div>
        <h3 className="float-start">Listagem de Produtos</h3>
        <div className="float-end">
          <button onClick={handleClick} className="btn btn-primary">
            +
          </button>
        </div>
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

export default Produtos;
