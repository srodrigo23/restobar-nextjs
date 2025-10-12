'use client'

import { Navbar, NavbarContent, NavbarItem, Button } from "@heroui/react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface NavbarProps {
    // pathname:string
    label:string
}
 
const NavbarComp:React.FC<NavbarProps> = ({label}) => {
    const pathname = usePathname()

    return (
        <Navbar position="static" className="bg-black text-white h-20 font-bold text-2xl">
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {label}
            </NavbarContent>

            {pathname === '/waiter'|| pathname === '/manager'?
                <NavbarContent justify="end">
                    {/* <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem> */}





                    
                    <NavbarItem>
                        <Button as={Link} color="danger" href="#" variant="flat">
                            Cerrar sesión
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                :<></>
            }
        </Navbar>
    );
}
 
export default NavbarComp;