'use client';

import { Navbar, NavbarContent, NavbarItem, Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavbarProps {
  // pathname:string
  label: string;
}

const NavbarComp: React.FC<NavbarProps> = ({ label }) => {
  const pathname = usePathname();

  return (
    <Navbar
      position='static'
      className='bg-black text-white h-20 font-bold text-2xl'
    >
      <NavbarContent className='sm:flex gap-4 text-sm' justify='center'>
        {label}
      </NavbarContent>

      {pathname === '/waiter' || pathname === '/manager' ? (
        <NavbarContent justify='end'>
          {/* <NavbarItem className='lg:flex'>
            <Link href='#'>Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            {/* <Button  className='font-bold' as={Link} size='sm' color='primary' href='#'>
              NUEVO PEDIDO
            </Button> */}
          </NavbarItem>
        </NavbarContent>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

export default NavbarComp;
