import { cookies } from "next/headers";
import LoginPage from "./LoginPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (token) {
    redirect("/");
  }

  return <LoginPage />;
}
