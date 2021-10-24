import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Header,
  Produtos,
  Sobre,
  Produto,
  AddProduto,
  EditProduto,
} from "./components/index";

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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
