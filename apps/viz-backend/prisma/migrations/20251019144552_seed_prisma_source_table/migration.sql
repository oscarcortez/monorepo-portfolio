INSERT INTO
  "public"."payment_sources" (
    "name",
    "type",
    "code",
    "logo_path",
    "website",
    "country_code",
    "metadata"
  )
VALUES
  (
    'Banco Económico',
    'BANK',
    'BE',
    '/svg/banco-economico.svg',
    'https://www.bancoeconomico.com.bo',
    'BO',
    '{"swift":"BECBBOB0"}'
  ),
  (
    'BNB',
    'CRYPTO',
    'BNB',
    '/svg/bnb.svg',
    'https://www.bnb.com.bo/',
    'BO',
    '{"network":"bnb","example_address":"bnb1..."}'
  ),
  (
    'Binance',
    'CRYPTO',
    'BINANCE',
    '/svg/binance.svg',
    'https://www.binance.com',
    NULL,
    '{"exchange": true, "supports_deposits": true}'
  ),
  (
    'Meru PSP',
    'PSP',
    'MERU',
    '/svg/meru.svg',
    'https://www.meru.com',
    'BO',
    '{"provider":"Meru","notes":"local PSP"}'
  );