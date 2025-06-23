"use client";

import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn, SignOutButton } from "@clerk/nextjs";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          <div className="flex items-center justify-center min-h-screen">
            <p>Loading authentication...</p>
          </div>
        </AuthLoading>

        <Authenticated>
          {children}
          <div className="mt-4">
            <SignOutButton />
          </div>
        </Authenticated>

        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
