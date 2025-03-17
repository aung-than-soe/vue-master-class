import { createClient } from '@supabase/supabase-js'
import type { Database } from './../../database/types'

// Create a single supabase client for interacting with your database
const config = import.meta.env.SUPABASE
const Client = createClient<Database>(config.URL, config.KEY)
export default Client
