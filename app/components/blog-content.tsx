import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

interface BlogContentProps {
  content: string;
}

// Configure marked with highlight.js for syntax highlighting
marked.use(markedHighlight({
  highlight(code, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch (err) {
      return code;
    }
  }
}));

marked.setOptions({
  breaks: true,
  gfm: true,
});

export async function BlogContent({ content }: BlogContentProps) {
  const htmlContent = await marked.parse(content);

  return (
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent as string }}
    />
  );
}