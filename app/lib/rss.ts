export interface RSSFeedItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  updatedDate?: string;
  tags?: string[];
}

export interface RSSFeedOptions {
  title: string;
  description: string;
  link: string;
  language?: string;
}

export class RSSFeedGenerator {
  private readonly options: RSSFeedOptions;

  constructor(options: RSSFeedOptions) {
    this.options = {
      language: "ja-JP",
      ...options,
    };
  }

  generate(items: RSSFeedItem[]): string {
    const now = new Date().toISOString();

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${this.escapeXml(this.options.title)}</title>
    <description>${this.escapeXml(this.options.description)}</description>
    <link>${this.options.link}</link>
    <language>${this.options.language}</language>
    <atom:link href="${this.options.link}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${now}</lastBuildDate>
${this.renderItems(items)}
  </channel>
</rss>`;
  }

  private renderItems(items: RSSFeedItem[]): string {
    return items
      .map((item) => {
        const categories = item.tags
          ? item.tags.map((tag) => `    <category>${this.escapeXml(tag)}</category>`).join("\n")
          : "";

        return `    <item>
      <title>${this.escapeXml(item.title)}</title>
      <description>${this.escapeXml(item.description)}</description>
      <link>${item.link}</link>
      <pubDate>${item.pubDate}</pubDate>
      ${categories}
    </item>`;
      })
      .join("\n");
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}
