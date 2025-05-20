"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  bookmarks: Record<number, true>;
};

type Action =
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number };

const initialState: State = {
  bookmarks: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { bookmarks: { ...state.bookmarks, [action.payload]: true } };
    case "REMOVE":
      const newBookmarks = { ...state.bookmarks };
      delete newBookmarks[action.payload];
      return { bookmarks: newBookmarks };
    default:
      return state;
  }
}

const BookmarkContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);