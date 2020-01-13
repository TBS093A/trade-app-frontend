import React from "react";

import IndexInterface from "../components/indexInterface"

import store from "../stores/store";
import { Provider } from "react-redux";

import '../styles/general.scss'

const IndexPage = () => (
  <Provider store={store}>
    <IndexInterface />
  </Provider>
)

export default IndexPage
