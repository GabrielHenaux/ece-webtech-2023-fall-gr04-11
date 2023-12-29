import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '@/styles/globals.css'
import { ContextProvider } from '../components/UserContext'
import { createClient } from '@supabase/supabase-js'



export default function App({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const supabaseClient = createPagesBrowserClient()
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ContextProvider>
        <Component {...pageProps}/>
      </ContextProvider>
    </SessionContextProvider>
  )
}