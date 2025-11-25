import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateCoursePage from "./pages/CreateCoursePage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx"; 

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from './components/AuthProvider.jsx';

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/course/:id", element: <CoursePage /> },
          { path: "/createcourse", element: <CreateCoursePage /> },
          { path: "/createaccount", element: <CreateAccountPage /> },
      ],
    },
  ],
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);