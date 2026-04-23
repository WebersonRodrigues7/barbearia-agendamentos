import Image from "next/image"
import Style from "./cardbarber.module.css"
type BarbProps = {
    name: string
    cargo: string
    
}

type ImageProps = {
    srcImage: string
    altImage: string
}

type AllProps = BarbProps & ImageProps




export default function CardBarber({name, cargo, srcImage, altImage}: AllProps) {



    return (
        <div className={Style.divImage}>
            <Image
            src={srcImage}
            alt={altImage}
            />

            
            <h1>{name}</h1>
            <h2>{cargo}</h2>
        
        
        
        
        </div>
    )
}