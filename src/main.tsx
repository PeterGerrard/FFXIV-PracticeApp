import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DarkAndLight } from "./gamestate/DarkAndLight/DarkAndLight.tsx";
import { LetterOfTheLaw } from "./gamestate/LetterOfTheLaw/LetterOfTheLaw.tsx";
import { SelectMechanic } from "./SelectMechanic.tsx";
import { LineTest } from "./gamestate/Mechanics/LineTest.tsx";
import { CircleTest } from "./gamestate/Mechanics/CircleTest.tsx";
import { DonutTest } from "./gamestate/Mechanics/DonutTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SelectMechanic />,
      },
      {
        path: "darkandlight",
        element: <DarkAndLight />,
      },
      {
        path: "letterofthelaw",
        element: <LetterOfTheLaw />,
      },
      {
        path: "linetest",
        element: <LineTest />,
      },
      {
        path: "circletest",
        element: <CircleTest />,
      },
      {
        path: "donuttest",
        element: <DonutTest />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
