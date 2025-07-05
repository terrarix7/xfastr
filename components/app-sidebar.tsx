"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Home, FileText, User, LogOut, Users } from "lucide-react";
import Link from "next/link";

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
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <span className="text-sm font-bold">X</span>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">XFastr</span>
            <span className="text-xs text-sidebar-foreground/70">
              Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Your Authors</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authorsPending ? (
                <SidebarMenuItem>
                  <div className="px-2 py-2 text-sm text-sidebar-foreground/70">
                    Loading authors...
                  </div>
                </SidebarMenuItem>
              ) : authorsError ? (
                <SidebarMenuItem>
                  <div className="px-2 py-2 text-sm text-sidebar-foreground/70">
                    Error loading authors
                  </div>
                </SidebarMenuItem>
              ) : authors && authors.length > 0 ? (
                authors.map((author) => (
                  <SidebarMenuItem key={author._id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/profile/${author.userName}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          {author.profilePicture ? (
                            <img
                              src={author.profilePicture}
                              alt={author.name}
                              className="size-4 rounded-full flex-shrink-0"
                            />
                          ) : (
                            <Users className="size-4 flex-shrink-0" />
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium truncate">
                              {author.name}
                            </span>
                            <span className="text-xs text-sidebar-foreground/70 truncate">
                              @{author.userName}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <div className="px-2 py-2 text-sm text-sidebar-foreground/70">
                    No authors added yet
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <User className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                {isPending ? (
                  <span className="text-sm text-sidebar-foreground/70">
                    Loading...
                  </span>
                ) : error ? (
                  <span className="text-sm text-sidebar-foreground/70">
                    Error loading user
                  </span>
                ) : (
                  <>
                    <span className="text-sm font-medium">{user?.email}</span>
                    <span className="text-xs text-sidebar-foreground/70">
                      Signed in
                    </span>
                  </>
                )}
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => authClient.signOut()}
              className="w-full"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
