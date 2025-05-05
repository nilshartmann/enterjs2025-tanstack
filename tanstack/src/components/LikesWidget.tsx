import LikeButton from "@/components/LikeButton";

type LikesWidgetProps = {
  cardId: string;
  currentLikes: number;
};

export function LikesWidget({ cardId, currentLikes }: LikesWidgetProps) {
  const handleSave = () => {
    // todo
  };

  return (
    <form className={"inline-block"} action={handleSave}>
      <LikeButton currentLikes={currentLikes} />
    </form>
  );
}
