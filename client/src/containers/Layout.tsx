import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AddButtonDropdownMenu from "@/components/AddButtonDropdownMenu";
import ProfileDropDownMenu from "@/components/ProfileDropdownMenu";
import Notifications from "@/components/Notifications";

function Layout() {
  return (
    <>
      <header className="sticky top-0 z-10 py-3 elevate-box rounded-none bg-background">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Button className="self-start rounded-full p-2 text-base">
            <Link to="/">GG</Link>
          </Button>
          <div className="flex items-center space-x-2">
            {/* ADD BUTTON */}
            <AddButtonDropdownMenu />
            {/* NOTIFICATIONS */}
            <Notifications />
            {/* PROFILE MENU */}
            <ProfileDropDownMenu />
          </div>
        </div>
      </header>
      <main className="container pb-10 pt-5">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
