import { SpinnerLoader } from "@/components/ui/loaders";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <SpinnerLoader size="lg" className="text-primary" />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Hang Tight</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Please wait while we load the content...
          </p>
        </div>
      </div>
    </div>
  );
}
