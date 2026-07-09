const { createClient } = require('@supabase/supabase-js')

// As chaves devem vir do .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Faltando URL ou Service Key!")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function clearAllUsers() {
  console.log("Iniciando limpeza do banco de dados (excluindo todos os usuários)...")
  
  // Lista todos os usuários (limit 1000 por vez)
  const { data: { users }, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  })

  if (error) {
    console.error("Erro ao listar usuários:", error)
    return
  }

  console.log(`Encontrados ${users.length} usuários. Excluindo...`)

  for (const user of users) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
    if (deleteError) {
      console.error(`Falha ao excluir usuário ${user.id} (${user.email}):`, deleteError)
    } else {
      console.log(`Usuário excluído: ${user.email}`)
    }
  }

  console.log("Limpeza concluída! Todos os usuários e dados atrelados (se configurado CASCADE) foram removidos.")
}

clearAllUsers()
