import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect the root path to the dashboard. 
  // Our middleware will automatically redirect unauthenticated users to /login
  redirect('/dashboard');
}
