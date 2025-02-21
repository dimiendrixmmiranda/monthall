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
    const [boxTextoInicial, setBoxTextoInicial] = useState(true)
    const [ganhouPerdeu, setGanhouPerdeu] = useState<boolean | null>(null)

    const [tentativas, setTentativas] = useState(0)
    const [acertos, setAcertos] = useState(0)
    const [porcentagem, setPorcentagem] = useState(0)

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
                setGanhouPerdeu(true)
                atualizarEstatisticas(true);
            } else {
                setGanhouPerdeu(false)
                atualizarEstatisticas(false);
            }
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
                setGanhouPerdeu(true)
                atualizarEstatisticas(true);
            } else {
                setGanhouPerdeu(false)
                atualizarEstatisticas(true);
            }
        }
    }

    function reiniciarGame() {
        return window.location.reload()
    }

    useEffect(() => {
        const tentativasSalvas = localStorage.getItem("tentativas");
        const acertosSalvos = localStorage.getItem("acertos");
    
        setTentativas(tentativasSalvas ? parseInt(tentativasSalvas) : 0);
        setAcertos(acertosSalvos ? parseInt(acertosSalvos) : 0);
    }, []);
    
    useEffect(() => {
        // Calcula a porcentagem de acertos
        if (tentativas > 0) {
            setPorcentagem(Math.round((acertos / tentativas) * 100));
        }
    }, [acertos, tentativas]);

    function atualizarEstatisticas(venceu: boolean) {
        const novasTentativas = tentativas + 1;
        const novosAcertos = venceu ? acertos + 1 : acertos;
    
        setTentativas(novasTentativas);
        setAcertos(novosAcertos);
        setPorcentagem(Math.round((novosAcertos / novasTentativas) * 100));
    
        // Armazena no localStorage
        localStorage.setItem("tentativas", novasTentativas.toString());
        localStorage.setItem("acertos", novosAcertos.toString());
    }

    return (
        <Template>
            <div className="game">
                <div className={`${boxTextoInicial ? 'flex' : 'hidden'} row-start-1 row-end-2 justify-center items-center`}>
                    <h1 className="text-4xl text-center font-custom1 md:text-6xl">Selecione uma porta!</h1>
                </div>

                <div className="flex flex-wrap gap-3 justify-center items-center mx-auto w-fit h-fit row-start-2 row-end-3">
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

                {/* Box Selecionar Porta */}
                <div className={`${boxSelecionarCaixa ? 'flex' : 'hidden'} flex-col gap-2 absolute z-10 bg-[--vermelho] top-[50%] left-[50%] font-custom2 p-4 rounded-lg max-w-[300px] w-full`} style={{ transform: 'translate(-50%,-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <p className="text-2xl font-bold leading-7 text-center">Deseja realmente selecionar essa porta?</p>
                    <div className="grid grid-cols-2 text-xl font-bold gap-2">
                        <button className="bg-green-600 py-1 uppercase" onClick={confirmarSelecaoPorta} style={{ boxShadow: '0 0 2px 1px black' }}>Sim</button>
                        <button className="bg-red-600 py-1 uppercase" onClick={naoConfirmarSelecaoPorta} style={{ boxShadow: '0 0 2px 1px black' }}>Não</button>
                    </div>
                </div>

                {/* Box Trocar Porta */}
                <div className={`${boxManterTrocarPorta ? 'flex' : 'hidden'} bg-[--vermelho] absolute flex-col left-[50%] w-full max-w-[300px] gap-2 p-2 sm:max-w-[400px] md:gap-4 md:top-12 md:p-4`} style={{ transform: 'translate(-50%)', boxShadow: '0 0 3px 2px black' }}>
                    <p className="text-2xl font-bold leading-7 text-center">E agora? deseja ficar com sua porta ou vai trocar?</p>
                    <div className="grid grid-cols-2 text-lg leading-5 font-bold gap-2 md:text-xl md:gap-6">
                        <button className="bg-green-600 py-1 uppercase" onClick={manterPorta} style={{ boxShadow: '0 0 2px 1px black' }}>manter Porta</button>
                        <button className="bg-red-600 py-1 uppercase" onClick={trocarDePorta} style={{ boxShadow: '0 0 2px 1px black' }}>trocar Porta</button>
                    </div>
                </div>

                {
                    ganhouPerdeu != null ? (
                        ganhouPerdeu ? (
                            <div className="bg-green-600 absolute top-6 left-[50%] text-2xl w-full max-w-[300px] p-4 rounded-lg text-center leading-6 font-bold md:text-3xl md:max-w-[400px] md:top-10" style={{ transform: 'translate(-50%)', boxShadow: '2px 2px 3px 2px black' }}>
                                <h2>Parabéns! Você fez a escolha correta e <b>Ganhou!!!!</b></h2>
                            </div>
                        ) : (
                            <div className="bg-red-600 absolute top-6 left-[50%] text-2xl w-full max-w-[300px] p-4 rounded-lg text-center leading-6 font-bold md:text-3xl md:max-w-[400px] md:top-10" style={{ transform: 'translate(-50%)', boxShadow: '2px 2px 3px 2px black' }}>
                                <h2>Que Azar! Infelizmente você fez a escolha errada e <b>Perdeu!!!!</b></h2>
                            </div>
                        )
                    ) : ('')
                }

                {
                    ganhouPerdeu != null ? (
                        <div className="bg-red-700 bottom-5 absolute text-2xl font-bold left-[50%] whitespace-nowrap py-1 rounded-lg w-full max-w-[300px] text-center sm:bottom-36 sm:text-3xl sm:p-4 md:bottom-4 md:p-2 xl:bottom-24" style={{ transform: 'translate(-50%)', boxShadow: '2px 2px 3px 2px black' }}>
                            <button onClick={() => reiniciarGame()}>Jogar novamente</button>
                        </div>
                    ) : ''
                }

                <div className="hidden flex-col absolute right-4 font-custom2 md:flex lg:text-xl lg:right-6 xl:text-2xl xl:right-8 xl:top-8">
                    <div className="flex gap-2">
                        <span>Tentativas:</span>
                        <span>{tentativas}</span>
                    </div>
                    <div className="flex gap-2">
                        <span>Acertos:</span>
                        <span>{acertos}</span>
                    </div>
                    <div className="flex gap-2">
                        <span>Porcentagem:</span>
                        <span>{porcentagem}%</span>
                    </div>
                </div>
            </div>
        </Template>
    );
}
