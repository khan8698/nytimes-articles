import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ArticlesContext from "../context/ArticlesContext";
import ArticleDetail from "../components/ArticleDetail";
import { useParams } from "react-router-dom";

const article = {
  id: 1,
  title: "First Article",
  abstract: "This is first.",
  byline: "By Author One",
  section: "Section One",
  published_date: "2022-01-01",
  url: "https://example.com/article/1",
  geo_facet: ["Location One", "Location Two"],
  media: [
    {
      "media-metadata": [
        {
          format: "mediumThreeByTwo440",
          url: "https://via.placeholder.com/440x293",
        },
      ],
      caption: "An example caption.",
    },
  ],
};

// Mock ArticlesContext with the default value
jest.mock("../context/ArticlesContext", () => {
  const React = require("react");
  return React.createContext({ articles: [article] });
});

// Mock useParams to return the article id
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

test("renders article details", () => {
  const setStateMock = jest.fn();
  jest.spyOn(React, "useState").mockImplementation((initialState) => {
    if (typeof initialState === "boolean") {
      return [false, setStateMock]; // Mock loading state as false
    }
    return [initialState, setStateMock];
  });

  // Mock useParams to return the article id
  useParams.mockReturnValue({ id: "1" });

  render(
    <ArticlesContext.Provider
      value={{ articles: [article], setPeriod: jest.fn() }}
    >
      <MemoryRouter initialEntries={["/article/1"]}>
        <ArticleDetail />
      </MemoryRouter>
    </ArticlesContext.Provider>
  );

  const titleElement = screen.getByText(/First Article/i);
  const abstractElement = screen.getByText(/This is first./i);
  const bylineElement = screen.getByText(/By Author One/i);
  const sectionElement = screen.getByText(/Section One/i);
  const locationElement1 = screen.getByText(/Location One/i);
  const locationElement2 = screen.getByText(/Location Two/i);
  const captionElement = screen.getByText(/An example caption./i);
  const linkElement = screen.getByRole("link", { name: /Read more/i });

  expect(titleElement).toBeInTheDocument();
  expect(abstractElement).toBeInTheDocument();
  expect(bylineElement).toBeInTheDocument();
  expect(sectionElement).toBeInTheDocument();
  expect(locationElement1).toBeInTheDocument();
  expect(locationElement2).toBeInTheDocument();
  expect(captionElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "https://example.com/article/1");
});
