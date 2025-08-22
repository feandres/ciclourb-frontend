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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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
  const [total, setTotal] = useState(0);
  const limit = 10;

  const [ano, setAno] = useState<string | undefined>();
  const [turno, setTurno] = useState<string | undefined>();
  const [realizador, setRealizador] = useState<string | undefined>();

  const totalPages = Math.ceil(total / limit);

  async function fetchData() {
    setLoading(true);

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (ano) params.append("ano", ano);
    if (turno) params.append("turno", turno);
    if (realizador) params.append("realizador", realizador);

    try {
      const res = await fetch(`http://localhost:3001/contagem?${params.toString()}`);
      const json = await res.json();
      setData(json.data ?? []);
      setTotal(json.total ?? 0);
    } catch (error) {
      console.error("Erro ao buscar contagens REST:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1); // reset page quando filtros mudam
  }, [ano, turno, realizador]);

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
            <SelectItem value="2013">2013</SelectItem>
            <SelectItem value="2014">2014</SelectItem>
            <SelectItem value="2015">2015</SelectItem>
            <SelectItem value="2016">2016</SelectItem>
            <SelectItem value="2017">2017</SelectItem>
            <SelectItem value="2018">2018</SelectItem>
            <SelectItem value="2019">2019</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
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
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) => setRealizador(v === "all" ? undefined : v)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Realizador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="AMC">AMC</SelectItem>
            <SelectItem value="Ciclovida">Ciclovida</SelectItem>
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
          disabled={loading || page >= totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
