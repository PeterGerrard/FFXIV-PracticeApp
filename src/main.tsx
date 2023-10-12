import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { SelectMechanic: Component } = await import(
            "./SelectMechanic.tsx"
          );
          return { Component };
        },
      },
      {
        path: "darkandlight",
        lazy: async () => {
          const { DarkAndLight: Component } = await import(
            "./gamestate/P11S/DarkAndLight/DarkAndLight.tsx"
          );
          return { Component };
        },
      },
      {
        path: "letterofthelaw",
        lazy: async () => {
          const { LetterOfTheLaw: Component } = await import(
            "./gamestate/P11S/LetterOfTheLaw/LetterOfTheLaw.tsx"
          );
          return { Component };
        },
      },
      {
        path: "linetest",
        lazy: async () => {
          const { LineTest: Component } = await import(
            "./gamestate/Mechanics/LineTest.tsx"
          );
          return { Component };
        },
      },
      {
        path: "circletest",
        lazy: async () => {
          const { CircleTest: Component } = await import(
            "./gamestate/Mechanics/CircleTest.tsx"
          );
          return { Component };
        },
      },
      {
        path: "donuttest",
        lazy: async () => {
          const { DonutTest: Component } = await import(
            "./gamestate/Mechanics/DonutTest.tsx"
          );
          return { Component };
        },
      },
      {
        path: "conetest",
        lazy: async () => {
          const { ConeTest: Component } = await import(
            "./gamestate/Mechanics/ConeTest.tsx"
          );
          return { Component };
        },
      },
      {
        path: "p12s/p1/superchaintheory1",
        lazy: async () => {
          const { SuperchainTheory1: Component } = await import(
            "./gamestate/P12SP1/SuperchainTheory1"
          );
          return { Component };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
