# DeepL GraphQL API - Guía Completa de Uso

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Mutations](#mutations)
  - [translateText](#translatetext)
  - [translateTexts](#translatetexts)
- [Queries](#queries)
  - [getSourceLanguages](#getsourcelanguages)
  - [getTargetLanguages](#gettargetlanguages)
  - [getDeeplUsage](#getdeeplatausage)
  - [isDeeplHealthy](#isdeeplatalhealthy)
- [Tipos GraphQL](#tipos-graphql)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Códigos de Idiomas](#códigos-de-idiomas)

---

## 📦 Instalación

```bash
npm install deepl-node @nestjs/graphql @nestjs/apollo graphql
```

## ⚙️ Configuración

### Variables de Entorno

```env
DEEPL_AUTH_KEY=tu-clave-api-deepl
DEEPL_SERVER_URL=https://api-free.deepl.com  # Para plan Free
# o
DEEPL_SERVER_URL=https://api.deepl.com       # Para plan Pro
```

### Configuración del Módulo

```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DeeplModule } from './deepl/deepl.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    DeeplModule,
  ],
})
export class AppModule {}
```

---

## 🔄 Mutations

### translateText

Traduce un texto individual con opciones avanzadas.

**Argumentos:**
- `input: TranslateTextInput!`
  - `text: String!` - Texto a traducir
  - `targetLang: String!` - Idioma de destino
  - `sourceLang: String` - Idioma de origen (opcional, auto-detecta si no se proporciona)
  - `preserveFormatting: Boolean` - Preservar formato del texto (opcional)
  - `formality: String` - Nivel de formalidad (opcional)

**Retorna:** `TranslationResult`

#### Ejemplo Básico

```graphql
mutation {
  translateText(
    input: {
      text: "Hello, how are you?"
      targetLang: "es"
    }
  ) {
    translatedText
    detectedSourceLanguage
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "translateText": {
      "translatedText": "Hola, ¿cómo estás?",
      "detectedSourceLanguage": "en"
    }
  }
}
```

#### Ejemplo con Idioma de Origen

```graphql
mutation {
  translateText(
    input: {
      text: "Good morning"
      targetLang: "fr"
      sourceLang: "en"
    }
  ) {
    translatedText
    detectedSourceLanguage
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "translateText": {
      "translatedText": "Bonjour",
      "detectedSourceLanguage": "en"
    }
  }
}
```

#### Ejemplo con Formalidad

```graphql
mutation {
  translateText(
    input: {
      text: "How are you?"
      targetLang: "de"
      formality: "more"
    }
  ) {
    translatedText
    detectedSourceLanguage
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "translateText": {
      "translatedText": "Wie geht es Ihnen?",
      "detectedSourceLanguage": "en"
    }
  }
}
```

#### Ejemplo con Variables

```graphql
mutation TranslateText($input: TranslateTextInput!) {
  translateText(input: $input) {
    translatedText
    detectedSourceLanguage
  }
}
```

**Variables:**
```json
{
  "input": {
    "text": "Welcome to our website",
    "targetLang": "it",
    "sourceLang": "en",
    "preserveFormatting": true
  }
}
```

---

### translateTexts

Traduce múltiples textos en una sola petición (batch translation).

**Argumentos:**
- `input: TranslateTextsInput!`
  - `texts: [String!]!` - Array de textos a traducir
  - `targetLang: String!` - Idioma de destino
  - `sourceLang: String` - Idioma de origen (opcional)

**Retorna:** `[String!]!`

#### Ejemplo Básico

```graphql
mutation {
  translateTexts(
    input: {
      texts: [
        "Hello",
        "Goodbye",
        "Thank you",
        "You're welcome"
      ]
      targetLang: "es"
    }
  )
}
```

**Respuesta:**
```json
{
  "data": {
    "translateTexts": [
      "Hola",
      "Adiós",
      "Gracias",
      "De nada"
    ]
  }
}
```

#### Ejemplo con Idioma de Origen

```graphql
mutation {
  translateTexts(
    input: {
      texts: [
        "Good morning",
        "Good afternoon",
        "Good evening",
        "Good night"
      ]
      targetLang: "ja"
      sourceLang: "en"
    }
  )
}
```

**Respuesta:**
```json
{
  "data": {
    "translateTexts": [
      "おはようございます",
      "こんにちは",
      "こんばんは",
      "おやすみなさい"
    ]
  }
}
```

#### Ejemplo con Variables

```graphql
mutation TranslateMultiple($input: TranslateTextsInput!) {
  translateTexts(input: $input)
}
```

**Variables:**
```json
{
  "input": {
    "texts": [
      "Home",
      "About",
      "Services",
      "Contact"
    ],
    "targetLang": "de"
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "translateTexts": [
      "Startseite",
      "Über uns",
      "Dienstleistungen",
      "Kontakt"
    ]
  }
}
```

---

## 🔍 Queries

### getSourceLanguages

Obtiene la lista de idiomas de origen soportados por DeepL.

**Argumentos:** Ninguno

**Retorna:** `[LanguageInfo!]!`

#### Ejemplo

```graphql
query {
  getSourceLanguages {
    code
    name
    supportsFormality
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "getSourceLanguages": [
      {
        "code": "ar",
        "name": "Arabic",
        "supportsFormality": false
      },
      {
        "code": "bg",
        "name": "Bulgarian",
        "supportsFormality": false
      },
      {
        "code": "cs",
        "name": "Czech",
        "supportsFormality": false
      },
      {
        "code": "da",
        "name": "Danish",
        "supportsFormality": false
      },
      {
        "code": "de",
        "name": "German",
        "supportsFormality": true
      },
      {
        "code": "en",
        "name": "English",
        "supportsFormality": false
      },
      {
        "code": "es",
        "name": "Spanish",
        "supportsFormality": true
      },
      {
        "code": "fr",
        "name": "French",
        "supportsFormality": true
      },
      {
        "code": "it",
        "name": "Italian",
        "supportsFormality": true
      },
      {
        "code": "ja",
        "name": "Japanese",
        "supportsFormality": true
      },
      {
        "code": "pt",
        "name": "Portuguese",
        "supportsFormality": true
      },
      {
        "code": "ru",
        "name": "Russian",
        "supportsFormality": true
      },
      {
        "code": "zh",
        "name": "Chinese",
        "supportsFormality": false
      }
    ]
  }
}
```

---

### getTargetLanguages

Obtiene la lista de idiomas de destino soportados por DeepL.

**Argumentos:** Ninguno

**Retorna:** `[LanguageInfo!]!`

#### Ejemplo

```graphql
query {
  getTargetLanguages {
    code
    name
    supportsFormality
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "getTargetLanguages": [
      {
        "code": "ar",
        "name": "Arabic",
        "supportsFormality": false
      },
      {
        "code": "bg",
        "name": "Bulgarian",
        "supportsFormality": false
      },
      {
        "code": "cs",
        "name": "Czech",
        "supportsFormality": false
      },
      {
        "code": "da",
        "name": "Danish",
        "supportsFormality": false
      },
      {
        "code": "de",
        "name": "German",
        "supportsFormality": true
      },
      {
        "code": "en-GB",
        "name": "English (British)",
        "supportsFormality": false
      },
      {
        "code": "en-US",
        "name": "English (American)",
        "supportsFormality": false
      },
      {
        "code": "es",
        "name": "Spanish",
        "supportsFormality": true
      },
      {
        "code": "fr",
        "name": "French",
        "supportsFormality": true
      },
      {
        "code": "it",
        "name": "Italian",
        "supportsFormality": true
      },
      {
        "code": "ja",
        "name": "Japanese",
        "supportsFormality": true
      },
      {
        "code": "pt-BR",
        "name": "Portuguese (Brazilian)",
        "supportsFormality": true
      },
      {
        "code": "pt-PT",
        "name": "Portuguese (European)",
        "supportsFormality": true
      },
      {
        "code": "ru",
        "name": "Russian",
        "supportsFormality": true
      },
      {
        "code": "zh",
        "name": "Chinese (simplified)",
        "supportsFormality": false
      }
    ]
  }
}
```

---

### getDeeplUsage

Obtiene estadísticas de uso de la API de DeepL.

**Argumentos:** Ninguno

**Retorna:** `UsageInfo!`

#### Ejemplo

```graphql
query {
  getDeeplUsage {
    characterCount
    characterLimit
    documentCount
    documentLimit
    teamDocumentCount
    teamDocumentLimit
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "getDeeplUsage": {
      "characterCount": 45230,
      "characterLimit": 500000,
      "documentCount": 5,
      "documentLimit": 20,
      "teamDocumentCount": null,
      "teamDocumentLimit": null
    }
  }
}
```

#### Ejemplo - Solo Caracteres

```graphql
query {
  getDeeplUsage {
    characterCount
    characterLimit
  }
}
```

**Respuesta:**
```json
{
  "data": {
    "getDeeplUsage": {
      "characterCount": 45230,
      "characterLimit": 500000
    }
  }
}
```

---

### isDeeplHealthy

Verifica si el servicio de DeepL está funcionando correctamente.

**Argumentos:** Ninguno

**Retorna:** `Boolean!`

#### Ejemplo

```graphql
query {
  isDeeplHealthy
}
```

**Respuesta (Servicio funcionando):**
```json
{
  "data": {
    "isDeeplHealthy": true
  }
}
```

**Respuesta (Servicio con problemas):**
```json
{
  "data": {
    "isDeeplHealthy": false
  }
}
```

---

## 📊 Tipos GraphQL

### TranslationResult

```graphql
type TranslationResult {
  translatedText: String!
  detectedSourceLanguage: String
}
```

### LanguageInfo

```graphql
type LanguageInfo {
  code: String!
  name: String!
  supportsFormality: Boolean
}
```

### UsageInfo

```graphql
type UsageInfo {
  characterCount: Int!
  characterLimit: Int
  documentCount: Int
  documentLimit: Int
  teamDocumentCount: Int
  teamDocumentLimit: Int
}
```

### TranslateTextInput

```graphql
input TranslateTextInput {
  text: String!
  targetLang: String!
  sourceLang: String
  preserveFormatting: Boolean
  formality: String
}
```

### TranslateTextsInput

```graphql
input TranslateTextsInput {
  texts: [String!]!
  targetLang: String!
  sourceLang: String
}
```

---

## 💡 Ejemplos de Uso

### Caso 1: Traducir Contenido de Blog

```graphql
mutation TranslateBlogPost {
  title: translateText(
    input: {
      text: "10 Tips for Better Code"
      targetLang: "es"
    }
  ) {
    translatedText
  }
  
  content: translateText(
    input: {
      text: "Writing clean code is essential for maintainability..."
      targetLang: "es"
    }
  ) {
    translatedText
  }
}
```

### Caso 2: Menú de Navegación Multiidioma

```graphql
mutation TranslateNavMenu {
  translateTexts(
    input: {
      texts: [
        "Home",
        "About Us",
        "Services",
        "Portfolio",
        "Blog",
        "Contact"
      ]
      targetLang: "fr"
    }
  )
}
```

### Caso 3: Verificar Límites Antes de Traducir

```graphql
query CheckUsageBeforeTranslation {
  usage: getDeeplUsage {
    characterCount
    characterLimit
  }
  
  isHealthy: isDeeplHealthy
}
```

### Caso 4: Traducción Formal para Correo Profesional

```graphql
mutation TranslateFormalEmail {
  translateText(
    input: {
      text: "Thank you for your interest in our services"
      targetLang: "de"
      formality: "more"
    }
  ) {
    translatedText
    detectedSourceLanguage
  }
}
```

### Caso 5: Sistema de Soporte Multiidioma

```graphql
mutation TranslateSupportMessages {
  greeting: translateText(
    input: {
      text: "Hello, how can I help you?"
      targetLang: "ja"
    }
  ) {
    translatedText
  }
  
  farewell: translateText(
    input: {
      text: "Thank you for contacting us"
      targetLang: "ja"
    }
  ) {
    translatedText
  }
}
```

### Caso 6: Obtener Idiomas para Selector

```graphql
query GetLanguagesForDropdown {
  getTargetLanguages {
    code
    name
  }
}
```

---

## 🌍 Códigos de Idiomas

### Idiomas de Origen (Source Languages)

| Código | Idioma |
|--------|--------|
| `ar` | Arabic |
| `bg` | Bulgarian |
| `cs` | Czech |
| `da` | Danish |
| `de` | German |
| `el` | Greek |
| `en` | English |
| `es` | Spanish |
| `et` | Estonian |
| `fi` | Finnish |
| `fr` | French |
| `hu` | Hungarian |
| `id` | Indonesian |
| `it` | Italian |
| `ja` | Japanese |
| `ko` | Korean |
| `lt` | Lithuanian |
| `lv` | Latvian |
| `nb` | Norwegian |
| `nl` | Dutch |
| `pl` | Polish |
| `pt` | Portuguese |
| `ro` | Romanian |
| `ru` | Russian |
| `sk` | Slovak |
| `sl` | Slovenian |
| `sv` | Swedish |
| `tr` | Turkish |
| `uk` | Ukrainian |
| `zh` | Chinese |

### Idiomas de Destino (Target Languages)

| Código | Idioma |
|--------|--------|
| `ar` | Arabic |
| `bg` | Bulgarian |
| `cs` | Czech |
| `da` | Danish |
| `de` | German |
| `el` | Greek |
| `en-GB` | English (British) |
| `en-US` | English (American) |
| `es` | Spanish |
| `et` | Estonian |
| `fi` | Finnish |
| `fr` | French |
| `hu` | Hungarian |
| `id` | Indonesian |
| `it` | Italian |
| `ja` | Japanese |
| `ko` | Korean |
| `lt` | Lithuanian |
| `lv` | Latvian |
| `nb` | Norwegian |
| `nl` | Dutch |
| `pl` | Polish |
| `pt-BR` | Portuguese (Brazilian) |
| `pt-PT` | Portuguese (European) |
| `ro` | Romanian |
| `ru` | Russian |
| `sk` | Slovak |
| `sl` | Slovenian |
| `sv` | Swedish |
| `tr` | Turkish |
| `uk` | Ukrainian |
| `zh` | Chinese (simplified) |

### Niveles de Formalidad

| Valor | Descripción |
|-------|-------------|
| `default` | Nivel de formalidad por defecto |
| `more` | Más formal (para situaciones profesionales) |
| `less` | Menos formal (para situaciones casuales) |
| `prefer_more` | Preferir más formal si está disponible |
| `prefer_less` | Preferir menos formal si está disponible |

**Nota:** No todos los idiomas soportan formalidad. Verifica el campo `supportsFormality` en `getTargetLanguages`.

---

## 🚀 Testing en GraphQL Playground

1. Inicia tu aplicación NestJS:
   ```bash
   npm run start:dev
   ```

2. Abre el navegador en:
   ```
   http://localhost:3000/graphql
   ```

3. Prueba las queries y mutations directamente en el playground interactivo

---

## ⚠️ Límites y Consideraciones

### Plan Free
- **Límite:** 500,000 caracteres/mes
- **Documentos:** Limitados según el plan
- **Rate Limiting:** Aplica

### Plan Pro
- **Límite:** Según tu plan contratado
- **Documentos:** Según tu plan
- **Soporte prioritario**

### Mejores Prácticas

1. **Batch Translations:** Usa `translateTexts` para traducir múltiples textos y reducir llamadas API
2. **Caché:** Implementa caché para traducciones frecuentes
3. **Manejo de Errores:** Siempre maneja errores en tu cliente GraphQL
4. **Monitoreo de Uso:** Verifica regularmente `getDeeplUsage` para evitar exceder límites
5. **Health Checks:** Usa `isDeeplHealthy` en tus health checks de sistema

---

## 🔧 Troubleshooting

### Error: "Invalid authentication key"
- Verifica que `DEEPL_AUTH_KEY` esté configurada correctamente
- Verifica que estés usando la URL correcta (Free vs Pro)

### Error: "Quota exceeded"
- Verifica tu uso con `getDeeplUsage`
- Espera al próximo ciclo de facturación o actualiza tu plan

### Error: "Target language not supported"
- Verifica la lista de idiomas con `getTargetLanguages`
- Asegúrate de usar el código correcto (ej: `en-US` no `en` para inglés)

---

## 📚 Referencias

- [DeepL API Documentation](https://www.deepl.com/docs-api)
- [NestJS GraphQL Documentation](https://docs.nestjs.com/graphql/quick-start)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)

---

## 📄 Licencia

MIT