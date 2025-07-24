import { isDefinedError } from '@orpc/client';
import { assertNever } from '@repo/shared';

type Params<TError extends { code: string }> = {
  error: Error | TError;
  codes: Record<TError['code'], (error: TError) => void>;
  defaultH: (error: Error) => void;
};

export function handleError<TError extends { code: string }>({ error, codes, defaultH }: Params<TError>) {
  if (!isDefinedError(error)) {
    return defaultH(error as any);
  }

  const handler = codes[error.code as keyof typeof codes];
  if (handler) {
    handler(error);
  } else {
    assertNever(error.code as never);
  }
}
