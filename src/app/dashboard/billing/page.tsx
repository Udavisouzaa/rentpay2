import { createClient } from '@/utils/supabase/server'
import { BillingOverview } from '@/components/billing/BillingOverview'

export const revalidate = 0;

export default async function BillingPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Se não existir registro, consideramos inativo
  const subscriptionData = {
    status: (sub?.status as any) || 'none',
    currentPeriodEnd: sub?.current_period_end || null
  }

  return <BillingOverview subscription={subscriptionData} />
}
