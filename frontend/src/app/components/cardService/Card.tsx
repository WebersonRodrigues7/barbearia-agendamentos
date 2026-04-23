import { IconType } from 'react-icons'
import Style from "./card.module.css"
type Props = {
    icon: IconType,
    title: string,
    price: string,
    description: string
}



export default function Card({ title, price, description, icon: Icon }: Props) {

    return (
        <div className={Style.card}>
            <Icon className={Style.icon} size={40} color='#C49E46' />
            <h3>{title}</h3>
            <h4>{price}</h4>
            <p>{description}</p>
        </div>
    )
}