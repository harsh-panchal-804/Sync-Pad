"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { Item } from "@radix-ui/react-accordion";
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, CirclePicker, SketchPicker } from "react-color"
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronsDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlus, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheck, SpellCheck2, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog"

const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    const fonts = [{
        label: 'Arial',
        value: "Arial",
    }, {
        label: "Times New Roman",
        value: "Times New Roman",
    },]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronsDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {fonts.map(({ label, value }) => (
                    <button key={value} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-300/65"

                    )}
                        onClick={() => {
                            editor?.chain().focus().setFontFamily(value).run()
                        }}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>


        </DropdownMenu>
    )
}
const HeadingLevelButton = () => {
    const { editor } = useEditorStore();
    const headings = [
        { label: "Normal Text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ]
    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return ` Heading ${level}`
            }
        }
        return "Normal Text"
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronsDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, fontSize, value }) => (
                    <button
                        key={value}
                        style={{ fontSize }}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive("heading") || (editor?.isActive("heading"), { level: value })) && "bg-neutral-300/65")
                        }
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            }
                            else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                    >
                        {label}
                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <span className="text-sx">A
                    </span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 ">
                <SketchPicker
                    onChange={onChange}
                    color={value}
                />

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HighLightColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("highlight").color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="w-[18px] h-[18px] mb-0.5" />
                    <div className="h-0.5 w-full " style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 ">
                <SketchPicker
                    onChange={onChange}
                    color={value}

                />

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "");
    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <Link2Icon className="w-[18px] h-[18px] mb-0.5" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex p-2.5 items-center gap-x-2 ">
                <Input placeholder="https://example.comk" value={value} onChange={(e) => {
                    setValue(e.target.value)
                }} />
                <Button onClick={() => { onChange(value) }} >
                    Apply
                </Button>

            </DropdownMenuContent>
        </DropdownMenu>
    )

}
const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageURL, setImageURL] = useState(editor?.getAttributes("link").href || "");
    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    }
    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const ImageURL = URL.createObjectURL(file);
                onChange(ImageURL);
            }
        }
        input.click();
    }
    const handleImageURLSubmit = () => {
        if (imageURL) {
            onChange(imageURL);
            setImageURL("");
            setIsDialogOpen(false);
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                        <ImageIcon className="w-[18px] h-[18px] mb-0.5" />

                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setIsDialogOpen(true) }}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert Image URL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageURLSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageURLSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>

    )

}
const AlignButton = () => {
    const { editor } = useEditorStore();
    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon
        }

    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <AlignLeftIcon className="w-[18px] h-[18px] mb-0.5" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/65",
                            editor?.isActive({ textAlign: value }) && "bg-neutral-300/65")
                        }
                        key={value}
                        onClick={() => {
                            editor?.chain().focus().setTextAlign(value).run();
                        }}
                    >
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const ListButton = () => {
    const { editor } = useEditorStore();
    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        }
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm">
                    <ListIcon className="w-[18px] h-[18px] mb-0.5" />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/65",
                            isActive() && "bg-neutral-300/65")
                        }
                        key={label}
                        onClick={onClick}
                    >
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const FontSizeButton = () => {
    const { editor } = useEditorStore();
    const currentFontSize = editor?.getAttributes("textStyle").fontSize
        ? editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16";
    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize)
    const [isEditing, setIsEditing] = useState(false);
    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize)
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus();
        }
    };
    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }
    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {

            updateFontSize(newSize.toString());
        }
    }
    return (
        <div className="flex items-center gap-0.5">
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm"
                onClick={decrement}

            >
                <MinusIcon className="size-4" />
            </button>
            {isEditing ? (
                <input type="text" value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-7 w-10 cursor-text text-center rounded-sm bg-transparent focus:outline-none focus:ring-0 border border-neutral-400 text-sm"


                />) : (
                <button
                    onClick={() => {
                        setIsEditing(true);
                        setFontSize(currentFontSize)
                    }}


                    className="h-7 w-10  rounded-sm hover:bg-neutral-300/65 border border-neutral-400 text-sm">
                    {currentFontSize}
                </button>
            )
            
            }
             <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/65 px-1.5 overflow-hidden text-sm"
                onClick={increment}

            >
                <PlusIcon className="size-4" />
            </button>
        </div>
    )
}
const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
};

const ToolBarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolBarButtonProps) => {
    return (
        <button onClick={onClick} className={cn(
            "text-sm h-7 flex items-center justify-center rounded-sm hover:bg-neutral-400/65",
            isActive && "bg-neutral-400/65"
        )}>
            <Icon className="size-4 " />
        </button>
    )
}

function ToolBar() {
    const { editor } = useEditorStore();
    const sections: {
        label: string;
        onClick: () => void;
        isActive?: boolean;
        icon: LucideIcon;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                {
                    label: "Spell Check",
                    icon: SpellCheck,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run()
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run()
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run()
                },
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlus,
                    isActive: false,
                    onClick: () => console.log("message")
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive("taskList"),
                    onClick: () => editor?.chain().focus().toggleTaskList().run()
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()
                }
            ]

        ];
    return (
        <div className='bg-[#d8dde7] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-6 overflow-x-auto'>
            {
                sections[0].map((item) => (
                    <ToolBarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-800" />
            {
                sections[1].map((item) => (
                    <ToolBarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-800" />
            {
                sections[2].map((item) => (
                    <ToolBarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-800" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-800" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-800" />
            <TextColorButton />
            <HighLightColorButton />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            <ListButton />
            <FontSizeButton />
             <LineHeightButton />

        </div>
    )
}

export default ToolBar