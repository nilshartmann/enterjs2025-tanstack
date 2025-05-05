import ky from "ky";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardDto } from "@/types";
import ImageChooser from "@/components/ImageChooser";
import Card from "@/components/Card";

type CardEditorProps = {
  onAfterSave?(newCard: CardDto): void;
};

export default function CardEditor({ onAfterSave }: CardEditorProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelected = (name: string) => {
    const newSelected = name === selectedImage ? null : name;
    setSelectedImage(newSelected);
  };

  const queryClient = useQueryClient();

  const saveCardMutation = useMutation({
    async mutationFn() {
      console.log("SAVING", title, message, selectedImage);
      const r = await ky
        .post("http://localhost:7100/api/cards", {
          json: { title, message, image: selectedImage },
        })
        .json();

      return CardDto.parseAsync(r);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["cards", "list"],
      });
    },
  });

  const handleSaveClick = async () => {
    const newCard = await saveCardMutation.mutateAsync();
    if (onAfterSave) {
      onAfterSave(newCard);
    }
  };

  return (
    <form className={"w-full"}>
      <h1>Create your personal greeeting card</h1>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      {title.length < 4 && (
        <p>Please enter a longer title. Current length: {title.length}</p>
      )}
      <label>
        Message
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>

      <label>Image</label>
      <ImageChooser
        selectedImage={selectedImage}
        onSelectedImageChange={handleImageSelected}
      />

      <button
        disabled={
          title.length === 0 || message.length === 0 || selectedImage === null
        }
        onClick={handleSaveClick}
        type={"button"}
      >
        Save
      </button>
      {saveCardMutation.isSuccess && (
        <p className={"flex justify-center gap-x-8 text-green-600"}>
          <span className={"font-bold"}>New card saved!</span>
          {/*<Link to={"/cards"}>*/}
          {/*  <span className={"font-bold text-green-600"}>Home</span>*/}
          {/*</Link>*/}
        </p>
      )}
      {saveCardMutation.isError && (
        <p className={"text-rose-600"}>Card could not be created</p>
      )}
    </form>
  );
}
