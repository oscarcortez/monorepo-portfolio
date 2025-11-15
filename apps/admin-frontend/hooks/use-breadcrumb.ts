import { useEffect } from 'react';
import { useBreadcrumbStore, BreadcrumbItem } from '@/stores/breadcrumb-store';

/**
 * Hook personalizado para actualizar breadcrumbs
 * @param items - Array de items del breadcrumb
 */
export function useBreadcrumb(items: BreadcrumbItem[]) {
  const setBreadcrumb = useBreadcrumbStore((state) => state.setBreadcrumb);

  useEffect(() => {
    setBreadcrumb(items);
  }, [setBreadcrumb, items]);
}
