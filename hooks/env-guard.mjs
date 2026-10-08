const TEMPLATE_SUFFIXES = new Set(["example", "sample", "template", "dist"]);
const ENV_BASENAME = /^\.env(?:\.(.+))?$/;
const ENV_TOKEN = /(?:^|[\s"'`=:(<>|&;/])\.env((?:\.[A-Za-z0-9_-]+)*)(?![A-Za-z0-9_])/g;
const ENV_GLOB = /(?:^|[\\/{,])\.env(?:\.[^\\/]*)?[*?[]/;

export function isTemplateSuffix(suffix) {
  if (!suffix) return false;
  const last = suffix.split(".").filter(Boolean).pop();
  return TEMPLATE_SUFFIXES.has(last);
}

export function isSecretEnvPath(value) {
  if (typeof value !== "string" || value === "") return false;
  const basename = value.split(/[\\/]/).pop();
  const match = ENV_BASENAME.exec(basename);
  if (!match) return false;
  return !isTemplateSuffix(match[1]);
}

export function isSecretEnvGlob(value) {
  return typeof value === "string" && (ENV_GLOB.test(value) || isSecretEnvPath(value));
}

export function commandTouchesSecretEnv(command) {
  if (typeof command !== "string") return false;
  for (const match of command.matchAll(ENV_TOKEN)) {
    const suffix = match[1] ? match[1].slice(1) : "";
    if (!isTemplateSuffix(suffix)) return true;
  }
  return false;
}

export function decide(event) {
  const input = event?.tool_input ?? {};
  if (event?.tool_name === "Bash") {
    return commandTouchesSecretEnv(input.command) ? "deny" : "allow";
  }
  const paths = [input.file_path, input.notebook_path, input.path];
  for (const edit of input.edits ?? []) paths.push(edit?.file_path);
  return paths.some(isSecretEnvPath) || isSecretEnvGlob(input.glob) ? "deny" : "allow";
}
