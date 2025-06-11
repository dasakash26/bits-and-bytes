import { SpinnerLoader } from "@/components/ui/loaders";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center font-bold space-y-10">
        <SpinnerLoader size="lg" />
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Hang Tight</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we load the content...
          </p>
        </div>
      </div>
    </div>
  );
}
