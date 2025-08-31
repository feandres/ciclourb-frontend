

interface Props {
  props: any
}

export default function MalhaPopup({ props }: Props) {
  return (
    <div className="text-sm">
      <strong>Via:</strong> {props.name || "Sem nome"}<br />
      <strong>Tipo:</strong> {props.tipo || "Desconhecido"}<br />
      <strong>Executado:</strong> {props.executado || "Desconhecido"}<br />
      <strong>Prazo:</strong> {props.prazo || "Desconhecido"}<br />
      <strong>Tipologia:</strong> {props.tipologia || "Desconhecido"}<br />
      <strong>Sentido:</strong> {props.sentido || "Desconhecido"}<br />
    </div>
  )
}
