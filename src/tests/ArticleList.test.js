import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArticlesContext from "../context/ArticlesContext";
import ArticleList from "../components/ArticleList";

// Mock data
const mockArticles = [
  {
    id: 1,
    title: "First Article",
    abstract: "This is the first article.",
    byline: "By Author One",
    section: "Section One",
    published_date: "2022-01-01",
    media: [
      {
        "media-metadata": [
          {
            format: "mediumThreeByTwo440",
            url: "https://via.placeholder.com/440x293",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Second Article",
    abstract: "This is the second article.",
    byline: "By Author Two",
    section: "Section Two",
    published_date: "2022-01-02",
    media: [
      {
        "media-metadata": [
          {
            format: "mediumThreeByTwo440",
            url: "https://via.placeholder.com/440x293",
          },
        ],
      },
    ],
  },
];

jest.mock("../context/ArticlesContext", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: React.createContext(),
  };
});

describe("ArticleList Component", () => {
  beforeEach(() => {
    // Reset mock context before each test
    jest.resetModules();
  });

  test("renders NY Times Most Viewed Articles heading", () => {
    render(
      <ArticlesContext.Provider
        value={{ articles: mockArticles, setPeriod: jest.fn() }}
      >
        <MemoryRouter>
          <ArticleList />
        </MemoryRouter>
      </ArticlesContext.Provider>
    );

    const headingElement = screen.getByText(/NY Times Most Viewed Articles/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders a list of articles", () => {
    render(
      <ArticlesContext.Provider
        value={{ articles: mockArticles, setPeriod: jest.fn() }}
      >
        <MemoryRouter>
          <ArticleList />
        </MemoryRouter>
      </ArticlesContext.Provider>
    );

    const articleElements = screen.getAllByRole("listitem");
    expect(articleElements.length).toBe(2);
  });

  test("renders article titles and abstracts", () => {
    render(
      <ArticlesContext.Provider
        value={{ articles: mockArticles, setPeriod: jest.fn() }}
      >
        <MemoryRouter>
          <ArticleList />
        </MemoryRouter>
      </ArticlesContext.Provider>
    );

    // Verify titles as links
    const firstArticleLink = screen.getByRole("link", {
      name: /First Article/i,
    });
    const secondArticleLink = screen.getByRole("link", {
      name: /Second Article/i,
    });
    expect(firstArticleLink).toBeInTheDocument();
    expect(secondArticleLink).toBeInTheDocument();

    // Verify abstracts
    const firstArticleAbstract = screen.getByText(
      /This is the first article./i
    );
    const secondArticleAbstract = screen.getByText(
      /This is the second article./i
    );
    expect(firstArticleAbstract).toBeInTheDocument();
    expect(secondArticleAbstract).toBeInTheDocument();
  });
});
