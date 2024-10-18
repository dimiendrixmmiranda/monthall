import { InterfacePorta } from "@/core/porta/interfacePorta";
import { useEffect, useState } from "react";


export default function useGerarPortas(qtdePortas: number) {
    const [listaPortas, setListaPortas] = useState<InterfacePorta[] | null>(null)

    function gerarPortas(qtdePortas: number) {
        const listaDePortas: InterfacePorta[] = [];
        for (let i = 0; i < qtdePortas; i++) {
            listaDePortas.push({
                aberta: false,
                numero: i + 1,
                selecionada: false,
                temPresente: false,
            });
        }
        return listaDePortas
    }

    function sortearNumero(tamanhoDoArray: InterfacePorta[]) {
        return Math.floor(Math.random() * (tamanhoDoArray.length - 1)) + 1;
    }    

    useEffect(() => {
        const portas = gerarPortas(qtdePortas)
        const numeroSorteado = sortearNumero(portas)
        const portaComPresenteSorteado = portas.map((porta => {
            return {
                ...porta,
                temPresente: porta.numero === numeroSorteado
            }
        }))
        setListaPortas(portaComPresenteSorteado)
    },[qtdePortas])

    return {
        listaPortas,
        setListaPortas
    };
}