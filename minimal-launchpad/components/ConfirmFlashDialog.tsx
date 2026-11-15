import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@espressif/dashboard-ui-components";

/**
 * Asked before the port picker opens (chipguyhere fork addition): flashing
 * replaces what is on the board, and with erase_all (the default) wipes it.
 * Continue is the user gesture Web Serial needs, so the picker opens from it.
 */
export function ConfirmFlashDialog({
  open,
  appName,
  eraseAll,
  onCancel,
  onContinue,
}: {
  open: boolean;
  appName?: string;
  eraseAll: boolean;
  onCancel: () => void;
  onContinue: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{eraseAll ? "Erase the board and install?" : "Install?"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          {eraseAll ? (
            <p>
              <b>Everything on the board you pick next will be erased</b> - its firmware and
              anything it has saved (settings, Wi-Fi passwords, files) - and replaced with{" "}
              {appName ?? "this firmware"}. This can't be undone.
            </p>
          ) : (
            <p>
              The firmware on the board you pick next will be replaced with{" "}
              {appName ?? "this firmware"}. Settings it has saved are kept.
            </p>
          )}
          <p>Make sure only the board you mean is plugged in, or pick its port carefully.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={onContinue}>
            {eraseAll ? "Erase and install" : "Install"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
