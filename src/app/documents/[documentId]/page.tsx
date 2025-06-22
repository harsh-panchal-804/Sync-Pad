import React from 'react'
import Editor from './editor';
import ToolBar from './ToolBar';
interface DocumentPageProps{
  params:Promise<{documentId:string}>
};
async function page ({params}:DocumentPageProps) {
  const {documentId}=await params;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <ToolBar/>
    <Editor/>
    </div>
  )
}

export default page 