/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Removes the `cards` property from the deck so it is not accidentally saved with the deck.
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param deck
 *  the deck instance
 * @returns {*}
 *  a copy of the deck instance with the `cards` property removed.
 */
function stripCards(deck) {
  const { cards, ...deckWithoutCards } = deck;
  return deckWithoutCards;
}

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options) {


  
  try {
    const response = await fetch(url, options);
    if (response.status < 200 || response.status > 399) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
  }
}

/**
 * Retrieves all existing decks.
 * @returns {Promise<[deck]>}
 *  a promise that resolves to a possibly empty array of decks saved in the database.
 */
export async function listDecks(signal) {
  const url = `${API_BASE_URL}/decks?_embed=cards`;
  return await fetchJson(url, { signal });
}

/**
 * Saves deck to the database (public/data/db.json).
 * There is no validation done on the deck object, any object will be saved.
 * @param deck
 *  the deck to save, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<deck>}
 *  a promise that resolves the saved deck, which will now have an `id` property.
 */
export async function createDeck(deck, signal) {
  const url = `${API_BASE_URL}/decks`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(stripCards(deck)),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Retrieves the deck with the specified `deckId`
 * @param deckId
 *  the `id` property matching the desired deck.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 *  a promise that resolves to the saved deck.
 */
export async function readDeck(deckId, signal) {
  const url = `${API_BASE_URL}/decks/${deckId}?_embed=cards`;
  return await fetchJson(url, { signal });
}

/**
 * Updates an existing deck
 * @param updatedDeck
 *  the deck to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated deck.
 */
export async function updateDeck(updatedDeck, signal) {
  const url = `${API_BASE_URL}/decks/${updatedDeck.id}?_embed=cards`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(stripCards(updatedDeck)),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Deletes the deck with the specified `deckId`.
 * @param deckId
 *  the id of the deck to delete
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to an empty object.
 */
export async function deleteDeck(deckId, signal) {
  const url = `${API_BASE_URL}/decks/${deckId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

/**
 * Retrieves all cards associated with the specified `deckId`.
 * @param deckId
 *  the id of the target deck
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to a possible empty array of cards.
 */
export async function listCards(deckId, signal) {
  const url = `${API_BASE_URL}/cards?deckId=${deckId}`;
  return await fetchJson(url, { signal });
}

/**
 * Creates a new card associated with the specified `deckId`.
 * There is no validation that there is an existing deck with the specified `deckId`.
 * @param deckId
 *  the id of the target deck
 * @param card
 *  the card to create, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the new card, which will have an `id` property.
 */
export async function createCard(deckId, card, signal) {
  // There is a bug in json-server, if you post to /decks/:deckId/cards the associated deckId is a string
  // and the card is not related to the deck because the data types of the ID's are different.
  const url = `${API_BASE_URL}/cards`;
  card.deckId = Number(deckId);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(card),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Retrieves the card with the specified `cardId`
 * @param cardId
 *  the id of the target
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the saved card.
 */
export async function readCard(cardId, signal) {
  const url = `${API_BASE_URL}/cards/${cardId}`;
  return await fetchJson(url, { signal });
}

/**
 * Updates an existing deck
 * @param updatedCard
 *  the card to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated card.
 */
export async function updateCard(updatedCard, signal) {
  const url = `${API_BASE_URL}/cards/${updatedCard.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedCard),
  };
  return await fetchJson(url, options);
}

/**
 * Deletes the card with the specified `cardId`.
 * @param cardId
 *  the id of the card to delete
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to an empty object.
 */
export async function deleteCard(cardId, signal) {
  const url = `${API_BASE_URL}/cards/${cardId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}
