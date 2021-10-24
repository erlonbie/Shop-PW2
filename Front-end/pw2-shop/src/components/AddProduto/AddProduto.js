import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AddProduto() {
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(10);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    const produto = { nome, descricao, preco, estoque };
    setIsPending(true);

    e.preventDefault();
    fetch("http://localhost:3001/product/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then((resp) => resp.json())
      .then((json) => {
        setIsPending(false);
        if (json.errors) {
          json.errors.forEach((error) => {
            if (error.path === "nome") setNomeError(error.message);
          });
        } else history.push(`/product/${json.id}`);
      });
  };

  return (
    <div>
      <h3>Adição de Produto</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome" className="nome mt-3">
          Nome
        </label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          id="nome"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
        <div className="invalid-feedback" style={{ display: "block" }}>
          {nomeError}
        </div>
        <label htmlFor="descricao" className="descricao mt-3">
          Descricao
        </label>
        <textarea
          type="text"
          value={descricao}
          required
          onChange={(e) => setDescricao(e.target.value)}
          id="Descricao"
          className="form-control"
        ></textarea>
        <label htmlFor="preco" className="preco mt-3">
          Preço
        </label>
        <input
          type="text"
          required
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          id="preco"
          className="form-control"
        ></input>
        <label htmlFor="estoque" className="estoque mt-3">
          Estoque
        </label>
        <select
          required
          value={estoque}
          id="estoque"
          onChange={(e) => setEstoque(e.target.value)}
          className="form-control"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        {isPending ? (
          <button disabled className="btn btn-primary mt-3" type="submit">
            Adicionando..
          </button>
        ) : (
          <button className="btn btn-primary mt-3" type="submit">
            Adicionar
          </button>
        )}
      </form>
    </div>
  );
}

export default AddProduto;
