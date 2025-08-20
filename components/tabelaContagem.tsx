"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Contagem = {
  local: string;
  data: string;
  turno: string;
  total: string;
  realizador: string;
  ano: string;
  geom: string;
};

export default function TabelaContagem() {
  const [data, setData] = useState<Contagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [ano, setAno] = useState<string | undefined>();
  const [turno, setTurno] = useState<string | undefined>();
  const [realizador, setRealizador] = useState<string | undefined>();

  async function fetchData() {
    setLoading(true);
    const query = `
      query($page: Int!, $limit: Int!, $ano: String, $turno: String, $realizador: String) {
        contagemCiclistas(page: $page, limit: $limit, ano: $ano, turno: $turno, realizador: $realizador) {
          local
          data
          turno
          total
          realizador
          ano
          geom
        }
      }
    `;

    const res = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { page, limit, ano, turno, realizador },
      }),
    });

    const json = await res.json();
    setData(json.data?.contagemCiclistas ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [page, ano, turno, realizador]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex gap-4">
        <Select onValueChange={(v) => setAno(v === "all" ? undefined : v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setTurno(v === "all" ? undefined : v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Turno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Manhã">Manhã</SelectItem>
            <SelectItem value="Tarde">Tarde</SelectItem>
            <SelectItem value="Noite">Noite</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setRealizador(v === "all" ? undefined : v)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Realizador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Prefeitura">Prefeitura</SelectItem>
            <SelectItem value="Ciclovida">Ciclovida</SelectItem>
            <SelectItem value="Ciclourb">Ciclourb</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <div className="rounded-2xl shadow overflow-hidden">
        {loading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Local</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Realizador</TableHead>
                <TableHead>Ano</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell>{c.local}</TableCell>
                  <TableCell>{c.data}</TableCell>
                  <TableCell>{c.turno}</TableCell>
                  <TableCell>{c.total}</TableCell>
                  <TableCell>{c.realizador}</TableCell>
                  <TableCell>{c.ano}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
