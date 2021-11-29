import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slicer/userSlicer";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const carrinho = useSelector((state) => state.carrinho);

  const handleClick = (e) => {
    e.preventDefault();
    const credentials = { email, senha };
    fetch(`${process.env.REACT_APP_API}/login`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((resp) => {
        if (resp.status === 401) {
          setError(true);
        }
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        if (json.login !== false) {
          dispatch(login(json));
          if (carrinho.logado) {
            history.push("/endereco");
          } else {
            history.push("/");
          }
        }
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid">
      <h3>Login</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          ref={inputRef}
          type="text"
          value={email}
          // autoFocus
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="form-control"
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          id="senha"
          className="form-control"
        />
        {error && (
          <div className="invalid-feedback" style={{ display: "block" }}>
            Email e/ou Senha inválidos
          </div>
        )}
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-primary mt-3"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Login;
