"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Home, FileText, User, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// Menu items for navigation
const navigationItems = [
  {
    title: "Home",
    url: "/create",
    icon: Home,
  },
  {
    title: "Content",
    url: "/content",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const {
    data: user,
    isPending,
    error,
  } = useQuery(convexQuery(api.auth.getCurrentUser, {}));

  const {
    data: authors,
    isPending: authorsPending,
    error: authorsError,
  } = useQuery(convexQuery(api.myFunctions.getUserAuthors, {}));

  return (
    <Sidebar className="bg-background/80 backdrop-blur-sm border-r border-border/50">
      <SidebarHeader className="border-b border-border/30 bg-background/50">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 border border-border/30 text-primary">
            <span className="text-sm font-bold">X</span>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            {isPending ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : error ? (
              <span className="text-sm text-muted-foreground">
                Error loading user
              </span>
            ) : (
              <>
                <span className="text-sm font-medium">
                  {user?.email && user.email.length > 26
                    ? `${user.email.substring(0, 26)}...`
                    : user?.email || "pruthvirajthinks@gmail.com.com"}
                </span>
                <button
                  onClick={() => authClient.signOut()}
                  className="text-xs text-muted-foreground hover:text-foreground underline text-left transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background/30 overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground border-b border-border/20 pb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-accent/50 border border-transparent hover:border-border/30 rounded-md transition-all ${
                        isActive
                          ? "bg-accent/70 border-border/50 text-foreground font-medium"
                          : ""
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="border-border/30" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground border-b border-border/20 pb-2">
            Your Authors
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {authorsPending ? (
                <SidebarMenuItem>
                  <div className="px-3 py-2 text-sm text-muted-foreground bg-background/30 border border-border/20 rounded-md">
                    Loading authors...
                  </div>
                </SidebarMenuItem>
              ) : authorsError ? (
                <SidebarMenuItem>
                  <div className="px-3 py-2 text-sm text-muted-foreground bg-background/30 border border-border/20 rounded-md">
                    Error loading authors
                  </div>
                </SidebarMenuItem>
              ) : authors && authors.length > 0 ? (
                authors.map((author) => {
                  const isActive = pathname === `/profile/${author.userName}`;
                  return (
                    <SidebarMenuItem key={author._id}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-accent/50 border border-transparent hover:border-border/30 rounded-md transition-all py-2 px-3 h-auto ${
                          isActive
                            ? "bg-accent/70 border-border/50 text-foreground font-medium"
                            : ""
                        }`}
                      >
                        <Link href={`/profile/${author.userName}`}>
                          <div className="flex items-center gap-2 min-w-0">
                            {author.profilePicture ? (
                              <img
                                src={author.profilePicture}
                                alt={author.name}
                                className="size-4 rounded-full flex-shrink-0 border border-border/30"
                              />
                            ) : (
                              <Users className="size-4 flex-shrink-0" />
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-medium truncate">
                                {author.name}
                              </span>
                              <span className="text-xs text-muted-foreground truncate">
                                @{author.userName}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              ) : (
                <SidebarMenuItem>
                  <div className="px-2 py-2 text-sm text-muted-foreground bg-background/30 border border-border/20 rounded-md">
                    No authors added yet
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
