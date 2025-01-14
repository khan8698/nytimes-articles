import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleList from '../components/ArticleList';

const articles = [
  {
    id: 1,
    title: 'First Article',
    abstract: 'This is the first article.',
    byline: 'By Author One',
    section: 'Section One',
    published_date: '2022-01-01',
    media: [{
      'media-metadata': [{ format: 'mediumThreeByTwo440', url: 'https://via.placeholder.com/440x293' }]
    }]
  },
  {
    id: 2,
    title: 'Second Article',
    abstract: 'This is the second article.',
    byline: 'By Author Two',
    section: 'Section Two',
    published_date: '2022-01-02',
    media: [{
      'media-metadata': [{ format: 'mediumThreeByTwo440', url: 'https://via.placeholder.com/440x293' }]
    }]
  }
];

jest.mock('../context/ArticlesContext', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.createContext({ articles }),
  };
});

test('renders NY Times Most Viewed Articles heading', () => {
  render(<ArticleList />);
  const headingElement = screen.getByText(/NY Times Most Viewed Articles/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders a list of articles', () => {
  render(<ArticleList />);
  const articleElements = screen.getAllByRole('listitem');
  expect(articleElements.length).toBe(2);
});

test('renders article titles and abstracts', () => {
  render(<ArticleList />);
  const firstArticleTitle = screen.getByText(/First Article/i);
  const secondArticleTitle = screen.getByText(/Second Article/i);
  const firstArticleAbstract = screen.getByText(/This is the first article./i);
  const secondArticleAbstract = screen.getByText(/This is the second article./i);

  expect(firstArticleTitle).toBeInTheDocument();
  expect(secondArticleTitle).toBeInTheDocument();
  expect(firstArticleAbstract).toBeInTheDocument();
  expect(secondArticleAbstract).toBeInTheDocument();
});
