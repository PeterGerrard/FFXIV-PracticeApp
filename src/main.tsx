import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SetupForm } from "./gamestate/Setup/SetupForm.tsx";
import { DarkAndLight } from "./gamestate/DarkAndLight/DarkAndLight.tsx";
import { LetterOfTheLaw } from "./gamestate/LetterOfTheLaw/LetterOfTheLaw.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SetupForm />,
      },
      {
        path: "setup",
        element: <SetupForm />,
      },
      {
        path: "darkandlight",
        element: <DarkAndLight />,
      },
      {
        path: "letterofthelaw",
        element: <LetterOfTheLaw />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
