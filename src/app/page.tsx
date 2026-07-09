import { Metadata } from 'next'
import { LandingLayout } from '@/components/landing/LandingLayout'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { PricingAndCompare } from '@/components/landing/PricingAndCompare'

export const metadata: Metadata = {
  title: 'Alugho — Gestão de Aluguel Simplificada',
  description: 'O 1º assistente de gestão para proprietários. Administre seus aluguéis sem pagar 10% todo mês.'
}

export default function Home() {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <PricingAndCompare />
    </LandingLayout>
  )
}
