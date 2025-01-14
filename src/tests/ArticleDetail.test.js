import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesContext from '../context/ArticlesContext';
import ArticleDetail from '../components/ArticleDetail';

const article = {
  id: 1,
  title: 'First Article',
  abstract: 'This is the first article.',
  byline: 'By Author One',
  section: 'Section One',
  published_date: '2022-01-01',
  url: 'https://example.com/article/1',
  geo_facet: ['Location One', 'Location Two'],
  media: [{
    'media-metadata': [{ format: 'mediumThreeByTwo440', url: 'https://via.placeholder.com/440x293' }],
    caption: 'An example caption.'
  }]
};

jest.mock('../context/ArticlesContext', () => {
  const React = require('react');
  const originalModule = jest.requireActual('../context/ArticlesContext');
  return {
    __esModule: true,
    ...originalModule,
    default: React.createContext({ articles: [article] }),
  };
});

test('renders article details', () => {
  render(
    <ArticlesContext.Provider value={{ articles: [article] }}>
      <ArticleDetail />
    </ArticlesContext.Provider>
  );

  const titleElement = screen.getByText(/First Article/i);
  const abstractElement = screen.getByText(/This is the first article./i);
  const bylineElement = screen.getByText(/By Author One/i);
  const sectionElement = screen.getByText(/Section One/i);
  const locationElement1 = screen.getByText(/Location One/i);
  const locationElement2 = screen.getByText(/Location Two/i);
  const captionElement = screen.getByText(/An example caption./i);
  const linkElement = screen.getByRole('link', { name: /Read more/i });

  expect(titleElement).toBeInTheDocument();
  expect(abstractElement).toBeInTheDocument();
  expect(bylineElement).toBeInTheDocument();
  expect(sectionElement).toBeInTheDocument();
  expect(locationElement1).toBeInTheDocument();
  expect(locationElement2).toBeInTheDocument();
  expect(captionElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', 'https://example.com/article/1');
});
