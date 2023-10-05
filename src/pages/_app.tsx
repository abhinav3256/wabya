// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { useRouter, withRouter } from 'next/router'

// import { useEffect, useState } from 'react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AdminLayout from 'src/layouts/AdminLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** frontend style.css file
import '../../public/css/style.css'

// ** dashboard style.css file
// import dashboard from '../../public/css/dashboard.css'


// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}


  const edited = true;





// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {

  const router = useRouter()

  const { asPath, pathname } = useRouter();

  // console.log(asPath); // '/blog/xyz'
  // console.log(pathname); // '/blog/[slug]'

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables

    const getAdminLayout = Component.getAdminLayout ?? (page => <AdminLayout>{page}</AdminLayout>)

    const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Wabya – is the most developer friendly & highly customizable Video app based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        {/* <meta name='viewport' content='initial-scale=1, width=device-width' /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

 

      </Head>

      { router.pathname === '/super-admin/dashboard' || router.pathname === '/super-admin/request' || router.pathname === '/super-admin/message' || router.pathname === '/super-admin/faq' || router.pathname === '/super-admin/basic' || router.pathname === '/super-admin/client-list' || router.pathname === '/super-admin/coaches-list' || router.pathname === '/super-admin/edit-profile' || router.pathname === '/super-admin/change-password' || router.pathname === '/super-admin/plans' || router.pathname === '/super-admin/view-client/[coach_id]' || router.pathname === '/super-admin/view-clientDetail/[client_id]'  ?
      (
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>

                  {getAdminLayout(<Component {...pageProps} />)}

                </ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      ) : (
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>

                  {getLayout(<Component {...pageProps} />)}

                </ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      )}
    </CacheProvider>
  )
}

export default App
