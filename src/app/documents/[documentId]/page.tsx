import React from 'react'
import Editor from './editor';
import ToolBar from './ToolBar';
import NavBar from './NavBar';
interface DocumentPageProps {
  params: Promise<{ documentId: string }>
};
async function page({ params }: DocumentPageProps) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <NavBar  />
          <ToolBar />
        </div>
        <div className="pt-[130px] print:pt-0">
          <Editor />
        </div>
      </div>
  )
}

export default page 