import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCarrinho } from "../../redux/slicer/carrinhoSlicer";
import { logout } from "../../redux/slicer/userSlicer";

function Endereco_unidade() {
  const [endereco, setEndereco] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const carrinho = useSelector((state) => state.carrinho);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/endereco/${id}`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((json) => {
        setEndereco(json[0]);
        console.log(json);
      });
  }, [id]);

  const handleConfirma = async (e) => {
    e.preventDefault();
    console.log(user.id);

    const compra = { usuarioId: user.id, data: Date.now() };
    const geraCompra = await fetch(`${process.env.REACT_APP_API}/compra`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compra),
    })
      .then((resp) => resp.json())
      .then((json) => json);

    const compraItem = carrinho.produtos.map((prod) => {
      return {
        produtoId: prod.id,
        compraId: geraCompra.compra.id,
        quantidade: prod.quantidade,
      };
    });

    fetch(`${process.env.REACT_APP_API}/compraitem/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compraItem),
    })
      .then((resp) => resp.json())
      .then((json) => json);

    dispatch(logout());
    dispatch(clearCarrinho());
    console.log("Compra finalizada!");
    history.push("/");
  };

  return (
    <div>
      <h4>{endereco.logradouro}</h4> {endereco.numero} {endereco.bairro},
      {endereco.cidade}, {endereco.uf} / {endereco.cep}
      <div className="clearfix">
        <button
          onClick={handleConfirma}
          className="btn btn-sm btn-primary float-end"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default Endereco_unidade;
