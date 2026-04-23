"use client"

import { useSession } from "next-auth/react"
import Header from "../components/header/header"
import Style from "./landing.module.css"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import Image from "next/image"
import Card from "../components/cardService/Card"
import { FaScissors } from "react-icons/fa6"
import { GiBeard } from "react-icons/gi"
import { LuDollarSign } from "react-icons/lu"
import Footer from "../components/footer/Footer"
import Link from "next/link"


export default function Dashboard() {
    const { data: session, status } = useSession()

    async function buscarDados() {
        const response = await fetch('http://localhost:3001/appointments', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`
            },
        })


    }


    return (

        <main className={Style.landing}>

            <Header />

            <section className={Style.sec1}>
                <div className={Style.div}>
                    <h1 className={Style.premium}><span></span> BARBEARIA PREMIUM</h1>
                    <h1 className={Style.ocorte}>O corte certo muda tudo.</h1>
                    <h2>Agende já</h2>
                    <p>Tradição, precisão e estilo em cada detalhe. Venha viver a experiência de uma barbearia de verdade</p>
                    <div className={Style.divNav}>
                        <Link href={'/agendar'}><button>FAZER AGENDAMENTO</button></Link>
                        <a href="#barbeiros">
                            <p><span><FaRegArrowAltCircleRight color="#C49E46" size={35} /></span>VER SERVIÇOS</p>
                        </a>
                    </div>
                </div>
                <div className={Style.rightDiv}>
                    <div id="barbeiros" className={Style.imageBarber}>
                        <h1>BARBEIROS</h1>
                        <Image
                            className={Style.imageAdm}
                            src={"/barberao.jpeg"}
                            width={300}
                            height={300}
                            alt="barbero"
                        />
                        
                    </div>
                    <div className={Style.bioBarber}>
                        <h3>Roger Menezes</h3>
                        <h4>Master Barber  · 4 anos</h4>

                    </div>
                </div>
            </section>
            <section id="servicos" className={Style.sec2}>
                <h2>O QUE OFERECEMOS</h2>
                <h1>Nossos Serviços</h1>
                <div className={Style.divCards}>
                    <Card
                        icon={FaScissors}
                        title="Corte clássico"
                        price="A partir de R$ 45"
                        description="Tesoura, máquina e acabamento perfeito."
                    />
                    <Card
                        icon={GiBeard}
                        title="Barba completa"
                        price="A partir de R$ 35"
                        description="Modelagem, navalha e hidratação."
                    />
                    <Card
                        icon={LuDollarSign}
                        title="Pacote completo"
                        price="A partir de R$ 70"
                        description="Corte + barba + sobrancelha."
                    />
                </div>
            </section>
            <section id="sobre" className={Style.sec3}>
                <div className={Style.imageSec3}>
                    <Image
                    className={Style.imageFachada}
                        src={"/fachada.jpeg"}
                        width={300}
                        height={300}
                        alt="barbero"
                    />
                </div>
                <div className={Style.rightSide}>
                    <h2>NOSSA HISTÓRIA</h2>
                    <h1>Mais de uma década afiando o estilo da cidade</h1>
                    <p className={Style.pClient}><i>"Cada cliente sai daqui sabendo quem é"</i></p>
                    <p className={Style.pFundation}>Fundada em 20**, a barber nasceu da paixão por artesanato e identidade masculina. Aqui você não é só mais um número — você tem nome, estilo e horário marcado.</p>
                    
                </div>

            </section>
            <Footer />
        </main>
    )
}