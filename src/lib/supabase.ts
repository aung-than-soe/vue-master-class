import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const config = import.meta.env.SUPABASE
const Client = createClient(config.URL, config.KEY)
export default Client
