import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterPage from "./RegisterPage";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (token) {
    redirect("/");
  }

  return <RegisterPage />;
}
