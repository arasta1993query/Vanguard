import '@testing-library/jest-dom'; // Adds custom Jest matchers for asserting on DOM nodes (e.g., toBeInTheDocument)
import { vi } from 'vitest';

// Automatically mock Next.js routing specifically during unit-testing 
// to prevent "NextRouter was not mounted" crashes.
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  })),
  usePathname: vi.fn(() => '/dashboard'),
  redirect: vi.fn(),
}));
