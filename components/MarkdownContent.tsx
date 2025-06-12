"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const { theme } = useTheme();
  const syntaxTheme = theme === "dark" ? vscDarkPlus : vs;

  return (
    <div className="max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;

            return isInline ? (
              <code
                className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-red-600 dark:text-red-400"
                {...props}
              >
                {children}
              </code>
            ) : (
              <SyntaxHighlighter
                style={syntaxTheme as any}
                language={match[1]}
                PreTag="div"
                className="rounded-lg border my-4"
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.875rem",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
          pre({ children }: any) {
            return <div className="overflow-x-auto">{children}</div>;
          },
          h1({ children }: any) {
            return (
              <h1 className="text-3xl font-bold mb-6 mt-8 text-foreground border-b border-gray-200 dark:border-gray-700 pb-2">
                {children}
              </h1>
            );
          },
          h2({ children }: any) {
            return (
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">
                {children}
              </h2>
            );
          },
          h3({ children }: any) {
            return (
              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">
                {children}
              </h3>
            );
          },
          h4({ children }: any) {
            return (
              <h4 className="text-lg font-semibold mb-2 mt-4 text-foreground">
                {children}
              </h4>
            );
          },
          p({ children }: any) {
            return (
              <p className="mb-4 text-foreground leading-relaxed text-base">
                {children}
              </p>
            );
          },
          ul({ children }: any) {
            return (
              <ul className="list-disc list-inside ml-6 mb-4 space-y-2 text-foreground">
                {children}
              </ul>
            );
          },
          ol({ children }: any) {
            return (
              <ol className="list-decimal list-inside ml-6 mb-4 space-y-2 text-foreground">
                {children}
              </ol>
            );
          },
          li({ children }: any) {
            return <li className="text-foreground mb-1 pl-2">{children}</li>;
          },
          blockquote({ children }: any) {
            return (
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
                <div className="text-gray-700 dark:text-gray-300 italic">
                  {children}
                </div>
              </blockquote>
            );
          },
          table({ children }: any) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }: any) {
            return (
              <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
            );
          },
          tbody({ children }: any) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }: any) {
            return (
              <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                {children}
              </tr>
            );
          },
          th({ children }: any) {
            return (
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-foreground font-semibold text-left">
                {children}
              </th>
            );
          },
          td({ children }: any) {
            return (
              <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-foreground">
                {children}
              </td>
            );
          },
          a({ children, href }: any) {
            return (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={
                  href?.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {children}
              </a>
            );
          },
          hr({}: any) {
            return <hr className="my-8 border-gray-200 dark:border-gray-700" />;
          },
          strong({ children }: any) {
            return (
              <strong className="font-bold text-foreground">{children}</strong>
            );
          },
          em({ children }: any) {
            return <em className="italic text-foreground">{children}</em>;
          },
          img({ src, alt }: any) {
            return (
              <div className="my-6">
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                  loading="lazy"
                />
                {alt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2 italic">
                    {alt}
                  </p>
                )}
              </div>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
