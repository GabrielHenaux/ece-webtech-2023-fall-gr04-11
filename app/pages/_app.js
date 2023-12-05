import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import '@/styles/globals.css'
import { ContextProvider } from '../components/UserContext'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ougeuzlashhmrbiwqmqk.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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