import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Hit as HitProps } from '@algolia/client-search';

import { AlgoliaIcon } from '../icon/icons';

import Input from './input';
import Hits from './hit';
import { SearchResultProps } from './helper';
import Link from '../link';

const SearchContainer = styled.div`
  position: relative;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const SearchResultWrapper = styled.div<{ focus: boolean; query: string }>`
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  display: ${(p) => (p.focus && p.query && p.query.length > 0 ? 'block' : 'none')};
  width: 80vw;
  max-width: 400px;
  max-height: 80vh;
  overflow: auto;
  z-index: 3;
  box-shadow: 0px 0px 5px 0px;
  padding: 10px 16px 8px;
  background-color: var(--color-n1);
  border-radius: 4px;
`;

const AlgoliaIconWrapper = styled.div`
  display: block;
  text-align: right;
  padding-top: 8px;
  border-top: 2px solid var(--color-n4);

  & .algolia-icon {
    height: 20px;
  }
`;

const SearchResultContainer = styled.div`
  & ul.ais-Hits-list {
    list-style: none;
  }

  & li + li {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--color-n6);
  }
`;

const Search: React.FC = () => {
  const [focus, setFocus] = useState(false);
  /**
   * no hits => display "search result is null"
   * no query => display none
   */
  const [query, setQuery] = useState<string>('');
  const [hits, setHits] = useState<HitProps<SearchResultProps>[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (!searchContainerRef.current?.contains(e.target as HTMLElement)) {
        setFocus(false);
      }
    };
    document.documentElement.addEventListener('click', clickHandler);

    return () => {
      document.documentElement.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <SearchContainer ref={searchContainerRef}>
      <Input setHits={setHits} setQuery={setQuery} onFocus={() => setFocus(true)} focus={focus} />
      {query.length > 0 && (
        <SearchResultWrapper focus={focus} query={query}>
          <SearchResultContainer>
            {hits.length > 0 ? <Hits onClick={() => setFocus(false)} hits={hits} /> : `No results for '${query}'😔`}
          </SearchResultContainer>
          <AlgoliaIconWrapper>
            <Link href="https://algolia.com">
              <AlgoliaIcon className="algolia-icon" />
            </Link>
          </AlgoliaIconWrapper>
        </SearchResultWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;
