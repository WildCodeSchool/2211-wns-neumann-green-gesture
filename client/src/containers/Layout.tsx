import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AddButtonDropdownMenu from "@/components/AddButtonDropdownMenu";
import ProfileDropDownMenu from "@/components/ProfileDropdownMenu";
import Notifications from "@/components/Notifications";

function Layout() {
  return (
    <div>
      <header className="flex items-center justify-between p-[15px]">
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
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
