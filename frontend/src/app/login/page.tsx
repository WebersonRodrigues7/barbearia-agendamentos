'use client'


import { RiScissors2Fill } from "react-icons/ri"
import { z } from 'zod'
import { signIn } from "next-auth/react"
import Styles from "./login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useRouter } from "next/navigation"


const schema = z.object({
    email: z.email("Email inválido!"),
    password: z.string().min(8, "A senha precisa ter 8 digítos!")
})

type LoginSchema = z.infer<typeof schema>



export default function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(schema)
    })

    const router = useRouter()

    async function onSubmitForm(data: LoginSchema) {
        const result = await signIn('credentials', { ...data, redirect: false })
        if (result?.error) {
            console.log(result.error)
            return
        }
    
        reset()
        router.push('/landing')
    

    }




    return (
        <main className={Styles.mainLog}>
            <div className={Styles.container}>
                <div className={Styles.leftLog}>
                    <RiScissors2Fill color="#C49E46" size={50} />
                    <h1>BARBER</h1>
                    <p className={Styles.barberStyle}>BARBEARIA & ESTILO</p>
                    <div className={Styles.divider}>
                        <span className={Styles.line}></span>
                        <span className={Styles.diamond}></span>
                        <span className={Styles.line}></span>
                    </div>
                    <p>Agende seu horário</p>
                    <p>Confie no visual.</p>
                </div>
                <div className={Styles.rightLog}>
                    <h1>Bem-vindo de volta</h1>
                    <p className={Styles.ptext}>Entre para agendar seu próximo corte</p>

                    <form className={Styles.formLogin} onSubmit={handleSubmit(onSubmitForm)}>
                        <label className={Styles.label} htmlFor="email">E-MAIL</label>
                        <input className={Styles.input} {...register('email')} type="email" placeholder="exemplo@gmail.com" />
                        <label className={Styles.label} htmlFor="password">SENHA</label>
                        <input className={Styles.input} {...register('password')} type="password" placeholder="•••••••••" />
                        {errors.email && <p>{errors.email.message}</p>}
                        {errors.password && <p>{errors.password.message}</p>}
                        <p className={Styles.forgotPass}>Esqueci minha senha</p>
                        <button>ENTRAR</button>
                        <p className={Styles.noAcc}>Ainda não tem conta? <span>Crie agora</span></p>
                    </form>
                </div>
            </div>
        </main>
    )
}