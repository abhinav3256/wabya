// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'


// import Script from 'next/Script'
// import Script from 'next/script'



// import Link from 'next/link'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
        
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          {/* <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          /> */}
          <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
          <link rel='shortcut icon' href='/images/favicon.png' />

          {/* <!-- Bootstrap Core CSS --> */}
          <script src='https://code.jquery.com/jquery-latest.min.js' ></script>
          <link href='/css/bootstrap.min.css' rel='stylesheet'/>
	        <link rel='stylesheet' href='/css/owl.carousel.min.css'/>
          <link rel='stylesheet' href='/css/owl.theme.default.min.css'/>
	        <link rel='stylesheet' href='/css/twentytwenty.css'/>

          {/* <!-- Custom CSS --> */}
          <link href='/css/style.css' rel='stylesheet'/>
	        <link href='https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'/>

          {/* <!-- Custom Fonts --> */}
          <link href='/font-awesome/css/font-awesome.min.css' rel='stylesheet' type='text/css'/>
          <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript" ></script>
	        <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet" media="all"/>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <!-- Bootstrap Core JavaScript --> */}
          <script src="/js/bootstrap.bundle.min.js" async></script>
          <script src="/js/owl.carousel.min.js" async></script>
          {/* <script src="/js/jquery.twentytwenty.js" async></script> */}
          <script src="/js/jquery.event.move.js" async></script>
          <script type="text/javascript" src="/js/script.js" async></script>
          <script type="text/javascript" src="/js/header.js" async></script>

        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
