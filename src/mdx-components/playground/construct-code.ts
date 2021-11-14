import { PlaygroundTabs } from '@/mdx-components/playground';

interface CodeProps {
  [PlaygroundTabs.HTML]: string;
  [PlaygroundTabs.CSS]: string;
  [PlaygroundTabs.JS]: string;
}

export function constructCode(
  { [PlaygroundTabs.HTML]: html, [PlaygroundTabs.CSS]: css, [PlaygroundTabs.JS]: js }: CodeProps,
  id: string,
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CodeSnippet</title>
  <style>
    ${css}
    body {
      margin: 0;
      padding: 8px;
      background-color: #fbfbfb;
      box-sizing: border-box;
    }
    *::-webkit-scrollbar {
      width: 0;
      background-color: #282c34;
    }
    *::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: transparent;
    }
    *::-webkit-scrollbar-thumb {
      border: 2px solid #282c34;
      border-radius: 6px;
      background-color: var(--color-n6);
    }
  </style>
</head>
<body>
  ${html}
  <span></span>
  <script>
    var _privateLog = console.log;
    console.log = function(...rest) {
      if(typeof window !== 'undefined') {
        window.parent.postMessage({
          source: "frame-${id}",
          message: {
            type: "log",
            data: rest
          },
        }, "*");
      }
      _privateLog.apply(console, arguments);
    }
    window.onerror = function(message) {
      if(typeof window !== 'undefined') {
        window.parent.postMessage({
          source: "frame-${id}",
          message: {
            type: "error",
            data: message
          },
        }, "*");
      }
    }
  </script>
  <script>
    ${js}
  </script>
</body>
</html>
`;
}
