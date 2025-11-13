import { Path } from 'react-hook-form';

export type FieldMeta<T> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
};
