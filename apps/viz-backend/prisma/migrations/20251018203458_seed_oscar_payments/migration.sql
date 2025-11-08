INSERT INTO
  "public"."payments" (
    user_id,
    title,
    display_text,
    link,
    icon_path,
    class_name,
    is_favorite,
    sort_order
  )
VALUES
  (
    1,
    'BNB',
    'Pagos Varios',
    'https://www.bnb.com.bo/',
    '/svg/bnb-icon.svg',
    'bg-slate-700',
    FALSE,
    2
  ),
  (
    1,
    'Banco Economico',
    'Pagos Varios',
    'https://www.bcp.com.bo/',
    '/svg/baneco-icon.svg',
    'bg-slate-800',
    TRUE,
    1
  ),
  (
    1,
    'Binance',
    'Pagos Varios',
    'https://www.binance.com/',
    '/svg/binance-icon.svg',
    'bg-slate-800',
    FALSE,
    3
  );