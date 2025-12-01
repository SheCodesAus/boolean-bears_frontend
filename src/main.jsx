import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage";
import CoursePage from "./pages/CoursePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateCoursePage from "./pages/CreateCoursePage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx"; 

import NavBar from "./components/NavBar.jsx";
import About from "./pages/AboutPage.jsx";
import { AuthProvider } from './components/AuthProvider.jsx';
import UpdateCoursePage from "./pages/UpdateCoursePage.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/course/:id", element: <CoursePage /> },
          { path: "/about", element: <About /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/course/update/:id", element: <UpdateCoursePage /> },
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