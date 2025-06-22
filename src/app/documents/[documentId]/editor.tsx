"use client";
import React from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import CharacterCount from '@tiptap/extension-character-count'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from "@/store/useEditorStore"
import Underline from '@tiptap/extension-underline'
function Editor() {
    const limit = null;
    const { setEditor } = useEditorStore();
    const editor = useEditor({
        onCreate({ editor }) {
            setEditor(editor)
        },
        onDestroy() {
            setEditor(null)
        },
        onUpdate({ editor }) {
            setEditor(editor)
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor)
        },
        onTransaction({ editor }) {
            setEditor(editor)
        },
        onFocus({ editor }) {
            setEditor(editor)
        },
        onBlur({ editor }) {
            setEditor(editor)
        },
        onContentError({ editor }) {
            setEditor(editor)
        },
        editorProps: {
            attributes: {
                style: "padding-left:56px;padding-right:56px",
                class: "focus:outline-none print:border-0 border bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions: [StarterKit, TextAlign.configure({
            types: ["heading", "paragraph"]
        }), Underline, Highlight.configure({
            multicolor: true
        }), TaskItem.configure({
            nested: true
        }), TaskList, Table.configure({
            resizable: true,
        }),
            TableRow,
            TableHeader,
            TableCell, Image, Link, ImageResize, Color, FontFamily, TextStyle, CharacterCount.configure({
                limit: null
            })],
        content: `hello harsh `
    });
    const percentage = editor
        ? Math.round((100 / limit) * editor.storage.characterCount.characters())
        : 0

    if (!editor) return

    return (
        <div className='size-full overflow-x-auto bg-[#f9f8fd] px-4 print:p-0 print:bg-white print:overflow-visible' >
            <div className='absolute left-[85%] top-[15%] z-10'>
                <div className={`character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
                    <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                    >
                        <circle
                            r="10"
                            cx="10"
                            cy="10"
                            fill="#e9ecef"
                        />
                        <circle
                            r="5"
                            cx="10"
                            cy="10"
                            fill="transparent"
                            stroke="blue"
                            strokeWidth="10"
                            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                            transform="rotate(-90) translate(-20)"
                        />
                        <circle
                            r="6"
                            cx="10"
                            cy="10"
                            fill="white"
                        />
                    </svg>

                    {editor.storage.characterCount.characters()} / {limit} characters
                    <br />
                    {editor.storage.characterCount.words()} words
                </div>
            </div>
            <div className='min-w-max  flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 ' >

                <EditorContent className='tip-tap' editor={editor} />

            </div>

        </div>
    )
}

export default Editor