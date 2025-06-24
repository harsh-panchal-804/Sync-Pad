"use client";
import React from 'react'
import Editor from './editor';
import ToolBar from './ToolBar';
import NavBar from './NavBar';
import { Room } from '@/app/Room';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>;
};
export  function Document({ preloadedDocument }: DocumentProps) {
    const document =usePreloadedQuery(preloadedDocument);
    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                    <NavBar data={document} />
                    <ToolBar />
                </div>
                <div className="pt-[130px] print:pt-0">

                    <Editor initialContent={document.initialContent} />
                </div>
            </div>
        </Room>
    )
}

