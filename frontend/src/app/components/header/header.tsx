'use client'
import { useState } from "react"
import Styles from "./header.module.css"
import Link from "next/link"
export default function Header() {
    const [menuaberto, setMenuAberto] = useState(false)

    return (

        <header className={Styles.header}>
            <h1>BARBER</h1>
            <button className={Styles.hamburger} onClick={() => setMenuAberto(!menuaberto)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`${Styles.nav} ${menuaberto ? Styles.open : ''} `}>
                <a href="#servicos">
                    <li className={Styles.li}>SERVIÇOS</li>
                </a>
                <a href="#barbeiros"><li>BARBEIROS</li></a>
                <a href="#sobre">
                    <li>SOBRE</li>
                </a>
                <Link href={'/agendamentos'}><button className={Styles.agendar}>AGENDAR HORÁRIO</button></Link>
            </ul>
        </header>
    )
}