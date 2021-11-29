import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Header,
  Produtos,
  Sobre,
  Produto,
  AddProduto,
  EditProduto,
  Login,
  Carrinho,
  Endereco,
  EditEndereco,
  Endereco_unidade,
} from "./components/index";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid mt-3">
        <Switch>
          <Route path="/" exact component={Produtos} />
          <Route path="/product/add" exact component={AddProduto} />
          <Route path="/product/:id" exact component={Produto} />
          <Route path="/product/:id/edit" exact component={EditProduto} />
          <Route path="/sobre" component={Sobre} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/carrinho" component={Carrinho} />
          <Route path="/endereco/add" exact component={EditEndereco} />
          <Route path="/endereco/:id" exact component={Endereco_unidade} />
          <Route path="/endereco" exact component={Endereco} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
