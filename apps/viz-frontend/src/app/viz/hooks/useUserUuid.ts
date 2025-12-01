import { useSearchParams } from 'next/navigation';

export function useUserUuid(): string {
  const searchParams = useSearchParams();
  const userUuidParam = searchParams.get('userUuid');

  const userUuid = userUuidParam || process.env.NEXT_PUBLIC_DEFAULT_USER_UUID;

  if (!userUuid) {
    throw new Error('userUuid is required. Provide it via URL params or NEXT_PUBLIC_DEFAULT_USER_UUID env var');
  }

  if (!userUuidParam && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info('ℹ️ Using default userUuid:', userUuid);
  }

  return userUuid;
}
