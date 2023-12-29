import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Layout from '../components/Layout.js'
import {createPagesBrowserClient} from "@supabase/auth-helpers-nextjs";
import {useContext} from "react";
import UserContext from "@/components/UserContext";
import {useRouter} from "next/router";
import supabase from "@/components/supabaseClient";



export default function Page() {
  const user = useUser();
  const router = useRouter();
  const {profile, logout} = useContext(UserContext)

    if(user && profile) {
        if (profile.username ===null || profile.firstname === null || profile.lastname === null || profile.address === null) {
            router.push('/profile')
        }else {
            router.push('/')
        }
    }
  return (
    <Layout
      title="Sign in"
      description="User sign in"
      >
      <div className="in-main">
        <h1 className='wt-title'>
          Sign in
        </h1>

        <Auth
          supabaseClient={supabase}
          socialColors={true}
          socialButtonSize="medium"
          socialButtonIconSize="medium"
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google', 'facebook']}
        />
      </div>
      

    </Layout>
  )
}
