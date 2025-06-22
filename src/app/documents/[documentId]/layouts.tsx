import React from 'react'
interface DocumentsLayoutProps{
    children:React.ReactNode
};
function DocumentsLayout({children}:DocumentsLayoutProps) {
  return (
    <div> 
       {children}
    </div>
  )
}

export default DocumentsLayout;