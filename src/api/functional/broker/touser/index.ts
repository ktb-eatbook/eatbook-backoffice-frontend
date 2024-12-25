/**
 * @packageDocumentation
 * @module api.functional.broker.touser
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Resolved, Primitive } from "typia";

import type {
  TryCatch,
  FailedResponse,
} from "../index.ts";
import type { Body } from '../index.ts';

/**
 * @controller BrokerController.toUser
 * @path POST /broker/touser
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function toUser(
  connection: IConnection,
  body: toUser.Input,
): Promise<toUser.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...toUser.METADATA,
      template: toUser.METADATA.path,
      path: toUser.path(),
    },
    body,
  );
}
export namespace toUser {
  export type Input = Resolved<Body.IToUser>;
  export type Output = Primitive<TryCatch<false | true, FailedResponse>>;

  export const METADATA = {
    method: "POST",
    path: "/broker/touser",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = () => "/broker/touser";
}
