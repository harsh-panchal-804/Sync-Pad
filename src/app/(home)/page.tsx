"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavBar from "./NavBar";
import TemplateGallery from "./TemplateGallery";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { paginationOptsValidator } from "convex/server";
import { DocumentsTable } from "./DocumentsTable";
export default function Home() {
  const {results,status,loadMore}= usePaginatedQuery(api.documents.get,{},{initialNumItems:5});

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <NavBar/>
      </div>
     <div className="mt-16">
      <TemplateGallery/>
       <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />

     </div>
    </div>
  );
}

