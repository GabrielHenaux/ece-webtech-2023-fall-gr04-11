import {createContext, useState, useEffect} from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const Context = createContext()

export default Context

export const ContextProvider = ({
  children
}) => {
  const supabase = useSupabaseClient()
  const supabaseUser = useUser()
  const [user, setUser] = useState();
  const [profile, setProfile] = useState(null);


    useEffect(() => {
        const fetchProfile = async () => {
            if (supabaseUser) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', supabaseUser.id)
                    .single();


                if (error) {
                    console.error('Erreur lors de la récupération du profil:', error);
                } else {
                    setProfile(data);
                    console.log('profile', data)
                }
            }
        };

        fetchProfile();
    }, [supabaseUser, supabase]);



    useEffect(function () {
        if (supabaseUser) setUser(supabaseUser)
    }, [supabaseUser])

  return (
    <Context.Provider
      value={{
        user: user,
        profile: profile,
        logout: async () => {
          await supabase.auth.signOut()
          setUser(null)
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}
