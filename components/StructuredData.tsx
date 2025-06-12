import Script from "next/script";

interface StructuredDataProps {
  type?: "website" | "blog" | "article" | "organization";
  data?: Record<string, any>;
}

export function StructuredData({
  type = "website",
  data = {},
}: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "website":
        return {
          ...baseData,
          "@type": "WebSite",
          name: "Bits & Bytes",
          description: "A comprehensive tech blogging platform for developers",
          url: "https://bits-and-bytes-rho.vercel.app",
          publisher: {
            "@type": "Organization",
            name: "Bits & Bytes",
            logo: {
              "@type": "ImageObject",
              url: "https://bits-and-bytes-rho.vercel.app/logo.webp",
            },
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://bits-and-bytes-rho.vercel.app/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          ...data,
        };

      case "blog":
        return {
          ...baseData,
          "@type": "Blog",
          name: "Bits & Bytes Tech Blog",
          description:
            "Latest articles on web development, programming, and technology",
          url: "https://bits-and-bytes-rho.vercel.app/feed",
          publisher: {
            "@type": "Organization",
            name: "Bits & Bytes",
            logo: {
              "@type": "ImageObject",
              url: "https://bits-and-bytes-rho.vercel.app/logo.webp",
            },
          },
          ...data,
        };

      case "article":
        return {
          ...baseData,
          "@type": "BlogPosting",
          headline: data.title,
          description: data.description,
          image: {
            "@type": "ImageObject",
            url:
              data.image || "https://bits-and-bytes-rho.vercel.app/logo.webp",
          },
          author: {
            "@type": "Person",
            name: data.author?.name || "Bits & Bytes Team",
          },
          publisher: {
            "@type": "Organization",
            name: "Bits & Bytes",
            logo: {
              "@type": "ImageObject",
              url: "https://bits-and-bytes-rho.vercel.app/logo.webp",
            },
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url,
          },
          ...data,
        };

      case "organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "Bits & Bytes",
          description: "A comprehensive tech blogging platform for developers",
          url: "https://bits-and-bytes-rho.vercel.app",
          logo: {
            "@type": "ImageObject",
            url: "https://bits-and-bytes-rho.vercel.app/logo.webp",
          },
          sameAs: [
            "https://twitter.com/bitsandbytes",
            "https://github.com/bitsandbytes",
            "https://linkedin.com/company/bitsandbytes",
          ],
          ...data,
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
