import { redirect } from "next/navigation";

// Redirect to the main search page
export default function ToolsSearchRedirect() {
  redirect("/search");
}
