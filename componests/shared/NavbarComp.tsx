'use client';

import { Navbar, NavbarContent, NavbarItem, Button } from '@heroui/react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// import { Badge } from '@heroui/react';

import {
  // User,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  // pathname:string
  label: string;
}

const NavbarComp: React.FC<NavbarProps> = ({ label }) => {
  // const pathname = usePathname();
  const router = useRouter()

  return (
    <Navbar
      position='static'
      className='bg-black text-white h-20 font-bold text-2xl'
    >
      <NavbarContent justify='center'>
        <NavbarItem className='sm:flex sm:flex-col text-sm'>
          <p className='text-amber-400 text-center'>RESTOBAR</p>
          <p className='text-xl'>LA HERMANDAD</p>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as='div' justify='end'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              // isBordered
              as='button'
              className='transition-transform'
              // color='secondary'
              name='M'
              size='sm'
              // src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold text-xl text-center'>Mesero</p>
              {/* <p className='font-semibold'>M</p> */}
            </DropdownItem>

            {/* <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem> */}
            <DropdownItem
              key='logout'
              color='danger'
              onClick={() => router.push('/login')}
            >
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* {pathname === '/waiter' || pathname === '/manager' ? (
        <NavbarContent justify='end'>
          <NavbarItem className='lg:flex'>
            <Link href='#'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              className='font-bold'
              as={Link}
              size='sm'
              color='danger'
              href='#'
            >
              Pedidos Atendidos
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <></>
      )} */}
    </Navbar>
  );
};

export default NavbarComp;
