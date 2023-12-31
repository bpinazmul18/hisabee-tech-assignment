import Link from "next/link";
import { IListProps } from "@/models/ListItem";

const ListItem = ({ children, navItemStyles, NavLink } : IListProps) => (
  <li>
    <Link
      href={NavLink}
      className={`flex py-2 text-lg font-medium leading-normal capitalize px-2 lg:px-7 lg:inline-flex ${navItemStyles}`}
    >
      {children}
    </Link>
  </li>
)

export default ListItem