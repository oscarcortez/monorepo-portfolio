import { registerEnumType } from '@nestjs/graphql';
import { ContactType, DeviceType, LanguageCode } from '@prisma/client';

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

// Export the enums for use in other files
export { DeviceType, ContactType, LanguageCode };
