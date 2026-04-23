import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const memoryStore = new Map<string, unknown>();

function getWritableDataDir() {
  return process.env.FOUNDRYOS_DATA_DIR || path.join(process.cwd(), ".foundryos-data");
}

function getFilePath(name: string) {
  return path.join(getWritableDataDir(), `${name}.json`);
}

function canUseFileStore() {
  try {
    mkdirSync(getWritableDataDir(), { recursive: true });
    return true;
  } catch {
    return false;
  }
}

export function readCollection<T>(name: string, fallback: T): T {
  if (!canUseFileStore()) {
    return (memoryStore.get(name) as T | undefined) ?? fallback;
  }

  const filePath = getFilePath(name);
  if (!existsSync(filePath)) {
    writeCollection(name, fallback);
    return fallback;
  }

  try {
    const raw = readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return (memoryStore.get(name) as T | undefined) ?? fallback;
  }
}

export function writeCollection<T>(name: string, value: T) {
  memoryStore.set(name, value);

  if (!canUseFileStore()) {
    return;
  }

  const filePath = getFilePath(name);
  writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}
