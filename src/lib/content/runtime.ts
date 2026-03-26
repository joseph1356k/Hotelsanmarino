export class ContentInfrastructureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentInfrastructureError";
  }
}

export class MissingContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingContentError";
  }
}

export function isDevelopmentContentFallbackEnabled() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_ENABLE_DEV_CONTENT_FALLBACK !== "false"
  );
}

export function assertOrThrow(
  condition: unknown,
  errorFactory: () => Error,
): asserts condition {
  if (!condition) {
    throw errorFactory();
  }
}
