"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getDocuments, getUsers } from "./documents/[documentId]/action";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";
import { Loader } from "@/components/Loader";
type User = {
    id: string;
    name: string;
    avatar: string
}
export function Room({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);
    const params = useParams();
    const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth"
            throttle={16}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined
                )
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users;

                if (text) {
                    filteredUsers = users.filter((user) =>
                        user.name.toLowerCase().includes(text.toLowerCase())
                    );
                }

                return filteredUsers.map((user) => user.id);
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                const documents = await getDocuments(roomIds as Id<"documents">[]);
                return documents.map((document) => ({
                    id: document.id,
                    name: document.name,
                }));
            }}
        >
            <RoomProvider initialStorage={{leftMargin:56,rightMargin:56}}
            
            
            
            id={params.documentId as string}>
                <ClientSideSuspense fallback={<Loader label="Room Loading "/>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}