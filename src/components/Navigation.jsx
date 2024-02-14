// Import necessary dependencies
import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

// Icons
import { CiLogin } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";

// Define the components data
const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  // ... (other components)
];

// Define the NavigationMenuDemo component
export default function NavigationMenuDemo() {
  const auth = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="container">
      <NavigationMenu className="flex justify-between flex-row w-full max-w-full">
        <NavigationMenuList>
          {/* Getting started section */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* Getting started section ends*/}

          {/* Components section */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* Components section ends */}

          <NavigationMenuItem>
            <NavLink to="/">
              <Button variant="ghost">Home</Button>
            </NavLink>
          </NavigationMenuItem>

          {!auth ? (
            <NavigationMenuItem>
              <NavLink to="/login">
                <Button variant="ghost">
                  Login <CiLogin />
                </Button>
              </NavLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <NavLink to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </NavLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>

        {auth && (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/profile">
                <Button variant="ghost">
                  <span className="pe-2">{auth.user_display_name}</span>{" "}
                  <FaCircleUser />
                </Button>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="destructive"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
      </NavigationMenu>
    </div>
  );
}

// Define the ListItem component
const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
