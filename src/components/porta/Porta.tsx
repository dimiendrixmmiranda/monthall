import Image from "next/image";

interface PortaProps {
    temPresente: boolean;
    portaSelecionada: boolean;
    abrirPorta: boolean
    selecionarPorta: () => void;
    portaAberta: boolean
    indice: number
}

export default function Porta({ temPresente, portaSelecionada, abrirPorta, selecionarPorta, portaAberta, indice}: PortaProps) {
    return (
        <div
            className={`relative w-[120px] h-[190px] flex justify-center items-center cursor-pointer ${portaSelecionada ? 'bg-green-500' : 'bg-zinc-900'}`}
            onClick={selecionarPorta} // Mantém o clique para selecionar
        >
            <div className="relative w-[100px] h-[180px] mt-[10px] bg-zinc-600">
                <div className={`w-full h-full bg-[--marrom-claro] relative z-10 ${abrirPorta ? 'hidden' : 'block'} ${portaAberta ? 'hidden' : 'block'}`}>
                    <div className="absolute w-4 h-4 bg-[--marrom-escuro] rounded-full top-[50%] right-2" style={{ transform: 'translate(0,-50%)' }}></div>
                    <p className="absolute top-[20%] left-[50%] font-custom1 text-5xl" style={{ transform: 'translate(-50%,-50%)', textShadow: '1px 1px 2px black'}}>{indice}</p>
                </div>
                {
                    temPresente ? (
                        <div className="w-20 h-20 absolute bottom-1 left-3">
                            <div className="relative w-full h-full flex justify-center items-center">
                                <Image alt="presente" src={'/presente.png'} fill className="object-contain"></Image>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
            <div className="h-2 w-[100%] bg-[--marrom-escuro] absolute bottom-0 left-0 z-10"></div>
        </div>
    );
}
