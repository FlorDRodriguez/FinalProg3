import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { ProductProvider } from "./context/ProductsContext.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductFormPage from "./pages/ProductFormPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Navbar } from "./components/Navbar.jsx";

function App () {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/> 
              <Route path="/register" element={<RegisterPage/>}/>
              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/add-product" element={<ProductFormPage/>}/>
                <Route path="/products/:id" element={<ProductFormPage/>}/>
                <Route path="/products/:name" element={<ProductsPage/>}/>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App;