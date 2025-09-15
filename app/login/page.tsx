'use client'

import { Button } from "@heroui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { error } from "console"

// type Inputs = {
//   username : string
//   password : string
// }

const loginFormShema  = z.object({
    username: z.
        string().min(5, {
            message:'El nombre de usuario debe ser al menos de 5 caracteres'
        })
        .nonempty({
            message:'El nombre de usuario no puede estar vacio!'
        }),
    password:z.
        string().min(5, {
            message:'La contrasenia debe ser al menos de 5 caracteres'
        }).nonempty({
            message:'La contraseña no puede estar vacia!'
        }),
})

type LoginFormType = z.infer<typeof loginFormShema>

export default function Page (){

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<LoginFormType>(
        {
            resolver:zodResolver(loginFormShema),
            defaultValues:{
                username:'admin',
                password:'admin'
            }
        }
    )

    const onSubmit: SubmitHandler<LoginFormType> = (data) => console.log(data)

    // console.log(watch("username")) // watch input value by passing the name of it
    // console.log(watch("password"))

    const labelStyle = 'text-sm'
    const inputStyle = 'text-xl border rounded-md p-2'
    const inputAlert = 'text-xs text-red-400'


    return(
        <div className="font-sans w-full h-screen flex items-center justify-center">

            <form className="flex flex-col w-2/3 lg:w-1/4 md:w-2/5 shadow-xl mx-10  px-5 py-5 rounded-2xl " onSubmit={handleSubmit(onSubmit)}>
                
                <h1 className="text-center font-bold text-xl lg:text-2xl">RESTOBAR <br/>"LA HERMANDAD"</h1>
                <br/>
                
                <label className={labelStyle} htmlFor="username">Usuario</label>
                <input className={inputStyle} defaultValue="" {...register("username", { required: true })} />

                {errors.username && <span className={inputAlert}>{errors.username.message}</span>}
                
                <br/>

                <label className={labelStyle} htmlFor="password">Password</label>
                <input className={inputStyle} type="password" {...register("password", { required: true })} />
                
                {errors.password && <span className={inputAlert}>{errors.password.message}</span>}
                <br/>
                <Button className='cursor-pointer' color="primary" type="submit">INICIAR SESION </Button>
                {/* <input type="submit" /> */}
            </form>
        </div>
    )
}
