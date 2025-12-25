import { redirect } from "next/navigation";
import { useAuth } from "../hooks/Auth";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (!user) {
    redirect("/login", "replace");
  }
  return <>{children}</>;
};

export default ProtectedRoute;
