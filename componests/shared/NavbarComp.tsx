'use client';

import { Navbar, NavbarContent, NavbarItem, Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Badge } from '@heroui/react';

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
      <NavbarContent className='' justify='center'>
        <NavbarItem className='sm:flex sm:flex-col text-sm'>
          <p className='text-xl'>RESTOBAR</p>
          <p className="text-amber-300">LA HERMANDAD</p>
        </NavbarItem>
      </NavbarContent>

      {pathname === '/waiter' || pathname === '/manager' ? (
        <NavbarContent justify='end'>
          {/* <NavbarItem className='lg:flex'>
            <Link href='#'>Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            <Button  className='font-bold' as={Link} size='sm' color='danger' href='#'>
                Pedidos Atendidos
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

export default NavbarComp;
 