import userSchema from '../schemas/user.schema.json' with { type: 'json' };

export type UserPayload = {
  id: number;
  name: string;
  email: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateUserPayload(payload: unknown): payload is UserPayload {
  if (!isRecord(payload)) {
    return false;
  }

  if (typeof payload.id !== 'number' || Number.isNaN(payload.id)) {
    return false;
  }

  if (typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    return false;
  }

  if (typeof payload.email !== 'string') {
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(payload.email)) {
    return false;
  }

  const requiredKeys = userSchema.required as string[];
  const properties = userSchema.properties as Record<string, Record<string, unknown>>;

  for (const key of requiredKeys) {
    if (!(key in payload)) {
      return false;
    }
  }

  for (const [key, definition] of Object.entries(properties)) {
    if (!(key in payload)) {
      continue;
    }

    const value = payload[key];
    if (key === 'id' && definition.type === 'integer' && typeof value !== 'number') {
      return false;
    }

    if (key === 'name' && definition.type === 'string' && typeof value !== 'string') {
      return false;
    }

    if (key === 'email' && definition.type === 'string' && typeof value !== 'string') {
      return false;
    }
  }

  return true;
}
