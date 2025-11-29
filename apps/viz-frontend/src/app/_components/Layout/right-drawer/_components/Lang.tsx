import { JSX, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Language = {
  code: string;
  name: string;
  nativeName: string;
  countryCode: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', countryCode: 'us' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', countryCode: 'es' },
  { code: 'fr', name: 'French', nativeName: 'Français', countryCode: 'fr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', countryCode: 'de' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', countryCode: 'it' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', countryCode: 'pt' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', countryCode: 'jp' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', countryCode: 'kr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', countryCode: 'cn' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', countryCode: 'ru' },
];

export function Lang(): JSX.Element {
  const [currentLang, setCurrentLang] = useState('en');

  const handleLanguageChange = (language: Language) => {
    setCurrentLang(language.code);
    // eslint-disable-next-line no-console
    console.log('Language selected:', {
      code: language.code,
      name: language.name,
      nativeName: language.nativeName,
    });
  };

  return (
    <div className="py-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Select Language</h3>
        <p className="text-sm text-gray-600">Choose your preferred language</p>
      </div>

      <div className="space-y-2">
        {languages.map((language) => (
          <Button
            key={language.code}
            variant="ghost"
            className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-cyan-50 cursor-pointer"
            onClick={() => handleLanguageChange(language)}
          >
            <div className="flex items-center gap-3 w-full">
              <Image
                src={`https://flagcdn.com/w40/${language.countryCode}.png`}
                alt={`${language.name} flag`}
                width={32}
                height={24}
                className="rounded shadow-sm"
                unoptimized
              />
              <div className="flex-1">
                <div className="font-medium">{language.name}</div>
                <div className="text-sm text-gray-500">{language.nativeName}</div>
              </div>
              {currentLang === language.code && <Check className="text-cyan-700" size={20} />}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
