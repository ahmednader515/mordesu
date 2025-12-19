export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mordesu Studio",
    "alternateName": "استوديو مورديسيو",
    "url": "https://mordesu.com",
    "logo": "https://mordesu.com/logo.png",
    "description": "Leading Arabic game development studio based in Cairo, Egypt. Specializing in immersive gaming experiences and innovative game development.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "addressCountry": "EG",
      "addressRegion": "Cairo Governorate"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201023005622",
      "contactType": "customer service",
      "email": "mordesu1studio@gmail.com",
      "availableLanguage": ["Arabic", "English"]
    },
    "sameAs": [
      "https://www.instagram.com/mordecailll/",
      "https://www.tiktok.com/@1_mordecai_1",
      "https://www.twitch.tv/m0rdecaia"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 