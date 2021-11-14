import React from 'react';

export interface TabPaneProps<T> {
  key: T;
  children: React.ReactNode;
}

export const TabPane = <T,>({ children }: TabPaneProps<T>) => <>{children}</>;
