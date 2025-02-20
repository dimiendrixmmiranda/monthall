import Template from "@/components/template/Template";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<Template>
			<div className="flex flex-col gap-3 max-w-[700px] mx-auto">
				<div className="flex flex-col gap-2 md:gap-4">
					<h1 className="font-custom1 text-4xl text-center md:text-6xl">Problema de monthall</h1>
					<p className="text-sm text-center font-custom2 md:text-lg md:leading-6">
						O problema de Monty Hall é um jogo de probabilidade. Você escolhe uma entre três portas, uma tem um prêmio e as outras estão vazias. O apresentador, que sabe onde está o prêmio, abre uma porta vazia das duas restantes e pergunta se você quer trocar de porta. Trocar aumenta as chances de ganhar de 1/3 para 2/3.
					</p>
				</div>
				<div className="relative w-full max-w-[320px] h-[250px] mx-auto sm:max-w-[400px] sm:h-[400px] md:-my-6">
					<Image alt="balão" src={'/balao.png'} fill className="object-contain"></Image>
					<span className="font-custom1 text-xl absolute top-[50%] left-[45%] text-center leading-6 max-w-[140px] sm:text-2xl" style={{transform: 'translate(-50%, -50%)', textShadow: '1px 1px 2px black'}}>Que tal testar na prática????</span>
				</div>
				<button className="font-botao">
					<Link href={'/game'} className="bg-[--vermelho] px-4 py-2 rounded-lg text-3xl md:text-4xl md:px-20 md:py-3" style={{boxShadow: '2px 2px 4px black'}}>
						Start!
					</Link>
				</button>
			</div>
		</Template>
	);
}
