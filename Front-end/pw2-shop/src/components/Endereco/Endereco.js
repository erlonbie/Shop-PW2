import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Endereco() {
  const [enderecos, setEnderecos] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/endereco`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((json) => setEnderecos(json));
  }, []);

  useEffect(() => {
    setSearchResult(
      enderecos.filter((prod) =>
        prod.logradouro.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    //eslint-disable-next-line
  }, [searchString, enderecos]);

  const handleClick = () => {
    history.push("/endereco/add");
  };

  const handleEndereco = () => {
    console.log(enderecos);
  };

  console.log(user.id);

  return (
    <div>
      <div>
        <h3 className="float-start">Lista de Enderecos</h3>
        <div className="float-end">
          <button onClick={handleClick} className="btn btn-sm btn-primary">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
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
          ? enderecos
              .filter((i) => i.UsuarioId === user.id)
              .map((prod) => (
                <li
                  key={prod.id}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleEndereco}
                  className="list-group-item mt-3"
                >
                  <Link to={`/endereco/${prod.id}`}>
                    {prod.logradouro}, {prod.numero}, {prod.bairro},{" "}
                    {prod.cidade} -{prod.uf} / {prod.cep}
                  </Link>
                </li>
              ))
          : searchResult.map((prod) => (
              <li
                key={prod.id}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleEndereco}
                className="list-group-item mt-3 "
              >
                {prod.logradouro}, {prod.numero}, {prod.bairro}, {prod.cidade} -
                {prod.uf} / {prod.cep}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Endereco;
