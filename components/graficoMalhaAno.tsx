"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Item = {
  ano: string;
  valor: number;
};

export default function EvolucaoMalhaAnoChart() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.API_URL}/dados/evolucao-malha-ano`);
        const json = await res.json();

        const items: Item[] = json.map((i: any) => ({
          ano: i.ano.toString(),
          valor: Math.round((Number(i.valor) / 1000) * 10) / 10,
        }));

        // Determinar intervalo de anos
        const anos = items.map((i) => Number(i.ano)).sort((a, b) => a - b);
        const minAno = anos[0];
        const maxAno = anos[anos.length - 1];

        // Preencher anos faltantes com valor do ano anterior
        const result: Item[] = [];
        let prevValor = 0;
        for (let ano = minAno; ano <= maxAno; ano++) {
          const anoStr = ano.toString();
          const valor = items.find((i) => i.ano === anoStr)?.valor ?? prevValor;
          result.push({ ano: anoStr, valor });
          prevValor = valor;
        }

        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados da malha por ano:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="ano" />
        <YAxis />
        <Tooltip formatter={(v: number) => `${v.toLocaleString()} km`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#2563eb"
          name="Malha (km)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
