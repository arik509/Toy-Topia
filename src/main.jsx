import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Pages/Routes/Route.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Provider/AuthProvider.jsx";
import CartProvider from "./Provider/CartProvider.jsx";
import { CartContext } from "./Provider/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <span className="loading loading-bars loading-xl"></span>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
