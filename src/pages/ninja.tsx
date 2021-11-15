import React from 'react';
import styled from 'styled-components';

import Layout from '@/page-components/layout';
import Playground from '@/mdx-components/playground';

const PlaygroundWrapper = styled.div`
  position: absolute;
  top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
`;

const StyledPlayground = styled(Playground)`
  height: 100%;
  margin: 0;
  border-radius: 0;
`;

const Ninja: React.FC = () => {
  return (
    <Layout title="Ninja">
      <PlaygroundWrapper>
        <StyledPlayground id="ninja" />
      </PlaygroundWrapper>
    </Layout>
  );
};

export default Ninja;
