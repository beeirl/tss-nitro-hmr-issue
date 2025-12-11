import { Button } from "@tss-nitro-hmr-issue/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

const getData = createServerFn().handler(async () => {
  const session = await useSession({
    password: process.env.SESSION_SECRET || "0".repeat(32),
    name: "session",
  });

  // Just accessing session to demonstrate useSession is called
  console.log("Session data:", session.data);

  return { foo: "bar" };
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: () => getData(),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p className="text-gray-600">Data from server: {JSON.stringify(data)}</p>
      <Button>Click mes</Button>
    </div>
  );
}
