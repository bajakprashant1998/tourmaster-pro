import { useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Redo,
  Code,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onChange(text);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  };

  const ToolbarButton = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
    <button
      type="button"
      className={`p-1.5 rounded hover:bg-muted transition-colors ${
        active ? "bg-muted text-primary" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => <div className="w-px h-6 bg-border mx-1" />;

  return (
    <div className="rich-editor">
      {/* Toolbar */}
      <div className="rich-editor-toolbar flex-wrap gap-y-2">
        <Select defaultValue="paragraph">
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="h1">Heading 1</SelectItem>
            <SelectItem value="h2">Heading 2</SelectItem>
            <SelectItem value="h3">Heading 3</SelectItem>
          </SelectContent>
        </Select>

        <ToolbarDivider />

        <ToolbarButton>
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>
          <Link className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Image className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Code className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Content Area */}
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="rich-editor-content w-full resize-none bg-transparent placeholder:text-muted-foreground"
        rows={6}
      />

      {/* Footer */}
      <div className="px-4 py-2 border-t border-input flex justify-end">
        <span className="text-xs text-muted-foreground">
          {wordCount} WORDS · POWERED BY TINY
        </span>
      </div>
    </div>
  );
}
