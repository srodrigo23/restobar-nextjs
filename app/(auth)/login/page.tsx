'use client';

import { Button, Input, addToast} from '@heroui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import z from 'zod';

import { useRouter } from 'next/navigation';


// type Inputs = {
//   username : string
//   password : string
// }

const loginFormShema = z.object({
  username: z
    .string()
    .min(5, {
      message: 'El nombre de usuario debe ser al menos de 5 caracteres',
    })
    .nonempty({
      message: 'El nombre de usuario no puede estar vacio!',
    }),
  password: z
    .string()
    .min(5, {
      message: 'La contrasenia debe ser al menos de 5 caracteres',
    })
    .nonempty({
      message: 'La contraseña no puede estar vacia!',
    }),
});

type LoginFormType = z.infer<typeof loginFormShema>;

export default function Page() {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormShema),
    defaultValues: {
      username: '', //'admin',
      password: '', //'admin'
    },
  });


  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        addToast({
          title: 'Login exitoso',
          description: 'Bienvenido al sistema',
          variant: 'flat',
          color: 'success',
          timeout:1000
        });
        router.push('/waiter');

      } else {
        addToast({
          title: 'Error de login',
          description: result.error || 'Credenciales inválidas',
          variant: 'flat',
          color: 'danger',
          timeout: 500,
        });
      }
    } catch (error: unknown) {
      addToast({
        title: 'Error de conexión',
        description: 'No se pudo conectar al servidor',
        variant: 'flat',
        color: 'danger',
        timeout: 500,
      });
      // console.error('Login error:', error);
    }
  };

  const inputAlert = 'text-xs text-red-400';

  return (
    <div className='grid grid-cols-1 place-items-center w-full font-sans h-screen justify-center items-center bg-black'>
      <form
        className='grid grid-cols-1 w-2/3 md:w-2/5 lg:w-1/5 gap-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-5'>
          <h1 className='text-center font-bold text-xl lg:text-2xl text-amber-400'>
            RESTOBAR
          </h1>
          <h1 className='text-center font-bold text-3xl lg:text-2xl text-white'>
            LA HERMANDAD
          </h1>
        </div>

        {/* <label className={labelStyle} htmlFor="username">Usuario</label> */}
        <Input
          label='Usuario'
          defaultValue=''
          {...register('username', { required: true })}
        />

        {errors.username && (
          <span className={inputAlert}>{errors.username.message}</span>
        )}

        {/* <label className={labelStyle} htmlFor="password">Password</label> */}
        <Input
          label='Contraseña'
          type='password'
          {...register('password', { required: true })}
        />

        {errors.password && (
          <span className={inputAlert}>{errors.password.message}</span>
        )}

        <Button
          className='cursor-pointer mt-5'
          color='primary'
          type='submit'
        >
          INICIAR SESION
        </Button>
      </form>
    </div>
  );
}
