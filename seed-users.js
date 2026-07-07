const fs = require('fs')
const envConfig = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=')
  if (key && value) acc[key.trim()] = value.trim()
  return acc
}, {})

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  envConfig.NEXT_PUBLIC_SUPABASE_URL,
  envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function seed() {
  const users = [
    { email: 'admin1@rentpay.com', password: 'Senha454*', meta: { full_name: 'Admin 1 (Davi)', role: 'locador' } },
    { email: 'admin2@rentpay.com', password: 'admin2', meta: { full_name: 'Admin 2 (Veridiano)', role: 'locador' } },
    { email: 'inquilino1@rentpay.com', password: 'Senha454*', meta: { full_name: 'Inquilino 1', role: 'inquilino' } },
    { email: 'inquilino2@rentpay.com', password: 'inquilino2', meta: { full_name: 'Inquilino 2', role: 'inquilino' } }
  ]

  for (const u of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      user_metadata: u.meta,
      email_confirm: true
    })
    
    if (error && error.message.includes('already registered')) {
       console.log(`${u.email} já existe. Ignorando.`)
    } else if (error) {
       console.error(`Erro ao criar ${u.email}:`, error.message)
    } else {
       console.log(`${u.email} criado com sucesso!`)
    }
  }
}

seed()
