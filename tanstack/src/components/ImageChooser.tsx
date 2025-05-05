// in real life this would come from the backend

const ALL_IMAGES = ["01.png", "02.png", "03.png", "04.png", "05.png"];

type ImageChooserProps = {
  selectedImage: string | null;
  onSelectedImageChange(image: string | null): void;
};

export default function ImageChooser({
  selectedImage,
  onSelectedImageChange,
}: ImageChooserProps) {
  return (
    <div className={"ImageChooser"}>
      {ALL_IMAGES.map((i) => (
        <img
          alt={i}
          key={i}
          src={`/images/${i}`}
          onClick={() => onSelectedImageChange(i)}
          className={selectedImage === i ? "border-amber-600" : ""}
        />
      ))}
    </div>
  );
}
