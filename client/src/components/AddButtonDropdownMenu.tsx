import { Link } from "react-router-dom";
import { Goal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

function AddButtonDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full p-2">
          <Plus color="#e8eede" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <Link to="/create-group">
          <DropdownMenuItem>
            <Goal className="mr-2 h-4 w-4" />
            <span>Créer un nouveau challenge</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddButtonDropdownMenu;
