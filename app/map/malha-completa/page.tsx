'use client'
import MapComponent from "@/components/mapComponents/map2";
import api from "@/services/api";
import { useEffect, useState } from "react";

export default function MalhaCompleta() {

  const [malhaData, setMalhaData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getMalhaData()
  }, []);

  async function getMalhaData() {
    try {
      setLoading(true);
      const response = await api.get("/geom-data");
      setMalhaData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full">
      {loading ? (
        <p>Loading</p>
      ) : (
        <MapComponent malhaData={malhaData}/>
      )}
    </div>
  )
}

