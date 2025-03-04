import type { SyncStatusItem } from "../../common/spaces/sync.ts";
import { syscall } from "./syscall.ts";

export type SyncEndpoint = {
  url: string;
  user?: string;
  password?: string;
  excludePrefixes?: string[];
};

// Perform a sync with the server, based on the given status (to be persisted)
// returns a new sync status to persist
export function syncAll(
  endpoint: SyncEndpoint,
  snapshot: Record<string, SyncStatusItem>,
): Promise<
  {
    snapshot: Record<string, SyncStatusItem>;
    operations: number;
    error?: string;
  }
> {
  return syscall("sync.syncAll", endpoint, snapshot);
}

// Perform a sync with the server, based on the given status (to be persisted)
// returns a new sync status to persist
export function syncFile(
  endpoint: SyncEndpoint,
  snapshot: Record<string, SyncStatusItem>,
  name: string,
): Promise<
  {
    snapshot: Record<string, SyncStatusItem>;
    operations: number;
    error?: string;
  }
> {
  return syscall("sync.syncFile", endpoint, snapshot, name);
}

// Checks the sync endpoint for connectivity and authentication, throws and Error on failure
export function check(endpoint: SyncEndpoint): Promise<void> {
  return syscall("sync.check", endpoint);
}
