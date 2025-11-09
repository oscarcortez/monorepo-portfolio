// import { LoginForm } from "@/components/login-form"
import { LoginForm } from '@/components/login-01-form';
import { SIGNIN_MUTATION } from './graphql';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm title="Login to your account1" description="Enter your email below to login to your account" />
      </div>
    </div>
  );
}
