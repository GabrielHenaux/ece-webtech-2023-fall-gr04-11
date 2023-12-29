import { useUser } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Layout from '../components/Layout.js'
import { useContext } from "react";
import UserContext from "@/components/UserContext";
import { useRouter } from "next/router";
import supabase from "@/components/supabaseClient";



/**
 * Renders the login page.
 * If the user is logged in and has a complete profile, redirects to the home page.
 * If the user is logged in but has an incomplete profile, redirects to the profile page.
 * If the user is not logged in, displays the login form.
 *
 * @returns {JSX.Element} The login page component.
 */

export default function Page() {
  const user = useUser();
  const router = useRouter();
  const { profile} = useContext(UserContext)

  if (user && profile) {
    // Redirects to the home page if the user is logged in and has a complete profile
    if (profile.username === null || profile.firstname === null || profile.lastname === null || profile.address === null) {
      router.push('/profile')
    } 
    // Redirects to the profile page if the user is logged in but has an incomplete profile
    else {
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

        {/* Displays the login form with Auth tag*/}
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
