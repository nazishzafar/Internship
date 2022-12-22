import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }) {
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>;
}

export default MyApp;
