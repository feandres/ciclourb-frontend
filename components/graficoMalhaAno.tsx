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

type Props = {
  apiUrl: string;
};

export default function EvolucaoMalhaAnoChart({ apiUrl }: Props) {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      const query = `
        query {
          evolucaoMalhaPorAno {
            ano
            valor
          }
        }
      `;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const json = await res.json();
      const items: Item[] = json.data.evolucaoMalhaPorAno;

      // Converter metros para km
      const mapped: Record<string, number> = {};
      items.forEach(({ ano, valor }) => {
        mapped[ano] = valor / 1000;
      });

      // Determinar intervalo de anos
      const anos = Object.keys(mapped)
        .map(Number)
        .sort((a, b) => a - b);
      const minAno = anos[0];
      const maxAno = anos[anos.length - 1];

      // Preencher anos faltantes com valor do ano anterior
      const result: Item[] = [];
      let prevValor = 0;
      for (let ano = minAno; ano <= maxAno; ano++) {
        const anoStr = ano.toString();
        const valor = mapped[anoStr] ?? prevValor;
        result.push({ ano: anoStr, valor });
        prevValor = valor;
      }

      setData(result);
    }

    fetchData();
  }, [apiUrl]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="ano" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valor" stroke="#2563eb" name="Malha (km)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
