import Link from 'next/link'
import Style from './footer.module.css'


export default function Footer() {


    return (
        <footer className={Style.footer}>
            <div>
                <h1>Pronto para o próximo corte?</h1>
                <p>Escolha seu barbeiro e confirme em menos de 1 minuto</p>
            </div>
            <Link href={'/agendamentos'}><button>AGENDAR AGORA</button></Link>
        </footer>
    )
}