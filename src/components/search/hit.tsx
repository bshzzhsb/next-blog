import React from 'react';
import styled from 'styled-components';
import { Hit as HitProps } from '@algolia/client-search';

import Link from '../link';
import { SearchResultProps } from './helper';

interface HitsProps {
  hits: HitProps<SearchResultProps>[];
  onClick: () => void;
}

const HitWrapper = styled.div`
  font-size: 12px;
  color: var(--color-n8);
  margin-bottom: 12px;

  & em {
    background-color: var(--color-y6);
    font-style: normal;
  }

  & h4 {
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 14px;
  }

  & p {
    font-size: 12px;
  }

  & + & {
    margin-top: 8px;
    border-top: 1px solid var(--color-n6);
  }
`;

const Hits: React.FC<HitsProps> = ({ hits, onClick }) => (
  <>
    {hits.map((hit) => (
      <HitWrapper key={hit.objectID} onClick={onClick}>
        <Link href={`/posts/${hit.slug}`}>
          <h4 dangerouslySetInnerHTML={{ __html: hit._highlightResult?.title?.value ?? '' }} />
          <p dangerouslySetInnerHTML={{ __html: hit._highlightResult?.excerpt?.value ?? '' }} />
        </Link>
      </HitWrapper>
    ))}
  </>
);

export default Hits;
