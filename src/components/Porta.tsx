'use client'
import Presente from "./Presente"
interface PortaProps {
    numeroPorta: number
    aberta: boolean
    presente: boolean
    selecionar: boolean
    selecionarPorta: (numeroPorta: number) => void
}

export default function Porta({ numeroPorta, aberta, presente, selecionar, selecionarPorta }: PortaProps) {
    return (
        <div className="w-[--area-porta-largura] h-[--area-porta-altura] flex flex-col items-center mx-2 cursor-pointer">
            <div className="flex-1 flex w-[95%] relative"
                style={selecionar ?{
                    borderBottom: 0,
                    borderLeft: 'solid 4px orange',
                    borderTop: 'solid 4px orange',
                    borderRight: 'solid 4px orange',
                }: {
                    borderBottom: 0,
                    borderLeft: 'solid 4px black',
                    borderTop: 'solid 4px black',
                    borderRight: 'solid 4px black',
                }}
            >

                <div className={`bg-orange-950 justify-center items-center relative flex-1 z-10 ${aberta ? 'hidden' : 'flex'}`}
                    onClick={() => selecionarPorta(numeroPorta)}>
                    <span className="uppercase text-bold text-6xl mb-20" data-id={numeroPorta}>{numeroPorta}</span>
                    <div className="w-[--macaneta] h-[--macaneta] rounded-full bg-yellow-500 absolute top-[50%] right-2 z-30" style={{ transform: 'translate(0,-50%)' }}></div>
                </div>
                {
                    presente ?
                        <div className="absolute bottom-[0%] left-[50%]" style={{ transform: 'translate(-50%)' }}>
                            <Presente></Presente>
                        </div>
                        : ''
                }
            </div>
            <div className="h-3 w-full bg-zinc-400"></div>
        </div>
    )
}