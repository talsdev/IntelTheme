import Document, { Head, Main, NextScript } from 'next/document';
import { isServer, getNextConfig } from "$ustoreinternal/services/utils";
import { createHeadSection } from '$ustoreinternal/services/headSection'
import { createFooterScripts } from '$ustoreinternal/services/footerScriptsSection'

export default class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const globalVar = isServer() ? global : window;
    const { storeScriptUrls, storeStyleUrls } = {} //globalVar['__USTORE_CONFIG__'] || {};
    const { assetPrefix } = getNextConfig()
    // const url = isServer() ? '' : window.location.href

    return (
      <html lang="en">
        <Head>
          <script src={`${assetPrefix}/static-internal/fetch.polyfill.js?rand=${Math.random()}`} />
          <script src={`${assetPrefix}/static-internal/append-scripts.js?rand=${Math.random()}`} />
          {createHeadSection(storeStyleUrls, assetPrefix)}
          {/* This is for a future support of ie 11 */}
          {/*<script src={`${assetPrefix}/static-internal/css-vars-ponyfill.min.js` }/>*/}
          {/*<script src={`${assetPrefix}/static-internal/ie-11-polyfill.js` }/>*/}

        </Head>
        <body>
          <script src={`${assetPrefix}/static-internal/append-custom-css.js`} />
          <script src={`${assetPrefix}/static-internal/append-theme-editor-vars.js`} />
          <Main />
          <NextScript />
          {createFooterScripts(storeScriptUrls, assetPrefix)}
          <iframe id="legacy-iframe" src="about:blank" className="iframe" height="0" />

        </body>
      </html>
    );
  }
}
