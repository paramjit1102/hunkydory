import React from "react";

export interface ParsedTag {
  type: "script" | "style" | "meta" | "link" | "noscript";
  attributes: Record<string, any>;
  content: string;
}

function mapAttributes(attrs: Record<string, any>): Record<string, any> {
  const mapped: Record<string, any> = {};
  const propMap: Record<string, string> = {
    class: "className",
    charset: "charSet",
    crossorigin: "crossOrigin",
    referrerpolicy: "referrerPolicy",
    "http-equiv": "httpEquiv",
    autocomplete: "autoComplete"
  };

  for (const [key, val] of Object.entries(attrs)) {
    const lower = key.toLowerCase();
    const propName = propMap[lower] || key;
    if (val === true || val === "" || val === key) {
      mapped[propName] = true;
    } else {
      mapped[propName] = val;
    }
  }
  return mapped;
}

export function parseSnippet(raw?: string): { items: ParsedTag[]; rawFallback?: string } {
  if (!raw || !raw.trim()) return { items: [] };
  const text = raw.trim();

  // If no HTML tags at all, treat entire string as an inline JavaScript code block
  if (!text.includes("<") && !text.includes(">")) {
    return {
      items: [{ type: "script", attributes: {}, content: text }]
    };
  }

  const items: ParsedTag[] = [];
  const tagRegex = /<(script|style|meta|link|noscript)([\s\S]*?)(?:>(?:([\s\S]*?)<\/\1>)?|\/>)/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(text)) !== null) {
    const tagName = match[1].toLowerCase() as ParsedTag["type"];
    const rawAttrs = match[2] || "";
    const content = match[3] || "";

    const attrs: Record<string, any> = {};
    const attrRegex = /([a-zA-Z0-9_\-:@.]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      const name = attrMatch[1];
      const val =
        attrMatch[2] !== undefined
          ? attrMatch[2]
          : attrMatch[3] !== undefined
          ? attrMatch[3]
          : attrMatch[4] !== undefined
          ? attrMatch[4]
          : true;
      attrs[name] = val;
    }

    items.push({
      type: tagName,
      attributes: mapAttributes(attrs),
      content: content.trim()
    });
  }

  // Check if non-script/non-style tags exist (like <div>, <iframe>, etc.)
  const remaining = text
    .replace(tagRegex, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

  return { items, rawFallback: remaining || undefined };
}

/**
 * Injects custom header scripts, meta tags, and style sheets inside `<head>`
 */
export function CustomHeaderScripts({ scripts }: { scripts?: string }) {
  if (!scripts || !scripts.trim()) return null;

  const { items, rawFallback } = parseSnippet(scripts);

  // Fallback: If no tags matched but content exists, treat as inline script
  if (items.length === 0 && rawFallback) {
    return <script dangerouslySetInnerHTML={{ __html: rawFallback }} />;
  }

  return (
    <>
      {items.map((item, idx) => {
        const key = `custom-head-${item.type}-${idx}`;
        switch (item.type) {
          case "script":
            if (item.attributes.src) {
              return <script key={key} {...item.attributes} />;
            }
            return (
              <script
                key={key}
                {...item.attributes}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          case "style":
            return (
              <style
                key={key}
                {...item.attributes}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          case "meta":
            return <meta key={key} {...item.attributes} />;
          case "link":
            return <link key={key} {...item.attributes} />;
          case "noscript":
            return (
              <noscript
                key={key}
                {...item.attributes}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

/**
 * Injects custom footer scripts and widgets right before `</body>`
 */
export function CustomFooterScripts({ scripts }: { scripts?: string }) {
  if (!scripts || !scripts.trim()) return null;

  const { items, rawFallback } = parseSnippet(scripts);

  // Fallback: If no tags matched but content exists, render in a container
  if (items.length === 0 && rawFallback) {
    return (
      <div
        id="global-footer-custom-scripts"
        dangerouslySetInnerHTML={{ __html: rawFallback }}
      />
    );
  }

  return (
    <>
      {items.map((item, idx) => {
        const key = `custom-foot-${item.type}-${idx}`;
        switch (item.type) {
          case "script":
            if (item.attributes.src) {
              return <script key={key} {...item.attributes} />;
            }
            return (
              <script
                key={key}
                {...item.attributes}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          case "style":
            return (
              <style
                key={key}
                {...item.attributes}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          case "noscript":
            return (
              <noscript
                key={key}
                {...item.attributes}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          default:
            return null;
        }
      })}
      {rawFallback && (
        <div
          id="global-footer-custom-html"
          dangerouslySetInnerHTML={{ __html: rawFallback }}
        />
      )}
    </>
  );
}
