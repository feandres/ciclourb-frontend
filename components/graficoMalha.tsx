"use client";

import api from "@/services/api";
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

export default function EvolucaoMalhaChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/dados/evolucao-malha-tipologia`);
        const json: Item[] = await res.data;

        const items = json.map((i) => ({
          ano: i.ano,
          tipologia: i.tipologia,
          valor: Math.round((Number(i.valor) / 1000) * 10) / 10,
        }));

        const tipologias = [
          "Ciclovia bidirecional",
          "Ciclofaixa",
          "Ciclorrota",
          "Passeio compartilhado",
        ];

        const grouped: Record<number, Record<string, number>> = {};
        items.forEach(({ ano, tipologia, valor }) => {
          if (!grouped[ano]) grouped[ano] = { ano };
          grouped[ano][tipologia] = valor;
        });

        const anos = Array.from(new Set(items.map((i) => i.ano))).sort(
          (a, b) => a - b
        );
        const minAno = anos[0];
        const maxAno = anos[anos.length - 1];

        const result: any[] = [];
        let prev: Record<string, number> = {};
        for (let ano = minAno; ano <= maxAno; ano++) {
          const entry: Record<string, any> = { ano };
          tipologias.forEach((tip) => {
            entry[tip] = grouped[ano]?.[tip] ?? prev[tip] ?? 0;
          });
          result.push(entry);
          prev = entry;
        }

        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados da malha por tipologia:", error);
      }
    }

    fetchData();
  }, []);

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
            formatter={(value) =>
              value === "Ciclovia bidirecional" ? "Ciclovia" : value
            }
          />

          <Line
            type="monotone"
            dataKey="Ciclovia bidirecional"
            name="Ciclovia"
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
