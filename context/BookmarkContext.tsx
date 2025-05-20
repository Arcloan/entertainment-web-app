"use client";

import React, { createContext, useContext, useReducer, ReactNode, useMemo } from "react";

type State = {
  bookmarks: {
    movie: Record<number, true>;
    tv: Record<number, true>;
  };
};

type Action =
  | { type: "ADD"; payload: { id: number; mediaType: "movie" | "tv" } }
  | { type: "REMOVE"; payload: { id: number; mediaType: "movie" | "tv" } };

const initialState: State = {
  bookmarks: {
    movie: {},
    tv: {},
  },
};

function reducer(state: State, action: Action): State {
  const { mediaType, id } = action.payload;
  switch (action.type) {
    case "ADD":
      return {
        bookmarks: {
          ...state.bookmarks,
          [mediaType]: {
            ...state.bookmarks[mediaType],
            [id]: true,
          },
        },
      };
    case "REMOVE":
      const updated = { ...state.bookmarks[mediaType] };
      delete updated[id];
      return {
        bookmarks: {
          ...state.bookmarks,
          [mediaType]: updated,
        },
      };
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

export const useBookmark = () => {
  const { state, dispatch } = useContext(BookmarkContext);

  const movieIds = useMemo(
    () => Object.keys(state.bookmarks.movie).map(Number),
    [state.bookmarks.movie]
  );

  const tvIds = useMemo(
    () => Object.keys(state.bookmarks.tv).map(Number),
    [state.bookmarks.tv]
  );

  return {
    movieIds,
    tvIds,
    dispatch,
  };
};