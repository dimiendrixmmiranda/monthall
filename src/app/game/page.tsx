'use client'
import { useEffect, useState } from "react";
import Porta from "@/components/porta/Porta";
import Template from "@/components/template/Template";
import InterfacePorta from "@/core/interface/Porta";
import { listaDePortas } from "@/core/constants/listaDePortas";

export default function Page() {
    const [portas, setPortas] = useState<InterfacePorta[] | null>(null)
    const [portaSelecionada, setPortaSelecionada] = useState<number | null>(null)
    const [portaAbrir, setPortaAbrir] = useState<number | null>(null)

    const [boxSelecionarCaixa, setBoxSelecionarCaixa] = useState(false)
    const [boxManterTrocarPorta, setBoxManterTrocarPorta] = useState(false)
    const [boxGanhou, setBoxGanhou] = useState(false)
    const [boxPerdeu, setBoxPerdeu] = useState(false)
    const [boxTextoInicial, setBoxTextoInicial] = useState(true)


    useEffect(() => {
        const sortearNumero = Math.floor(Math.random() * 3)
        const novaListaPortas = listaDePortas.map((porta, index) => {
            if (index === sortearNumero) {
                return { ...porta, temPresente: true }
            }
            return porta
        })
        setPortas(novaListaPortas)
    }, [])

    function selecionarPorta(id: number) {
        setBoxSelecionarCaixa(true)
        setPortaSelecionada(id)
        const novaListaPortas = portas?.map((porta, i) => {
            if (i === id) {
                return { ...porta, selecionada: true }
            }
            return porta
        })
        if (novaListaPortas != undefined) {
            setPortas(novaListaPortas)
        }
    }

    function confirmarSelecaoPorta() {
        setBoxSelecionarCaixa(false)
        const possivelPortaAbrir = portas?.filter(porta => !porta.selecionada && porta.temPresente === false)[0]

        if (possivelPortaAbrir != undefined) {
            abrirPorta(possivelPortaAbrir.id)
            const novaListaPortas = portas?.map((porta, i) => {
                if (i === possivelPortaAbrir.id) {
                    return { ...porta, aberta: true }
                }
                return porta
            })
            if (novaListaPortas) {
                setPortas(novaListaPortas)
            }
            setBoxManterTrocarPorta(true)
        }

        setBoxTextoInicial(false)
    }
    function naoConfirmarSelecaoPorta() {
        setBoxSelecionarCaixa(false)
        setPortaSelecionada(null)
    }

    function abrirPorta(id: number) {
        setPortaAbrir(id)
    }

    // Falta aqui
    function trocarDePorta() {
        const idNovaPortaSelecionada = portas?.find(porta => !porta.selecionada && !porta.aberta)?.id

        if (idNovaPortaSelecionada == null) return

        const novoArrayPortas = portas?.map((porta, i) => ({
            ...porta,
            selecionada: i === idNovaPortaSelecionada ? true : false,
            aberta: true
        }))

        if (novoArrayPortas) {
            setPortaSelecionada(idNovaPortaSelecionada)
            setPortas(novoArrayPortas)
        }

        setBoxManterTrocarPorta(false)


        if (novoArrayPortas != undefined) {
            if (novoArrayPortas[idNovaPortaSelecionada] != undefined && novoArrayPortas[idNovaPortaSelecionada].selecionada && novoArrayPortas[idNovaPortaSelecionada].temPresente) {
                setBoxGanhou(true)
            } else {
                setBoxPerdeu(true)
            }
            console.log(novoArrayPortas)
        }
    }

    function manterPorta() {
        // console.log(portas)
        const novoArrayPortas = portas?.map(porta => {
            return {
                ...porta,
                aberta: true
            }
        })

        if (novoArrayPortas != undefined) {
            setPortas(novoArrayPortas)
        }
        setBoxManterTrocarPorta(false)

        if (portaSelecionada != null && portas != null) {
            const pSelecionada = portas[portaSelecionada]
            if (pSelecionada.temPresente && pSelecionada.selecionada) {
                setBoxGanhou(true)
            } else {
                setBoxPerdeu(true)
            }
        }
    }

    function reiniciarGame() {
        return window.location.reload()
    }


    return (
        <Template>
            <div className="flex gap-3 relative justify-center items-center h-full">

                <div className={`absolute top-0 ${boxTextoInicial ? 'block' : 'hidden'}`}>
                    <h1 className="text-4xl font-custom1">Selecione uma porta!</h1>
                </div>

                <div className="flex gap-3 w-fit">
                    {
                        portas?.map((p, i) => (
                            <div key={i}>
                                <Porta
                                    temPresente={p.temPresente}
                                    portaSelecionada={portaSelecionada === i}
                                    selecionarPorta={() => selecionarPorta(i)}
                                    abrirPorta={portaAbrir === i}
                                    portaAberta={p.aberta}
                                    indice={i + 1}
                                />
                            </div>
                        ))
                    }
                </div>

                <div className={`${boxSelecionarCaixa ? 'flex' : 'hidden'} flex-col gap-2 absolute z-10 bg-[--vermelho] top-[50%] left-[50%] font-custom2 p-4 rounded-lg max-w-[300px] w-full`} style={{ transform: 'translate(-50%,-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <p className="text-2xl font-bold leading-7 text-center">Deseja realmente selecionar essa porta?</p>
                    <div className="grid grid-cols-2 text-xl font-bold gap-2">
                        <button className="bg-green-600 py-1 uppercase" onClick={confirmarSelecaoPorta} style={{ boxShadow: '0 0 2px 1px black' }}>Sim</button>
                        <button className="bg-red-600 py-1 uppercase" onClick={naoConfirmarSelecaoPorta} style={{ boxShadow: '0 0 2px 1px black' }}>Não</button>
                    </div>
                </div>
                <div className={`${boxManterTrocarPorta ? 'flex' : 'hidden'} flex-col gap-3 absolute z-10 bg-[--vermelho] -top-1 left-[50%] font-custom2 p-4 rounded-lg max-w-[400px] w-full md:-top-5`} style={{ transform: 'translate(-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <p className="text-2xl font-bold leading-7 text-center">E agora? deseja ficar com sua porta ou vai trocar?</p>
                    <div className="grid grid-cols-2 text-xl font-bold gap-2">
                        <button className="bg-green-600 py-1 uppercase" onClick={manterPorta} style={{ boxShadow: '0 0 2px 1px black' }}>manter Porta</button>
                        <button className="bg-red-600 py-1 uppercase" onClick={trocarDePorta} style={{ boxShadow: '0 0 2px 1px black' }}>trocar Porta</button>
                    </div>
                </div>
                <div className={`${boxGanhou ? 'block' : 'hidden'} flex-col gap-2 absolute z-10 bg-green-600 top-10 left-[50%] font-custom2 p-4 rounded-lg max-w-[400px] w-full`} style={{ transform: 'translate(-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <p className="text-2xl font-bold leading-7 text-center">Parabéns!!! Você Ganhou!!!</p>
                </div>
                <div className={`${boxPerdeu ? 'block' : 'hidden'} flex-col gap-2 absolute z-10 bg-[--vermelho] top-10 left-[50%] font-custom2 p-4 rounded-lg max-w-[400px] w-full`} style={{ transform: 'translate(-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <p className="text-2xl font-bold leading-7 text-center">Infelizmente você perdeu!</p>
                </div>
                <div className={`${boxPerdeu ? 'block' : 'hidden'} flex-col justify-center gap-2 absolute z-10 bg-[--vermelho] bottom-8 left-[50%] font-custom2 p-4 rounded-lg max-w-[400px] w-full`} style={{ transform: 'translate(-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <button onClick={() => reiniciarGame()} className="uppercase font-bold w-full text-xl">Jogar Novamente</button>
                </div>
                <div className={`${boxGanhou ? 'block' : 'hidden'} flex-col justify-center gap-2 absolute z-10 bg-[--vermelho] bottom-8 left-[50%] font-custom2 p-4 rounded-lg max-w-[400px] w-full`} style={{ transform: 'translate(-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <button onClick={() => reiniciarGame()} className="uppercase font-bold w-full text-xl">Jogar Novamente</button>
                </div>
            </div>
        </Template>
    );
}
