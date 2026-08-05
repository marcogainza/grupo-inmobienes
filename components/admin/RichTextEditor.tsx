"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";

function ToolbarButton({
  onClick,
  active,
  label,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-semibold transition ${
        active ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Editor de texto enriquecido para el contenido de noticias del blog.
 * Guarda el resultado como HTML en un <input type="hidden">, leído por
 * el server action igual que antes (FormData.get(name)). Incluye un modo
 * "</> HTML" para pegar o editar markup HTML directamente.
 */
export default function RichTextEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const [htmlMode, setHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      TableKit.configure({ table: { resizable: true } }),
      Placeholder.configure({
        placeholder: "Escribe el contenido del artículo…",
      }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[240px] focus:outline-none px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      setRawHtml(editor.getHTML());
    },
  });

  function toggleHtmlMode() {
    if (!editor) return;
    if (htmlMode) {
      // Volvemos a modo visual: el HTML editado a mano pasa a ser el contenido.
      editor.commands.setContent(rawHtml);
    } else {
      setRawHtml(editor.getHTML());
    }
    setHtmlMode((v) => !v);
  }

  if (!editor) return null;

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-slate-300 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <ToolbarButton
          title="Negrita"
          label="N"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          title="Cursiva"
          label="K"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          title="Subrayado"
          label="S"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          title="Tachado"
          label="T"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <span className="mx-1 h-4 w-px bg-slate-300" />
        <ToolbarButton
          title="Título grande"
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          title="Título mediano"
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
        <span className="mx-1 h-4 w-px bg-slate-300" />
        <ToolbarButton
          title="Lista con viñetas"
          label="• Lista"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          title="Lista numerada"
          label="1. Lista"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          title="Cita"
          label="❝ Cita"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <span className="mx-1 h-4 w-px bg-slate-300" />
        <ToolbarButton
          title="Insertar enlace"
          label="🔗 Enlace"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL del enlace:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        />
        <ToolbarButton
          title="Insertar tabla"
          label="⊞ Tabla"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        />
        <span className="mx-1 h-4 w-px bg-slate-300" />
        <ToolbarButton
          title="Deshacer"
          label="↺"
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          title="Rehacer"
          label="↻"
          onClick={() => editor.chain().focus().redo().run()}
        />
        <span className="ml-auto" />
        <ToolbarButton
          title="Ver o pegar HTML directamente"
          label={htmlMode ? "✓ Vista visual" : "</> HTML"}
          active={htmlMode}
          onClick={toggleHtmlMode}
        />
      </div>

      {htmlMode ? (
        <textarea
          value={rawHtml}
          onChange={(e) => setRawHtml(e.target.value)}
          rows={12}
          className="w-full resize-y px-4 py-3 font-mono text-xs text-slate-700 focus:outline-none"
          placeholder="<p>Pega o escribe HTML aquí…</p>"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <input type="hidden" name={name} value={rawHtml} />
    </div>
  );
}
