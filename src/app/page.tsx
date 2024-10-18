'use client'
import Começar from "@/components/Comecar";
import { FormEvent, useState } from "react";
import Porta from "@/components/Porta";
import { InterfacePorta } from "@/core/porta/interfacePorta";
import useGerarPortas from "@/data/hooks/useGerarPortas";
import Image from "next/image";

export default function Home() {
	const [visibleComecar, setVisibleComecar] = useState(true)
	const [visiblePortas, setVisiblePortas] = useState(false)
	const [visibleBoxSelecinarPorta, setVisibleBoxSelecinarPorta] = useState(false)
	const [visibleBoxPergunta, setVisibleBoxPergunta] = useState(false)
	const [ganhou, setGanhou] = useState(false)
	const [perdeu, setPerdeu] = useState(false)

	const [portaSelecionada, setPortaSelecionada] = useState<InterfacePorta | null>(null)
	const portas = useGerarPortas(3)

	function comecarJogo(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setVisibleComecar(false)
		setVisiblePortas(true)
	}

	function selecionarPorta(porta: InterfacePorta) {
		setPortaSelecionada(porta)
		setVisibleBoxSelecinarPorta(true)
	}

	// é aqui que ta selecionando e abrindo uma porta que não esta selecionada e não contem presente
	function logicaSelecionarPorta() {
		const listaAlterada = portas.listaPortas?.map(porta => {
			return {
				...porta,
				selecionada: porta.numero === portaSelecionada?.numero
			}
		})

		// porta que não foi selecionada e que não tem presente  
		const portaSelecionadaAbrir = possiveisPortasAbrir(listaAlterada);
		if (portaSelecionadaAbrir) {
			const novaLista = listaAlterada?.map(porta => {
				return {
					...porta,
					aberta: porta.numero === portaSelecionadaAbrir.numero ? true : false
				}
			});

			const portasNaoAbertas = novaLista?.filter(porta => porta.aberta === false)
			if (portasNaoAbertas != undefined && portasNaoAbertas.length <= 2) {
				console.log('devo perguntar se quer abrir a porta que ele selecionou ou trocar')
				setVisibleBoxPergunta(true)
			} else {
				console.log('continuar')
			}
			console.log(portasNaoAbertas)

			if (novaLista != undefined) portas.setListaPortas(novaLista)
		}
		setVisibleBoxSelecinarPorta(false)
	}

	// abre a porta selecionada porem fecha as portas que ja estao abertas, não quero esse comportamento
	function abrirPorta(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		const porta = e.currentTarget?.dataset.porta

		if (porta == 'selecionada') {
			const resultado = portas.listaPortas?.filter(porta => porta.selecionada == true && portaSelecionada?.temPresente == true)
			if (resultado != undefined && resultado.length > 0) {
				setGanhou(true)
			} else {
				setPerdeu(true);
			}
		} else {
			const resultado = portas.listaPortas?.filter(porta => porta.selecionada == false && porta.temPresente == true)
			if (resultado != undefined && resultado.length > 0) {
				setGanhou(true)
			} else {
				setPerdeu(true)
			}
		}

		const novoArray = portas.listaPortas?.map(porta => {
			return {
				...porta,
				aberta: true
			}
		})
		if (novoArray != undefined) portas.setListaPortas(novoArray)
		setVisibleBoxPergunta(false);
	}

	function possiveisPortasAbrir(listaAlterada: InterfacePorta[] | undefined): InterfacePorta | null {
		const array = listaAlterada?.filter(porta => porta.aberta != true && porta.temPresente != true && porta.selecionada != true);
		const numeroId = array != undefined ? Math.floor(Math.random() * array.length) : 0;

		// Verifica se a array está definida e não está vazia
		if (array && array.length > 0) {
			return array[numeroId]; // Retorna a porta correta
		} else {
			return null; // Retorna null se não houver portas válidas
		}
	}

	function jogarNovamente() {
		setGanhou(false)
		setPerdeu(false)
		window.location.reload()
	}

	return (
		<div className="relative min-h-[100vh] flex flex-col items-center justify-center">
			<div className="flex justify-center items-center gap-2 my-5">
				<div className="relative w-[50px] h-[70px]">
					<Image src={'/porta-interrogacao.png'} alt="porta" fill className="object-cover"></Image>
				</div>
				<h2 className="text-white text-6xl mt-3 titulo">Monthall</h2>
			</div>
			<Começar visible={visibleComecar} comecarJogo={comecarJogo}></Começar>
			{
				visiblePortas ?
					<div className="flex flex-wrap justify-center gap-5 my-4">
						{
							portas.listaPortas?.map(porta => {
								return (
									<Porta key={porta.numero} numeroPorta={porta.numero} selecionarPorta={() => selecionarPorta(porta)} aberta={porta.aberta} presente={porta.temPresente} selecionar={porta.selecionada}></Porta>
								)
							})
						}
					</div>
					: ''
			}

			{
				visibleBoxSelecinarPorta ?
					<div className="bg-blue-900 absolute top-[50%] left-[50%] z-10 p-3" style={{ transform: 'translate(-50%, -50%)' }}>
						<h1 className="text-2xl max-w-[250px] font-black leading-7 text-center">Deseja realmente selecionar essa porta?</h1>
						<div className="grid grid-cols-2 mt-4 gap-3">
							<button onClick={() => logicaSelecionarPorta()} className="bg-green-700 font-bold text-2xl">Sim</button>
							<button onClick={() => setVisibleBoxSelecinarPorta(false)} className="bg-red-500 font-bold text-2xl">Não</button>
						</div>
					</div>
					: ''
			}

			{
				visibleBoxPergunta ?
					<div className="bg-blue-900 absolute top-[50%] left-[50%] z-10 max-w-[280px] p-2" style={{ transform: 'translate(-50%, -50%)' }}>
						<h1 className="text-2xl font-black leading-7 text-center">Deseja abrir a porta selecionada ou trocar de porta?</h1>
						<div className="grid grid-cols-2 gap-2 mt-4">
							<button onClick={(e) => abrirPorta(e)} data-porta="selecionada" className="font-bold bg-green-700 p-1 text-xl leading-6">Abrir porta Selecionada</button>
							<button onClick={(e) => abrirPorta(e)} data-porta="outra" className="font-bold bg-red-500 p-1 text-xl leading-6">Trocar De Porta</button>
						</div>
					</div> : ''
			}

			{
				ganhou ?
					<div className="bg-green-600 absolute top-[50%] left-[50%] p-4" style={{ transform: 'translate(-50%,-50%)' }}>
						<h2 className="uppercase font-bold text-4xl text-center leading-8">Parabéns você ganhou!</h2>
						<button onClick={() => jogarNovamente()} className="w-full bg-green-800 text-xl p-2 mt-3">Jogar novamente</button>
					</div> : ''
			}
			{
				perdeu ?
					<div className="bg-red-600 absolute top-[50%] left-[50%] p-4" style={{ transform: 'translate(-50%,-50%)' }}>
						<h2 className="uppercase font-bold text-4xl text-center leading-10">Infelizmente você perdeu!</h2>
						<button onClick={() => jogarNovamente()} className="w-full bg-red-500 text-xl p-2 mt-3">Jogar novamente</button>
					</div> : ''
			}
		</div>
	)
}
