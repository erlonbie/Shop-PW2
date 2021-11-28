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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
