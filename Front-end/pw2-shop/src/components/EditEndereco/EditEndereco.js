import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function EditEndereco() {
  const [nomeError, setNomeError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // const id = user.tipo === "colaborador" ? 1 : 2;
    const endereco = {
      usuarioId: user.id,
      logradouro,
      numero,
      bairro,
      cidade,
      uf,
      cep,
    };
    setIsPending(true);

    fetch(`${process.env.REACT_APP_API}/endereco/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(endereco),
    })
      .then((resp) => resp.json())
      .then((json) => {
        setIsPending(false);
        console.log(json);
        if (json.errors) {
          json.errors.forEach((error) => {
            if (error.path === "nome") setNomeError(error.message);
          });
        } else history.push(`/endereco`);
      });
  };

  return (
    <div>
      <h3>Adição de Endereço</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome" className="nome mt-3">
          Logradouro
        </label>
        <input
          type="text"
          required
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          id="logradouro"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
        <label htmlFor="nome" className="nome mt-3">
          Número
        </label>
        <input
          type="text"
          required
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          id="numero"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
        <label htmlFor="nome" className="nome mt-3">
          Bairro
        </label>
        <input
          type="text"
          required
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          id="bairro"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
        <label htmlFor="nome" className="nome mt-3">
          Cidade
        </label>
        <input
          type="text"
          required
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          id="cidade"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
        <label htmlFor="nome" className="nome mt-3">
          UF
        </label>
        <input
          type="text"
          required
          value={uf}
          onChange={(e) => setUf(e.target.value)}
          id="uf"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
        <label htmlFor="nome" className="nome mt-3">
          CEP
        </label>
        <input
          type="text"
          required
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          id="cep"
          className={
            nomeError === "" ? `form-control` : `form-control is-invalid`
          }
        ></input>
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

export default EditEndereco;
