"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister, useLogin } from '@/hooks/api/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: registerUser, isPending: isRegistering, error } = useRegister();
  const { mutate: loginUser } = useLogin();
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    registerUser(data, {
      onSuccess: () => {
        // Automatically login the user upon successful registration
        loginUser({ email: data.email, password: data.password }, {
          onSuccess: () => router.push('/dashboard')
        });
      }
    });
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Sign up</h2>
        <p className="text-sm text-zinc-400">Create a new account to get started.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-zinc-300">First name</label>
            <input 
              id="firstName"
              placeholder="John"
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              {...register('firstName')}
            />
            {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-zinc-300">Last name</label>
            <input 
              id="lastName"
              placeholder="Doe"
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              {...register('lastName')}
            />
            {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email address</label>
          <input 
            id="email"
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-zinc-300">Password</label>
          <input 
            id="password" 
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 animate-in fade-in zoom-in-95 duration-300">
            <p className="text-xs text-red-400 text-center">Registration failed. Email may be taken.</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isRegistering}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 transition-all active:scale-[0.98] mt-2"
        >
          {isRegistering ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
