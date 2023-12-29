import {createContext, useState, useEffect} from 'react'
import {useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import {useRouter} from "next/router";
import supabase from "@/components/supabaseClient";


const Context = createContext()

export default Context

export const ContextProvider = ({
  children
}) => {
  const supabaseUser = useUser();
  const router = useRouter();
  const [user, setUser] = useState(null);
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
                    console.error('Error fetching profile:', error);
                } else {
                    setProfile(data);
                    console.log('profile', data)
                }
            }
        };

        fetchProfile();
    }, [supabaseUser]);



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
          setUser(null);
          await router.push('/login')
        },
        login: async () => {
          await router.push('/login')

        },
          setProfile: async (profileIn) => {
            setProfile(profileIn)
              const {data, error} = await supabase
                  .from('profiles')
                  .update({
                      firstname: profile.firstname,
                      lastname: profile.lastname,
                      address: profile.address,
                      username: profile.username,
                  })
                  .match({id: user.id});

              if (error) {
                  console.error('Erreur lors de la mise à jour:', error);
                  return null;
              }
          }
      }}
    >
      {children}
    </Context.Provider>
  )
}
