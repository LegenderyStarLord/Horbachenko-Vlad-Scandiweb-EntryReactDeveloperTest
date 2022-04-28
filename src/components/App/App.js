import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import ProductItemContainer from "../ProductItem/ProductItemContainer";
import CartContainer from "../Cart/CartContainer";
import HeaderContainer from "../Header/HeaderContainer";
import ProductListContainer from "../ProductList/ProductListContainer";



export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/"
});

function App() {
    return (
        <BrowserRouter>

                <div>
                    <ApolloProvider client={client}>
                    <HeaderContainer />
                    </ApolloProvider>
                    <Routes>
                        <Route path="/:name" element={<ProductListContainer/>}/>
                        <Route path="/product_item/:id" element={<ProductItemContainer/>}/>
                        <Route path="/cart" element={<CartContainer/>}/>
                    </Routes>
                </div>

        </BrowserRouter>
    );
}

export default App;
