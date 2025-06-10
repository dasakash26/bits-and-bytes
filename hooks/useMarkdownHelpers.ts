export const useMarkdownHelpers = (
  content: string,
  onContentChange: (content: string) => void
) => {
  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      let newText = "";

      switch (syntax) {
        case "bold":
          newText = `**${selectedText || "bold text"}**`;
          break;
        case "italic":
          newText = `*${selectedText || "italic text"}*`;
          break;
        case "code":
          newText = `\`${selectedText || "code"}\``;
          break;
        case "link":
          newText = `[${selectedText || "link text"}](url)`;
          break;
        case "list":
          newText = `\n- ${selectedText || "list item"}`;
          break;
        case "quote":
          newText = `\n> ${selectedText || "quote text"}`;
          break;
        case "heading":
          newText = `\n## ${selectedText || "heading text"}`;
          break;
        default:
          newText = selectedText;
      }

      const updatedContent =
        content.substring(0, start) + newText + content.substring(end);
      onContentChange(updatedContent);

      // Focus back to textarea and set cursor position
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + newText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  return { insertMarkdown };
};
