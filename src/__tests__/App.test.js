import React from "react";
import { Router } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import App from "../App";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import {
  createCard,
  createDeck,
  deleteCard,
  deleteDeck,
  listCards,
  listDecks,
  readCard,
  readDeck,
  updateCard,
  updateDeck,
} from "../utils/api";

require("cross-fetch/polyfill");

jest.mock("../utils/api");

describe("App", () => {
  beforeEach(() => {
    createDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    readDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    updateDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    updateCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    createCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    readCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    deleteDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    deleteCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    listCards.mockResolvedValue([
      {
        front:
          "Default mock response. If you see this, you probably do not need this API call.",
      },
    ]);
  });

  test('landing on a bad page shows "Not Found" page', () => {
    const history = createMemoryHistory();
    history.push("/some/bad/route");
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByText("Not Found")).toBeTruthy();
  });

  test("route for /", async () => {
    const mockDecks = [
      {
        id: 1,
        name: "Mock Rendering in React",
        description: "RIR",
        cards: [{ id: 2 }, { id: 3 }],
      },
      {
        name: "Mock React Router",
        description: "RR",
        id: 2,
        cards: [],
      },
    ];

    const mockDecksPromise = Promise.resolve(mockDecks);

    listDecks.mockImplementation(() => mockDecksPromise);

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await act(() => mockDecksPromise);

    expect(screen.getByText("Mock Rendering in React")).toBeTruthy();
    expect(screen.getByText("2 cards")).toBeTruthy();
    expect(screen.getByText("Mock React Router")).toBeTruthy();
    expect(screen.getByText("0 cards")).toBeTruthy();
  });
});
