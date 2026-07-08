import { createClient } from '@/utils/supabase/server'
import { PropertiesList } from '@/components/dashboard/PropertiesList'

export const revalidate = 0;

export default async function PropertiesPage() {
  const supabase = await createClient()

  const { data: properties, error } = await supabase
    .from('properties')
    .select('id, endereco, valor_aluguel, status')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
  }

  const mappedProperties = (properties || []).map(p => ({
    id: p.id,
    address: p.endereco,
    price: Number(p.valor_aluguel) || 0,
    status: (p.status === 'ocupado' ? 'Rented' : 'Vacant') as 'Rented' | 'Vacant',
    // Mock image for visual completeness as we don't have images in DB yet
    image: `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80`
  }))

  return <PropertiesList properties={mappedProperties} />
}
