import React, { Component } from "react";
import { Pane, Heading, Text, Icon, Badge } from "evergreen-ui";
import "./App.scss";
import FSM from "./fsm/FSM";
import FSMState from "./fsm/FSMState";
import FSMnode from "./fsm/FSMnode";
import wait from "./fsm/wait";
import getLatestProducts from "./getLatestProducts";
import { isAbsolute } from "path";

class App extends Component<any, FSMState> {
  constructor(props: any) {
    super(props);
    this.state = { products: [] };

    const fsm = new FSM(
      "getProducts",
      {
        getProducts: new FSMnode(async state => {
          const latestProducts = await getLatestProducts();
          return {
            nextState: { products: latestProducts },
            nextNode: "markTopProduct"
          };
        }),
        markTopProduct: new FSMnode(async state => {
          await wait(5000);
          const maxPrice = Math.max.apply(
            null,
            state.products.map((p: { price: string }) => parseFloat(p.price))
          );
          const maxPriceProduct = state.products.find(
            (p: { price: string }) => parseFloat(p.price) === maxPrice
          );
          maxPriceProduct.topPriceProduct = true;
          return {
            nextState: state,
            nextNode: "waitBeforeGetProducts"
          };
        }),
        waitBeforeGetProducts: new FSMnode(async state => {
          await wait(5000);
          return {
            nextState: state,
            nextNode: "getProducts"
          };
        })
      },
      newState => this.setState(newState)
    );

    fsm.initialize();
  }
  render() {
    return (
      <Pane clearfix>
        <Heading size={800} margin="25px">
          <Icon icon="chart" size={30} />
          Latest Top 10 Products
        </Heading>
        {this.state.products.map(
          (p: {
            name: string;
            price: string;
            department: string;
            topPriceProduct?: boolean;
          }) => (
            <Pane
              elevation={p.topPriceProduct ? 3 : 1}
              color={p.topPriceProduct ? "greenTint" : "tint1"}
              key={`product-${p.name}`}
              float="left"
              width={300}
              height={150}
              margin={24}
              padding={24}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Heading
                size={600}
                marginTop="0px"
                color={p.topPriceProduct ? "success" : ""}
              >
                <Text color={p.topPriceProduct ? "success" : ""}>{p.name}</Text>
              </Heading>
              {p.price}${" "}
              <Badge color={p.topPriceProduct ? "green" : "neutral"}>
                {p.department}
              </Badge>
              {p.topPriceProduct && (
                <Icon
                  icon="tick-circle"
                  color="success"
                  size={40}
                  style={{ margin: "10px" }}
                />
              )}
            </Pane>
          )
        )}
      </Pane>
    );
  }
}

export default App;
