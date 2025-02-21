import Template from "@/components/template/Template";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<Template>
			<div className="flex flex-col p-4 my-auto w-full gap-4 md:max-w-[600px] md:p-8">
				<div className="flex flex-col gap-2 md:gap-4">
					<h1 className="font-custom1 text-4xl text-center sm:text-5xl md:text-6xl">Problema de monthall</h1>
					<p className="text-sm text-center font-custom2 sm:text-lg sm:leading-6">
						O problema de Monty Hall é um jogo de probabilidade. Você escolhe uma entre três portas, uma tem um prêmio e as outras estão vazias. O apresentador, que sabe onde está o prêmio, abre uma porta vazia das duas restantes e pergunta se você quer trocar de porta. Trocar aumenta as chances de ganhar de 1/3 para 2/3.
					</p>
				</div>
				<div className="relative w-full max-w-[320px] h-[250px] mx-auto -my-2">
					<Image alt="balão" src={'/balao.png'} fill className="object-contain"></Image>
				</div>
				<button className="font-botao w-full max-w-[300px] mx-auto">
					<Link href={'/game'} className="bg-[--vermelho] py-2 rounded-lg text-3xl w-full flex justify-center items-center" style={{boxShadow: '2px 2px 4px black'}}>
						Start!
					</Link>
				</button>
			</div>
		</Template>
	);
}
