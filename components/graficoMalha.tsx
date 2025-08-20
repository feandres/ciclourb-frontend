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
  CartesianGrid,
} from "recharts";

type Item = {
  ano: number;
  tipologia: string;
  valor: number;
};

type Props = {
  apiUrl: string;
};

export default function EvolucaoMalhaChart({ apiUrl }: Props) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const query = `
        query {
          evolucaoMalhaPorTipologia {
            ano
            tipologia
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
      const items: Item[] = json.data.evolucaoMalhaPorTipologia;

      const grouped: Record<string, Record<string, number>> = {};
      items.forEach(({ ano, tipologia, valor }) => {
        if (!grouped[ano]) grouped[ano] = { ano };
        grouped[ano][tipologia] = valor / 1000; // metros -> km
      });

      const anos = Object.keys(grouped)
        .map(Number)
        .sort((a, b) => a - b);
      const minAno = anos[0];
      const maxAno = anos[anos.length - 1];

      const tipologias = [
        "Ciclovia bidirecional",
        "Ciclofaixa",
        "Ciclorrota",
        "Passeio compartilhado",
      ];

      const result: any[] = [];
      let prev: Record<string, number> = {};
      for (let ano = minAno; ano <= maxAno; ano++) {
        const anoStr = ano.toString();
        const entry: Record<string, any> = { ano: anoStr };
        tipologias.forEach((tip) => {
          entry[tip] = grouped[anoStr]?.[tip] ?? prev[tip] ?? 0;
        });
        result.push(entry);
        prev = entry;
      }

      setData(result);
    }

    fetchData();
  }, [apiUrl]);

  return (
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-white rounded-2xl shadow p-2 sm:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="ano"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            width={50}
            label={{
              value: "Extensão (km)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              borderColor: "#d1d5db",
              fontSize: "0.85rem",
            }}
            formatter={(value: number) => `${value.toFixed(1)} km`}
          />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ fontSize: "0.75rem", paddingBottom: "1rem" }}
          />
          <Line
            type="monotone"
            dataKey="Ciclovia bidirecional"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Ciclofaixa"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Ciclorrota"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Passeio compartilhado"
            stroke="#dc2626"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
