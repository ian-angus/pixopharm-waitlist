import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqyewiroiswmhfghkzhz.supabase.co';
const supabaseAnonKey = 'sb_publishable_d1GwG2ax6SrW8jW71nIamg_LV1OWpoB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
