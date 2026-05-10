'use client'


import { useEffect, useState } from "react"
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import Style from "./appointments.module.css"

interface Appointments {
    id: number
    date: string
    time: string
    service: string
    status: string
}

const schema = z.object({
    service: z.string(),
    barberId: z.number(),
    date: z.string(),
    time: z.string()
})

type AppSchema = z.infer<typeof schema>

export default function Agendamentos() {
    const session = useSession()
    const [select, setSelect] = useState('')
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AppSchema>({
        resolver: zodResolver(schema)
    })
    const [appointments, setAppointments] = useState<Appointments[]>([])
    useEffect(() => {
        const fetchAppointments = async () => {
            const res = await fetch('/api/appointments', {
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await res.json()

            setAppointments(data)

        }
        fetchAppointments()
    }, []
    )

    async function onsubmitform(data: AppSchema) {

        const res = await fetch('/api/appointments', {
            method: "POST",
            headers: { "Authorization": `Bearer  ${session.data?.accessToken} `, "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                userId: session.data?.user?.id
            })
        })

        if (!res.ok) {
            console.error('Erro ao criar agendamento.')
            return
        }
        const result = await res.json()

        reset()
        return result

    }


    return (
        <main className={Style.main}>
            <div className={Style.div}>
                <section className={Style.secForm}>
                    <form onSubmit={handleSubmit(onsubmitform)}>
                        <div className={Style.service}>
                            <label htmlFor="servico">Serviços</label>
                            <div className={Style.dropdown}>
                                <div className={Style.input} onClick={() => setOpen(!open)}>
                                    {select}
                                </div>
                                {open && (
                                    <ul className={Style.opcoes}>
                                        <li onClick={() => { setSelect('Corte clássico'); setValue("service", "Corte Clássico"); setOpen(false) }}>Corte clássico</li>
                                        <li onClick={() => { setSelect('Barba completa'); setValue("service", "Barba Clássica"); setOpen(false) }}>Barba completa</li>
                                        <li onClick={() => { setSelect('Pacote completo'); setValue("service", "Pacote Completo"); setOpen(false) }}>Pacote completo</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <label htmlFor="barbeiro">Selecionar o Barbeiro</label>
                        <div className={Style.barbers}>
                            <div onClick={() => setValue("barberId", 12)}>Rafael Costa</div>
                            <div onClick={() => setValue("barberId", 13)}>Marcos Lima</div>
                        </div>
                        <div className={Style.times}>
                            <div>
                                <label htmlFor="data">Data</label>
                                <input {...register("date")} type="date" />
                            </div>
                            <div>
                                <label htmlFor="duration">Duração</label>
                                <input disabled type="text" placeholder="~45min" />
                            </div>
                        </div>
                        <label className={Style.labelHorario} htmlFor="horario">Horário</label>
                        <div className={Style.horarios}>
                            <div onClick={() => setValue("time", "10:00")}>10:00</div>
                            <div onClick={() => setValue("time", "10:30")}>10:30</div>
                            <div onClick={() => setValue("time", "11:00")}>11:00</div>
                            <div onClick={() => setValue("time", "11:30")}>11:30</div>
                            <div onClick={() => setValue("time", "12:00")}>12:00</div>
                            <div onClick={() => setValue("time", "13:30")}>13:30</div>
                            <div onClick={() => setValue("time", "14:00")}>14:00</div>
                            <div onClick={() => setValue("time", "14:30")}>14:30</div>
                            <div onClick={() => setValue("time", "15:00")}>15:00</div>
                            <div onClick={() => setValue("time", "15:30")}>15:30</div>
                            <div onClick={() => setValue("time", "16:00")}>16:00</div>
                            <div onClick={() => setValue("time", "16:30")}>16:30</div>
                            <div onClick={() => setValue("time", "17:00")}>17:00</div>
                            <div onClick={() => setValue("time", "17:30")}>17:30</div>
                            <div onClick={() => setValue("time", "18:00")}>18:00</div>
                            <div onClick={() => setValue("time", "18:30")}>18:30</div>
                            <div onClick={() => setValue("time", "19:00")}>19:00</div>
                            <div onClick={() => setValue("time", "20:00")}>20:00</div>
                        </div>
                        <button>Criar</button>
                    </form>
                </section>
                <section className={Style.secAppoint}>
                    <h1>Seus agendamentos</h1>
                    {appointments.map((item, i) => (
                        <div key={i}>
                            <h3>{item.date}</h3>
                            <p>{item.service}</p>
                            <p>{item.status}</p>
                        </div>
                    ))}
                </section>
            </div>
        </main>

    )
}