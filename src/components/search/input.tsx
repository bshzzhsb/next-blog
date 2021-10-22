import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Hit } from '@algolia/client-search';

import { debounce } from '@/utils/debounce';
import { search, SearchResultProps } from './helper';
import Icon from '../icon';

interface InputProps {
  focus: boolean;
  onFocus: () => void;
  setQuery: (query: string) => void;
  setHits: (hits: Hit<SearchResultProps>[]) => void;
}

const SearchInputContainer = styled.div`
  position: relative;

  & .icon-search {
    position: absolute;
    left: 8px;
    top: 8px;
    font-size: 20px;
    pointer-events: none;
  }
`;

const SearchInput = styled.input<{ focus: boolean }>`
  width: ${(p) => (p.focus ? '200px' : '20px')};
  height: 36px;
  padding-left: 32px;
  padding-right: 16px;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${(p) => (p.focus ? 'var(--color-n1)' : 'transparent')};
  transition: width 0.3s ease-in-out;
  box-shadow: ${(p) => (p.focus ? '0 0 0 2px #63b8f6' : 'none')};
`;

const Input = ({ focus, setQuery, onFocus, setHits }: InputProps) => {
  const [composition, setComposition] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        try {
          const hits = await search(query);
          setQuery(query);
          setHits(hits);
        } catch (e) {
          setHits([]);
          setQuery('');
        }
      }, 200),
    [setQuery, setHits],
  );

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <SearchInputContainer>
      <SearchInput
        ref={inputRef}
        focus={focus}
        onFocus={(e) => {
          onFocus();
          e.target.select();
        }}
        onInput={() => {
          if (!composition) {
            debouncedSearch(inputRef.current?.value);
          }
        }}
        onCompositionStart={() => setComposition(true)}
        onCompositionEnd={() => {
          setComposition(false);
          debouncedSearch(inputRef.current?.value);
        }}
      />
      <Icon name="search" focusable={false} />
    </SearchInputContainer>
  );
};

export default Input;
