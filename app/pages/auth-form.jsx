'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
    const supabase = createClientComponentClient()

    return (

        <ThemeSupa>
            <Auth supabaseClient={supabase} providers={['google']} socialLayout="horizontal" />
        </ThemeSupa>

    )
}