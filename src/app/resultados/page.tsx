'use client';

import Template from "@/components/template/Template";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [acertos, setAcertos] = useState(0);
    const router = useRouter()
    
    useEffect(() => {
        const acertosSalvos = localStorage.getItem("acertos");
        console.log(acertosSalvos)
        const acertosNum = acertosSalvos ? parseInt(acertosSalvos) : 0;
        setAcertos(acertosNum);

    }, []);

    function resetar() {
        localStorage.setItem("tentativas", "0");
        localStorage.setItem("acertos", "0");
        router.push(`/`)
    }
    return (    
        <Template>
            <div className="min-h-full min-w-full flex flex-col justify-center items-center gap-4">
                <h2 className="uppercase font-bold text-4xl max-w-[400px] text-center leading-[45px]">
                    De 10 Tentativas você acertou {acertos}
                </h2>
                <button 
                    className="bg-red-700 bottom-5 text-2xl font-bold whitespace-nowrap py-1 rounded-lg w-full max-w-[300px] text-center sm:bottom-36 sm:text-3xl sm:p-4 md:bottom-4 md:p-2 xl:bottom-24" 
                    style={{ boxShadow: '2px 2px 3px 2px black' }}
                    onClick={resetar}
                >
                    Jogar novamente
                </button>
            </div>
        </Template>
    );
}
