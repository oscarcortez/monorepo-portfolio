import { registerEnumType } from '@nestjs/graphql';
import {
  ContactType,
  DeviceType,
  LanguageCode,
  PaymentSourceType,
} from '@prisma/client';

registerEnumType(DeviceType, {
  name: 'DeviceType',
  description: 'Device type for hero greetings',
});

registerEnumType(ContactType, {
  name: 'ContactType',
  description: 'Contact type enumeration',
});

registerEnumType(LanguageCode, {
  name: 'LanguageCode',
  description: 'Language code enumeration',
});

registerEnumType(PaymentSourceType, {
  name: 'PaymentSourceType',
  description: 'Payment source type enumeration',
});
// Export the enums for use in other files
export { DeviceType, ContactType, LanguageCode, PaymentSourceType };
