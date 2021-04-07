import React from "react";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import {
  createCard,
  createDeck,
  deleteCard,
  deleteDeck,
  listCards,
  readCard,
  readDeck,
  updateCard,
  updateDeck,
} from "../utils/api";
import userEvent from "@testing-library/user-event";

require("cross-fetch/polyfill");

jest.mock("../utils/api");

describe("Decks", () => {
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

  test("route for /decks/:deckId", async () => {
    const mockDeck = {
      name: "Mock Deck 3",
      description: "MD",
      id: 3,
      cards: [
        {
          id: 4,
          front: "What has ears but cannot hear?",
          back: "A cornfield.",
          deckId: 8,
        },
      ],
    };

    readDeck.mockResolvedValue(mockDeck);

    const history = createMemoryHistory();
    history.push("/decks/3");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const titleElements = await screen.findAllByText("Mock Deck 3");
    expect(titleElements.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText("What has ears but cannot hear?")).toBeTruthy();
    expect(screen.getByText("A cornfield.")).toBeTruthy();
  });

  test("route for /decks/new", async () => {
    const history = createMemoryHistory();
    history.push("/decks/new");
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const titleElements = await screen.findAllByText("Create Deck");
    expect(titleElements.length).toBeGreaterThanOrEqual(1);

    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(1);

    const textAreas = container.querySelectorAll("textarea");
    expect(textAreas).toHaveLength(1);
  });

  test("route for /decks/:deckId/edit", async () => {
    const mockDeck = {
      name: "Mock Deck 33",
      description: "MD33",
      id: 33,
      cards: [],
    };

    readDeck.mockResolvedValue(mockDeck);

    const history = createMemoryHistory();
    history.push("/decks/33/edit");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const nameInput = await screen.findByDisplayValue("Mock Deck 33");
    expect(nameInput).toBeTruthy();

    const descriptionInput = await screen.findByDisplayValue("MD33");
    expect(descriptionInput).toBeTruthy();
  });

  test("route for /decks/:deckId/cards/new", async () => {
    const mockDeck = {
      name: "Mock squash",
      description: "MS",
      id: 4,
      cards: [],
    };

    readDeck.mockResolvedValue(mockDeck);

    const history = createMemoryHistory();
    history.push("/decks/4/cards/new");
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const deckNameElements = await screen.findAllByText("Mock squash");
    expect(deckNameElements.length).toBeGreaterThanOrEqual(1);

    const titleElements = await screen.findAllByText("Add Card");
    expect(titleElements.length).toBeGreaterThanOrEqual(1);

    const textAreas = container.querySelectorAll("textarea");

    expect(textAreas).toHaveLength(2);
  });

  test("route for /decks/:deckId/cards/:cardId/edit", async () => {
    const cardTen = {
      id: 10,
      front: "What did the left eye say to the right eye?",
      back: "Between us, something smells!",
      deckId: 8,
    };

    const mockDeck = {
      name: "Mock invite",
      description: "MI",
      id: 8,
      cards: [
        {
          id: 9,
          front: "What has ears but cannot hear?",
          back: "A cornfield.",
          deckId: 8,
        },
        cardTen,
      ],
    };

    readDeck.mockResolvedValue(mockDeck);
    readCard.mockResolvedValue(cardTen);

    const history = createMemoryHistory();
    history.push("/decks/9/cards/10/edit");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const frontTextArea = await screen.findByDisplayValue(
      "What did the left eye say to the right eye?"
    );
    expect(frontTextArea).toBeTruthy();
  });

  test("route for /decks/:deckId/study", async () => {
    const mockDeck = {
      name: "Mock Study Deck 42",
      description: "MDS42",
      id: 42,
      cards: [
        {
          id: 43,
          front: "What did one plate say to the other plate?",
          back: "Dinner is on me!",
          deckId: 42,
        },
        {
          id: 44,
          front: "Why did the student eat his homework?",
          back: "Because the teacher told him it was a piece of cake!",
          deckId: 42,
        },
        {
          id: 45,
          front: "What did the Dalmatian say after lunch?",
          back: "That hit the spot!",
          deckId: 42,
        },
      ],
    };

    readDeck.mockResolvedValue(mockDeck);

    const history = createMemoryHistory();
    history.push("/decks/42/study");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const deckName = await screen.findByText("Mock Study Deck 42");
    expect(deckName).toBeTruthy();

    const cardCount = screen.getByText(/Card 1 of 3/i);
    expect(cardCount).toBeTruthy();

    const flipButton = screen.getByText(/flip/i);
    expect(flipButton).toBeTruthy();

    const nextButton = await screen.queryByText(/next/i);
    expect(nextButton).toBeFalsy();
  });

  test("route for /decks/:deckId/study clicking flip shows next button", async () => {
    const mockDeck = {
      name: "Mock Study Deck 73",
      description: "MDS42",
      id: 73,
      cards: [
        {
          id: 74,
          front: "What do you call a droid that takes the long way around?",
          back: "R2 detour.",
          deckId: 73,
        },
        {
          id: 75,
          front: "Why was 6 afraid of 7?",
          back: "Because 7, 8 (ate), 9",
          deckId: 42,
        },
        {
          id: 76,
          front: "When does a joke become a “dad” joke?",
          back: "When the punchline is a parent.",
          deckId: 73,
        },
      ],
    };

    readDeck.mockResolvedValue(mockDeck);

    const history = createMemoryHistory();
    history.push("/decks/73/study");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText("Mock Study Deck 73");

    expect(screen.queryByText(/next/i)).toBeFalsy();

    userEvent.click(screen.getByText(/flip/i));

    expect(screen.queryByText(/next/i)).toBeTruthy();
  });

  test("route for /decks/:deckId/study not enough cards", async () => {
    const mockDeck = {
      name: "Mock Study Deck 13",
      description: "MDS13",
      id: 13,
      cards: [],
    };

    readDeck.mockResolvedValue(mockDeck);

    const history = createMemoryHistory();
    history.push("/decks/13/study");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const deckName = await screen.findByText("Mock Study Deck 13");
    expect(deckName).toBeTruthy();

    const notEnoughCards = await screen.findByText(/Not enough cards/i);
    expect(notEnoughCards).toBeTruthy();
  });
});
