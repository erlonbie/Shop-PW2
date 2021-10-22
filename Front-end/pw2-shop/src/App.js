import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Produtos, Sobre, Produto } from "./components/index";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid mt-3">
        <Switch>
          <Route path="/" exact component={Produtos} />
          <Route path="/product/:id" exact component={Produto} />
          <Route path="/sobre" component={Sobre} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
