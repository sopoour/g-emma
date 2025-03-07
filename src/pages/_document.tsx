import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps, createStylesServer, ServerStyles } from '@mantine/next';

const stylesServer = createStylesServer();
const getInitialProps = createGetInitialProps();

class DocumentApp extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentApp;
