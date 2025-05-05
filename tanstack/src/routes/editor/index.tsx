import { createFileRoute } from "@tanstack/react-router";
import CardEditor from "@/components/CardEditor.tsx";

export const Route = createFileRoute("/editor/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"container mx-auto mt-4 mb-8 flex justify-center"}>
      <CardEditor />
    </div>
  );
}
