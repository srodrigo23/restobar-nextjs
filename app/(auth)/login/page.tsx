'use client';

import { Button } from '@heroui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@heroui/react';

import z from 'zod';

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

  const onSubmit: SubmitHandler<LoginFormType> = (data) => console.log(data);

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
