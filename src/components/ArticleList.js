import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import React from 'react';
import { Card } from 'semantic-ui-react'

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No posts are here... yet.
      </div>
    );
  }

  return (
    <div className={props.fixed}>
      <Card.Group itemsPerRow={props.columns || 3} className={props.fixed}>
        {
          props.articles.map(article => {
            return (
              <ArticlePreview article={article} key={article.slug} />
            );
          })
        }
      </Card.Group>
      <ListPagination
      pager={props.pager}
      articlesCount={props.articlesCount}
      currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
