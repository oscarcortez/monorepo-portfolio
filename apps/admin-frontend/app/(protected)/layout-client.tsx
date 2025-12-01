'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBreadcrumbStore } from '@/stores/breadcrumb-store';
import Cookies from 'js-cookie';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = useBreadcrumbStore((state) => state.items);

  useEffect(() => {
    // const token = localStorage.getItem('auth_token');
    const token = Cookies.get('auth_token');

    if (!token) {
      console.warn('⚠️ No auth token found, redirecting to login');
      const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
      router.push(`${authUrl}/login-basic`);
      return;
    }

    console.log('✅ User authenticated');
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    <BreadcrumbItem className="hidden md:block">
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
