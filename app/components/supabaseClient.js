import {createClient} from "@supabase/supabase-js";

/**
 * These variables are used to connect to the database in each page that needs it.
 * 
*/
const supabaseUrl = 'https://ougeuzlashhmrbiwqmqk.supabase.co' //to replace by env variable for deployment
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;