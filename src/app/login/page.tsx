import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return <LoginForm searchParams={searchParams} />
}
