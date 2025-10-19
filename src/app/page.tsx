import LogoutButton from "@/components/dashboard/Logout";
import TableData from "@/components/dashboard/TableData";
import { CommentType } from "@/types/comment.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  const comments: CommentType[] = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  ).then((res) => res.json());

  return (
    <div className="w-full flex flex-col py-10 px-5  gap-10">
      <div className="flex flex-col gap-4">
        <LogoutButton className="w-32 py-10 md:hidden" />
        <h1 className="text-4xl font-black">Dashboard Comments</h1>
      </div>
      <div className="px-2 md:px-10 lg:px-20">
        <TableData data={comments} />
      </div>
    </div>
  );
}
