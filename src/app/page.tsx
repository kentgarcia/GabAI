import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-headline tracking-tight lg:text-5xl">Blank Slate</CardTitle>
            <CardDescription className="pt-2 text-base">
              Your creative journey starts here. This is a clean canvas for your ideas.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/20">
              <p className="text-muted-foreground">This space is intentionally left blank.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
