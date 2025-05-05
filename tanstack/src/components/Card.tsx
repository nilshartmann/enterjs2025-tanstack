type CardProps = {
  title: string;
  message: string;
  image: string;
};

export default function Card({ title, message, image }: CardProps) {
  return (
    <div className={"CardDisplay"}>
      <h2>{title}</h2>
      <img alt={title} src={`/images/${image}`} />
      <p>{message}</p>
    </div>
  );
}
