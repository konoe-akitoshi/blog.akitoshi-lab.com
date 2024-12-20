export default function preprocessMarkdown(markdown: string): string {
    // :::note info の形式を <div class="note info"> に変換
    markdown = markdown.replace(/:::note\s+(\w+)\n([\s\S]*?)\n:::/g, (_, type, content) => {
      return `<div class="note ${type}">\n${content.trim()}\n</div>`;
    });
  
    // Markdown画像記法を安全に処理
    markdown = markdown.replace(/!\[([^\]]*)\]\((http[^\)]+)\)/g, (_, altText, url) => {
      const encodedUrl = encodeURI(url);
      return `![${altText}](${encodedUrl})`;
    });
  
    // Xリンクを埋め込みHTMLに変換
    markdown = markdown.replace(
      /(https:\/\/x\.com\/\w+\/status\/\d+)/g,
      (url) => {
        return `<div class="x-embed">
          <blockquote class="twitter-tweet">
            <a href="${url}"></a>
          </blockquote>
        </div>`;
      }
    );
  
    return markdown;
  }
  