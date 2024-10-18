
interface ComecarProps {
	comecarJogo: (e: React.FormEvent<HTMLFormElement>) => void
	visible: boolean
}

export default function Comecar({ visible, comecarJogo }: ComecarProps) {
	return (
		<div className={`${visible ? 'block' : 'hidden'}`}>
			<form onSubmit={(e) => comecarJogo(e)}>
				<button
					type="submit"
					className="bg-blue-800 rounded-full uppercase font-black py-2 w-[300px] text-2xl"
				>
					Começar
				</button>
			</form>
		</div>
	)
}