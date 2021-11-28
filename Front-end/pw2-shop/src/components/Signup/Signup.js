import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { login } from "../../redux/slicer/userSlicer";
import { useHistory } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState(false);
  const [errorMensagem, setErrorMensagem] = useState("");
  const history = useHistory();
  // const dispatch = useDispatch();
  const inputRef = useRef();
  const user = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    if (senha !== senha2) {
      setError(true);
      setErrorMensagem("As senhas não conferem");
      return;
    }
    const tipoUsuarioId = user.tipo === "visitante" ? 2 : 1;
    const credentials = { nome, email, tipoUsuarioId, senha };
    fetch(`${process.env.REACT_APP_API}/usuarios`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((resp) => {
        if (resp.status === 401) {
          setError(true);
          setErrorMensagem(resp.errorMensagem);
        }
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        if (json.criado !== false) {
          // dispatch(login(json));
          history.push("/");
        }
        setError(true);
        setErrorMensagem(json.msg);
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid">
      <h3>Signup</h3>
      <form>
        <label htmlFor="email" className="labl mt-2">
          Email
        </label>
        <input
          ref={inputRef}
          type="text"
          value={email}
          // autoFocus
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="form-control mt-2"
        />
        <label htmlFor="senha" className="label mt-2">
          Senha
        </label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          id="senha"
          className="form-control mt-2"
        />
        <label htmlFor="senha2" className="label mt-2">
          Repita a Senha
        </label>
        <input
          type="password"
          value={senha2}
          onChange={(e) => setSenha2(e.target.value)}
          id="senha2"
          className="form-control mt-2"
        />

        <label htmlFor="nome" className="label mt-2">
          Nome
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          id="nome"
          className="form-control mt-2"
        />
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-primary mt-2"
        >
          Enviar
        </button>

        {error && (
          <div className="invalid-feedback mt-3" style={{ display: "block" }}>
            {errorMensagem}
          </div>
        )}
      </form>
    </div>
  );
}

export default Signup;
