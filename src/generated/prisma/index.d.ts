
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model AiSuggestion
 * 
 */
export type AiSuggestion = $Result.DefaultSelection<Prisma.$AiSuggestionPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model CampaignStep
 * 
 */
export type CampaignStep = $Result.DefaultSelection<Prisma.$CampaignStepPayload>
/**
 * Model MessageTemplate
 * 
 */
export type MessageTemplate = $Result.DefaultSelection<Prisma.$MessageTemplatePayload>
/**
 * Model DashboardMetric
 * 
 */
export type DashboardMetric = $Result.DefaultSelection<Prisma.$DashboardMetricPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model ExportJob
 * 
 */
export type ExportJob = $Result.DefaultSelection<Prisma.$ExportJobPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const LeadStage: {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  ENGAGED: 'ENGAGED',
  QUALIFIED: 'QUALIFIED',
  PROPOSAL: 'PROPOSAL',
  NEGOTIATION: 'NEGOTIATION',
  CONVERTED: 'CONVERTED',
  LOST: 'LOST'
};

export type LeadStage = (typeof LeadStage)[keyof typeof LeadStage]


export const ConversationType: {
  EMAIL: 'EMAIL',
  CALL: 'CALL',
  MEETING: 'MEETING',
  LINKEDIN: 'LINKEDIN',
  NOTE: 'NOTE',
  OTHER: 'OTHER'
};

export type ConversationType = (typeof ConversationType)[keyof typeof ConversationType]


export const SuggestionStatus: {
  NEW: 'NEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
};

export type SuggestionStatus = (typeof SuggestionStatus)[keyof typeof SuggestionStatus]


export const StepType: {
  EMAIL: 'EMAIL',
  CALL: 'CALL',
  LINKEDIN_MESSAGE: 'LINKEDIN_MESSAGE',
  WAIT: 'WAIT',
  TASK: 'TASK'
};

export type StepType = (typeof StepType)[keyof typeof StepType]


export const TemplateType: {
  COLD_OUTREACH: 'COLD_OUTREACH',
  FOLLOW_UP: 'FOLLOW_UP',
  PROPOSAL: 'PROPOSAL',
  MEETING_REQUEST: 'MEETING_REQUEST',
  OTHER: 'OTHER'
};

export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType]


export const TaskStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const NotificationType: {
  FOLLOW_UP: 'FOLLOW_UP',
  TASK_DUE: 'TASK_DUE',
  AI_SUGGESTION: 'AI_SUGGESTION',
  CAMPAIGN_ALERT: 'CAMPAIGN_ALERT',
  SYSTEM: 'SYSTEM'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const ExportType: {
  LEADS: 'LEADS',
  CONVERSATIONS: 'CONVERSATIONS',
  CAMPAIGN_DATA: 'CAMPAIGN_DATA',
  ALL_DATA: 'ALL_DATA'
};

export type ExportType = (typeof ExportType)[keyof typeof ExportType]


export const JobStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type LeadStage = $Enums.LeadStage

export const LeadStage: typeof $Enums.LeadStage

export type ConversationType = $Enums.ConversationType

export const ConversationType: typeof $Enums.ConversationType

export type SuggestionStatus = $Enums.SuggestionStatus

export const SuggestionStatus: typeof $Enums.SuggestionStatus

export type StepType = $Enums.StepType

export const StepType: typeof $Enums.StepType

export type TemplateType = $Enums.TemplateType

export const TemplateType: typeof $Enums.TemplateType

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type ExportType = $Enums.ExportType

export const ExportType: typeof $Enums.ExportType

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PasswordResets
 * const passwordResets = await prisma.passwordReset.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PasswordResets
   * const passwordResets = await prisma.passwordReset.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiSuggestion`: Exposes CRUD operations for the **AiSuggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiSuggestions
    * const aiSuggestions = await prisma.aiSuggestion.findMany()
    * ```
    */
  get aiSuggestion(): Prisma.AiSuggestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignStep`: Exposes CRUD operations for the **CampaignStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignSteps
    * const campaignSteps = await prisma.campaignStep.findMany()
    * ```
    */
  get campaignStep(): Prisma.CampaignStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageTemplate`: Exposes CRUD operations for the **MessageTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageTemplates
    * const messageTemplates = await prisma.messageTemplate.findMany()
    * ```
    */
  get messageTemplate(): Prisma.MessageTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dashboardMetric`: Exposes CRUD operations for the **DashboardMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DashboardMetrics
    * const dashboardMetrics = await prisma.dashboardMetric.findMany()
    * ```
    */
  get dashboardMetric(): Prisma.DashboardMetricDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exportJob`: Exposes CRUD operations for the **ExportJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExportJobs
    * const exportJobs = await prisma.exportJob.findMany()
    * ```
    */
  get exportJob(): Prisma.ExportJobDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PasswordReset: 'PasswordReset',
    User: 'User',
    Lead: 'Lead',
    Conversation: 'Conversation',
    AiSuggestion: 'AiSuggestion',
    Campaign: 'Campaign',
    CampaignStep: 'CampaignStep',
    MessageTemplate: 'MessageTemplate',
    DashboardMetric: 'DashboardMetric',
    Task: 'Task',
    Notification: 'Notification',
    ExportJob: 'ExportJob'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "passwordReset" | "user" | "lead" | "conversation" | "aiSuggestion" | "campaign" | "campaignStep" | "messageTemplate" | "dashboardMetric" | "task" | "notification" | "exportJob"
      txIsolationLevel: never
    }
    model: {
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PasswordResetFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PasswordResetAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LeadFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LeadAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ConversationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ConversationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      AiSuggestion: {
        payload: Prisma.$AiSuggestionPayload<ExtArgs>
        fields: Prisma.AiSuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiSuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiSuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>
          }
          findFirst: {
            args: Prisma.AiSuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiSuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>
          }
          findMany: {
            args: Prisma.AiSuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>[]
          }
          create: {
            args: Prisma.AiSuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>
          }
          createMany: {
            args: Prisma.AiSuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AiSuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>
          }
          update: {
            args: Prisma.AiSuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>
          }
          deleteMany: {
            args: Prisma.AiSuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiSuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiSuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSuggestionPayload>
          }
          aggregate: {
            args: Prisma.AiSuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiSuggestion>
          }
          groupBy: {
            args: Prisma.AiSuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiSuggestionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AiSuggestionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AiSuggestionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AiSuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<AiSuggestionCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CampaignFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CampaignAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      CampaignStep: {
        payload: Prisma.$CampaignStepPayload<ExtArgs>
        fields: Prisma.CampaignStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>
          }
          findFirst: {
            args: Prisma.CampaignStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>
          }
          findMany: {
            args: Prisma.CampaignStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>[]
          }
          create: {
            args: Prisma.CampaignStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>
          }
          createMany: {
            args: Prisma.CampaignStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CampaignStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>
          }
          update: {
            args: Prisma.CampaignStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>
          }
          deleteMany: {
            args: Prisma.CampaignStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CampaignStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignStepPayload>
          }
          aggregate: {
            args: Prisma.CampaignStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignStep>
          }
          groupBy: {
            args: Prisma.CampaignStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignStepGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CampaignStepFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CampaignStepAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CampaignStepCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignStepCountAggregateOutputType> | number
          }
        }
      }
      MessageTemplate: {
        payload: Prisma.$MessageTemplatePayload<ExtArgs>
        fields: Prisma.MessageTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          findFirst: {
            args: Prisma.MessageTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          findMany: {
            args: Prisma.MessageTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>[]
          }
          create: {
            args: Prisma.MessageTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          createMany: {
            args: Prisma.MessageTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          update: {
            args: Prisma.MessageTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          deleteMany: {
            args: Prisma.MessageTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          aggregate: {
            args: Prisma.MessageTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageTemplate>
          }
          groupBy: {
            args: Prisma.MessageTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageTemplateGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageTemplateFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageTemplateAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<MessageTemplateCountAggregateOutputType> | number
          }
        }
      }
      DashboardMetric: {
        payload: Prisma.$DashboardMetricPayload<ExtArgs>
        fields: Prisma.DashboardMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DashboardMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DashboardMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>
          }
          findFirst: {
            args: Prisma.DashboardMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DashboardMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>
          }
          findMany: {
            args: Prisma.DashboardMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>[]
          }
          create: {
            args: Prisma.DashboardMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>
          }
          createMany: {
            args: Prisma.DashboardMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DashboardMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>
          }
          update: {
            args: Prisma.DashboardMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>
          }
          deleteMany: {
            args: Prisma.DashboardMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DashboardMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DashboardMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardMetricPayload>
          }
          aggregate: {
            args: Prisma.DashboardMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDashboardMetric>
          }
          groupBy: {
            args: Prisma.DashboardMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<DashboardMetricGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.DashboardMetricFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.DashboardMetricAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.DashboardMetricCountArgs<ExtArgs>
            result: $Utils.Optional<DashboardMetricCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TaskFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TaskAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NotificationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NotificationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      ExportJob: {
        payload: Prisma.$ExportJobPayload<ExtArgs>
        fields: Prisma.ExportJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExportJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExportJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>
          }
          findFirst: {
            args: Prisma.ExportJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExportJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>
          }
          findMany: {
            args: Prisma.ExportJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>[]
          }
          create: {
            args: Prisma.ExportJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>
          }
          createMany: {
            args: Prisma.ExportJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExportJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>
          }
          update: {
            args: Prisma.ExportJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>
          }
          deleteMany: {
            args: Prisma.ExportJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExportJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExportJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportJobPayload>
          }
          aggregate: {
            args: Prisma.ExportJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExportJob>
          }
          groupBy: {
            args: Prisma.ExportJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExportJobGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ExportJobFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ExportJobAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ExportJobCountArgs<ExtArgs>
            result: $Utils.Optional<ExportJobCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    passwordReset?: PasswordResetOmit
    user?: UserOmit
    lead?: LeadOmit
    conversation?: ConversationOmit
    aiSuggestion?: AiSuggestionOmit
    campaign?: CampaignOmit
    campaignStep?: CampaignStepOmit
    messageTemplate?: MessageTemplateOmit
    dashboardMetric?: DashboardMetricOmit
    task?: TaskOmit
    notification?: NotificationOmit
    exportJob?: ExportJobOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    leads: number
    notifications: number
    campaigns: number
    templates: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | UserCountOutputTypeCountLeadsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    campaigns?: boolean | UserCountOutputTypeCountCampaignsArgs
    templates?: boolean | UserCountOutputTypeCountTemplatesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageTemplateWhereInput
  }


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    conversations: number
    suggestions: number
    tasks: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | LeadCountOutputTypeCountConversationsArgs
    suggestions?: boolean | LeadCountOutputTypeCountSuggestionsArgs
    tasks?: boolean | LeadCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountSuggestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiSuggestionWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    steps: number
    leads: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | CampaignCountOutputTypeCountStepsArgs
    leads?: boolean | CampaignCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignStepWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type MessageTemplateCountOutputType
   */

  export type MessageTemplateCountOutputType = {
    suggestions: number
    campaignSteps: number
  }

  export type MessageTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    suggestions?: boolean | MessageTemplateCountOutputTypeCountSuggestionsArgs
    campaignSteps?: boolean | MessageTemplateCountOutputTypeCountCampaignStepsArgs
  }

  // Custom InputTypes
  /**
   * MessageTemplateCountOutputType without action
   */
  export type MessageTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplateCountOutputType
     */
    select?: MessageTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageTemplateCountOutputType without action
   */
  export type MessageTemplateCountOutputTypeCountSuggestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiSuggestionWhereInput
  }

  /**
   * MessageTemplateCountOutputType without action
   */
  export type MessageTemplateCountOutputTypeCountCampaignStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignStepWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    email: number
    token: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type PasswordResetMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    createdAt?: true
    expiresAt?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    createdAt?: true
    expiresAt?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    email: string
    token: string
    createdAt: Date
    expiresAt: Date
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["passwordReset"]>



  export type PasswordResetSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "createdAt" | "expiresAt", ExtArgs["result"]["passwordReset"]>

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * @param {PasswordResetFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const passwordReset = await prisma.passwordReset.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PasswordResetFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PasswordReset.
     * @param {PasswordResetAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const passwordReset = await prisma.passwordReset.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PasswordResetAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly email: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly createdAt: FieldRef<"PasswordReset", 'DateTime'>
    readonly expiresAt: FieldRef<"PasswordReset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset findRaw
   */
  export type PasswordResetFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PasswordReset aggregateRaw
   */
  export type PasswordResetAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    preferences: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    preferences?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    role: $Enums.UserRole
    preferences: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leads?: boolean | User$leadsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    campaigns?: boolean | User$campaignsArgs<ExtArgs>
    templates?: boolean | User$templatesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "preferences" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | User$leadsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    campaigns?: boolean | User$campaignsArgs<ExtArgs>
    templates?: boolean | User$templatesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      leads: Prisma.$LeadPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
      templates: Prisma.$MessageTemplatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      role: $Enums.UserRole
      preferences: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leads<T extends User$leadsArgs<ExtArgs> = {}>(args?: Subset<T, User$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaigns<T extends User$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, User$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    templates<T extends User$templatesArgs<ExtArgs> = {}>(args?: Subset<T, User$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly preferences: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.leads
   */
  export type User$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.campaigns
   */
  export type User$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * User.templates
   */
  export type User$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    where?: MessageTemplateWhereInput
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    cursor?: MessageTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    score: number | null
  }

  export type LeadSumAggregateOutputType = {
    score: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    linkedinUrl: string | null
    company: string | null
    position: string | null
    notes: string | null
    stage: $Enums.LeadStage | null
    score: number | null
    userId: string | null
    campaignId: string | null
    lastActivity: Date | null
    lastContactedDate: Date | null
    nextContactDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    linkedinUrl: string | null
    company: string | null
    position: string | null
    notes: string | null
    stage: $Enums.LeadStage | null
    score: number | null
    userId: string | null
    campaignId: string | null
    lastActivity: Date | null
    lastContactedDate: Date | null
    nextContactDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    linkedinUrl: number
    company: number
    position: number
    notes: number
    stage: number
    tags: number
    score: number
    userId: number
    campaignId: number
    lastActivity: number
    lastContactedDate: number
    nextContactDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    score?: true
  }

  export type LeadSumAggregateInputType = {
    score?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    linkedinUrl?: true
    company?: true
    position?: true
    notes?: true
    stage?: true
    score?: true
    userId?: true
    campaignId?: true
    lastActivity?: true
    lastContactedDate?: true
    nextContactDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    linkedinUrl?: true
    company?: true
    position?: true
    notes?: true
    stage?: true
    score?: true
    userId?: true
    campaignId?: true
    lastActivity?: true
    lastContactedDate?: true
    nextContactDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    linkedinUrl?: true
    company?: true
    position?: true
    notes?: true
    stage?: true
    tags?: true
    score?: true
    userId?: true
    campaignId?: true
    lastActivity?: true
    lastContactedDate?: true
    nextContactDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    name: string
    email: string | null
    phone: string | null
    linkedinUrl: string | null
    company: string | null
    position: string | null
    notes: string | null
    stage: $Enums.LeadStage
    tags: string[]
    score: number | null
    userId: string | null
    campaignId: string | null
    lastActivity: Date | null
    lastContactedDate: Date | null
    nextContactDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    linkedinUrl?: boolean
    company?: boolean
    position?: boolean
    notes?: boolean
    stage?: boolean
    tags?: boolean
    score?: boolean
    userId?: boolean
    campaignId?: boolean
    lastActivity?: boolean
    lastContactedDate?: boolean
    nextContactDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Lead$userArgs<ExtArgs>
    campaign?: boolean | Lead$campaignArgs<ExtArgs>
    conversations?: boolean | Lead$conversationsArgs<ExtArgs>
    suggestions?: boolean | Lead$suggestionsArgs<ExtArgs>
    tasks?: boolean | Lead$tasksArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>



  export type LeadSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    linkedinUrl?: boolean
    company?: boolean
    position?: boolean
    notes?: boolean
    stage?: boolean
    tags?: boolean
    score?: boolean
    userId?: boolean
    campaignId?: boolean
    lastActivity?: boolean
    lastContactedDate?: boolean
    nextContactDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "linkedinUrl" | "company" | "position" | "notes" | "stage" | "tags" | "score" | "userId" | "campaignId" | "lastActivity" | "lastContactedDate" | "nextContactDate" | "createdAt" | "updatedAt", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Lead$userArgs<ExtArgs>
    campaign?: boolean | Lead$campaignArgs<ExtArgs>
    conversations?: boolean | Lead$conversationsArgs<ExtArgs>
    suggestions?: boolean | Lead$suggestionsArgs<ExtArgs>
    tasks?: boolean | Lead$tasksArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      campaign: Prisma.$CampaignPayload<ExtArgs> | null
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      suggestions: Prisma.$AiSuggestionPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      phone: string | null
      linkedinUrl: string | null
      company: string | null
      position: string | null
      notes: string | null
      stage: $Enums.LeadStage
      tags: string[]
      score: number | null
      userId: string | null
      campaignId: string | null
      lastActivity: Date | null
      lastContactedDate: Date | null
      nextContactDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * @param {LeadFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lead = await prisma.lead.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LeadFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Lead.
     * @param {LeadAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lead = await prisma.lead.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LeadAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Lead$userArgs<ExtArgs> = {}>(args?: Subset<T, Lead$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    campaign<T extends Lead$campaignArgs<ExtArgs> = {}>(args?: Subset<T, Lead$campaignArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    conversations<T extends Lead$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    suggestions<T extends Lead$suggestionsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$suggestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Lead$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Lead$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly name: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly phone: FieldRef<"Lead", 'String'>
    readonly linkedinUrl: FieldRef<"Lead", 'String'>
    readonly company: FieldRef<"Lead", 'String'>
    readonly position: FieldRef<"Lead", 'String'>
    readonly notes: FieldRef<"Lead", 'String'>
    readonly stage: FieldRef<"Lead", 'LeadStage'>
    readonly tags: FieldRef<"Lead", 'String[]'>
    readonly score: FieldRef<"Lead", 'Int'>
    readonly userId: FieldRef<"Lead", 'String'>
    readonly campaignId: FieldRef<"Lead", 'String'>
    readonly lastActivity: FieldRef<"Lead", 'DateTime'>
    readonly lastContactedDate: FieldRef<"Lead", 'DateTime'>
    readonly nextContactDate: FieldRef<"Lead", 'DateTime'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead findRaw
   */
  export type LeadFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Lead aggregateRaw
   */
  export type LeadAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Lead.user
   */
  export type Lead$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Lead.campaign
   */
  export type Lead$campaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
  }

  /**
   * Lead.conversations
   */
  export type Lead$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Lead.suggestions
   */
  export type Lead$suggestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    where?: AiSuggestionWhereInput
    orderBy?: AiSuggestionOrderByWithRelationInput | AiSuggestionOrderByWithRelationInput[]
    cursor?: AiSuggestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiSuggestionScalarFieldEnum | AiSuggestionScalarFieldEnum[]
  }

  /**
   * Lead.tasks
   */
  export type Lead$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    type: $Enums.ConversationType | null
    content: string | null
    subject: string | null
    attachment: string | null
    sentiment: string | null
    date: Date | null
    followUp: Date | null
    hasFollowUp: boolean | null
    followUpDone: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    type: $Enums.ConversationType | null
    content: string | null
    subject: string | null
    attachment: string | null
    sentiment: string | null
    date: Date | null
    followUp: Date | null
    hasFollowUp: boolean | null
    followUpDone: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    leadId: number
    type: number
    content: number
    subject: number
    attachment: number
    sentiment: number
    date: number
    followUp: number
    hasFollowUp: number
    followUpDone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    content?: true
    subject?: true
    attachment?: true
    sentiment?: true
    date?: true
    followUp?: true
    hasFollowUp?: true
    followUpDone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    content?: true
    subject?: true
    attachment?: true
    sentiment?: true
    date?: true
    followUp?: true
    hasFollowUp?: true
    followUpDone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    content?: true
    subject?: true
    attachment?: true
    sentiment?: true
    date?: true
    followUp?: true
    hasFollowUp?: true
    followUpDone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    leadId: string
    type: $Enums.ConversationType
    content: string
    subject: string | null
    attachment: string | null
    sentiment: string | null
    date: Date
    followUp: Date | null
    hasFollowUp: boolean
    followUpDone: boolean
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    type?: boolean
    content?: boolean
    subject?: boolean
    attachment?: boolean
    sentiment?: boolean
    date?: boolean
    followUp?: boolean
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>



  export type ConversationSelectScalar = {
    id?: boolean
    leadId?: boolean
    type?: boolean
    content?: boolean
    subject?: boolean
    attachment?: boolean
    sentiment?: boolean
    date?: boolean
    followUp?: boolean
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "type" | "content" | "subject" | "attachment" | "sentiment" | "date" | "followUp" | "hasFollowUp" | "followUpDone" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      type: $Enums.ConversationType
      content: string
      subject: string | null
      attachment: string | null
      sentiment: string | null
      date: Date
      followUp: Date | null
      hasFollowUp: boolean
      followUpDone: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * @param {ConversationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const conversation = await prisma.conversation.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ConversationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Conversation.
     * @param {ConversationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const conversation = await prisma.conversation.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ConversationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly leadId: FieldRef<"Conversation", 'String'>
    readonly type: FieldRef<"Conversation", 'ConversationType'>
    readonly content: FieldRef<"Conversation", 'String'>
    readonly subject: FieldRef<"Conversation", 'String'>
    readonly attachment: FieldRef<"Conversation", 'String'>
    readonly sentiment: FieldRef<"Conversation", 'String'>
    readonly date: FieldRef<"Conversation", 'DateTime'>
    readonly followUp: FieldRef<"Conversation", 'DateTime'>
    readonly hasFollowUp: FieldRef<"Conversation", 'Boolean'>
    readonly followUpDone: FieldRef<"Conversation", 'Boolean'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation findRaw
   */
  export type ConversationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Conversation aggregateRaw
   */
  export type ConversationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model AiSuggestion
   */

  export type AggregateAiSuggestion = {
    _count: AiSuggestionCountAggregateOutputType | null
    _avg: AiSuggestionAvgAggregateOutputType | null
    _sum: AiSuggestionSumAggregateOutputType | null
    _min: AiSuggestionMinAggregateOutputType | null
    _max: AiSuggestionMaxAggregateOutputType | null
  }

  export type AiSuggestionAvgAggregateOutputType = {
    priority: number | null
  }

  export type AiSuggestionSumAggregateOutputType = {
    priority: number | null
  }

  export type AiSuggestionMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    suggestion: string | null
    type: string | null
    status: $Enums.SuggestionStatus | null
    priority: number | null
    done: boolean | null
    isViewed: boolean | null
    reasoning: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiSuggestionMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    suggestion: string | null
    type: string | null
    status: $Enums.SuggestionStatus | null
    priority: number | null
    done: boolean | null
    isViewed: boolean | null
    reasoning: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiSuggestionCountAggregateOutputType = {
    id: number
    leadId: number
    suggestion: number
    type: number
    status: number
    priority: number
    done: number
    isViewed: number
    reasoning: number
    templateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiSuggestionAvgAggregateInputType = {
    priority?: true
  }

  export type AiSuggestionSumAggregateInputType = {
    priority?: true
  }

  export type AiSuggestionMinAggregateInputType = {
    id?: true
    leadId?: true
    suggestion?: true
    type?: true
    status?: true
    priority?: true
    done?: true
    isViewed?: true
    reasoning?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiSuggestionMaxAggregateInputType = {
    id?: true
    leadId?: true
    suggestion?: true
    type?: true
    status?: true
    priority?: true
    done?: true
    isViewed?: true
    reasoning?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiSuggestionCountAggregateInputType = {
    id?: true
    leadId?: true
    suggestion?: true
    type?: true
    status?: true
    priority?: true
    done?: true
    isViewed?: true
    reasoning?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiSuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiSuggestion to aggregate.
     */
    where?: AiSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSuggestions to fetch.
     */
    orderBy?: AiSuggestionOrderByWithRelationInput | AiSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiSuggestions
    **/
    _count?: true | AiSuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiSuggestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiSuggestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiSuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiSuggestionMaxAggregateInputType
  }

  export type GetAiSuggestionAggregateType<T extends AiSuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregateAiSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiSuggestion[P]>
      : GetScalarType<T[P], AggregateAiSuggestion[P]>
  }




  export type AiSuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiSuggestionWhereInput
    orderBy?: AiSuggestionOrderByWithAggregationInput | AiSuggestionOrderByWithAggregationInput[]
    by: AiSuggestionScalarFieldEnum[] | AiSuggestionScalarFieldEnum
    having?: AiSuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiSuggestionCountAggregateInputType | true
    _avg?: AiSuggestionAvgAggregateInputType
    _sum?: AiSuggestionSumAggregateInputType
    _min?: AiSuggestionMinAggregateInputType
    _max?: AiSuggestionMaxAggregateInputType
  }

  export type AiSuggestionGroupByOutputType = {
    id: string
    leadId: string
    suggestion: string
    type: string
    status: $Enums.SuggestionStatus
    priority: number
    done: boolean
    isViewed: boolean
    reasoning: string | null
    templateId: string | null
    createdAt: Date
    updatedAt: Date
    _count: AiSuggestionCountAggregateOutputType | null
    _avg: AiSuggestionAvgAggregateOutputType | null
    _sum: AiSuggestionSumAggregateOutputType | null
    _min: AiSuggestionMinAggregateOutputType | null
    _max: AiSuggestionMaxAggregateOutputType | null
  }

  type GetAiSuggestionGroupByPayload<T extends AiSuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiSuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiSuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiSuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], AiSuggestionGroupByOutputType[P]>
        }
      >
    >


  export type AiSuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    suggestion?: boolean
    type?: boolean
    status?: boolean
    priority?: boolean
    done?: boolean
    isViewed?: boolean
    reasoning?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    template?: boolean | AiSuggestion$templateArgs<ExtArgs>
  }, ExtArgs["result"]["aiSuggestion"]>



  export type AiSuggestionSelectScalar = {
    id?: boolean
    leadId?: boolean
    suggestion?: boolean
    type?: boolean
    status?: boolean
    priority?: boolean
    done?: boolean
    isViewed?: boolean
    reasoning?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiSuggestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "suggestion" | "type" | "status" | "priority" | "done" | "isViewed" | "reasoning" | "templateId" | "createdAt" | "updatedAt", ExtArgs["result"]["aiSuggestion"]>
  export type AiSuggestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    template?: boolean | AiSuggestion$templateArgs<ExtArgs>
  }

  export type $AiSuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiSuggestion"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
      template: Prisma.$MessageTemplatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      suggestion: string
      type: string
      status: $Enums.SuggestionStatus
      priority: number
      done: boolean
      isViewed: boolean
      reasoning: string | null
      templateId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiSuggestion"]>
    composites: {}
  }

  type AiSuggestionGetPayload<S extends boolean | null | undefined | AiSuggestionDefaultArgs> = $Result.GetResult<Prisma.$AiSuggestionPayload, S>

  type AiSuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiSuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiSuggestionCountAggregateInputType | true
    }

  export interface AiSuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiSuggestion'], meta: { name: 'AiSuggestion' } }
    /**
     * Find zero or one AiSuggestion that matches the filter.
     * @param {AiSuggestionFindUniqueArgs} args - Arguments to find a AiSuggestion
     * @example
     * // Get one AiSuggestion
     * const aiSuggestion = await prisma.aiSuggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiSuggestionFindUniqueArgs>(args: SelectSubset<T, AiSuggestionFindUniqueArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiSuggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiSuggestionFindUniqueOrThrowArgs} args - Arguments to find a AiSuggestion
     * @example
     * // Get one AiSuggestion
     * const aiSuggestion = await prisma.aiSuggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiSuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, AiSuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiSuggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionFindFirstArgs} args - Arguments to find a AiSuggestion
     * @example
     * // Get one AiSuggestion
     * const aiSuggestion = await prisma.aiSuggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiSuggestionFindFirstArgs>(args?: SelectSubset<T, AiSuggestionFindFirstArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiSuggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionFindFirstOrThrowArgs} args - Arguments to find a AiSuggestion
     * @example
     * // Get one AiSuggestion
     * const aiSuggestion = await prisma.aiSuggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiSuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, AiSuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiSuggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiSuggestions
     * const aiSuggestions = await prisma.aiSuggestion.findMany()
     * 
     * // Get first 10 AiSuggestions
     * const aiSuggestions = await prisma.aiSuggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiSuggestionWithIdOnly = await prisma.aiSuggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiSuggestionFindManyArgs>(args?: SelectSubset<T, AiSuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiSuggestion.
     * @param {AiSuggestionCreateArgs} args - Arguments to create a AiSuggestion.
     * @example
     * // Create one AiSuggestion
     * const AiSuggestion = await prisma.aiSuggestion.create({
     *   data: {
     *     // ... data to create a AiSuggestion
     *   }
     * })
     * 
     */
    create<T extends AiSuggestionCreateArgs>(args: SelectSubset<T, AiSuggestionCreateArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiSuggestions.
     * @param {AiSuggestionCreateManyArgs} args - Arguments to create many AiSuggestions.
     * @example
     * // Create many AiSuggestions
     * const aiSuggestion = await prisma.aiSuggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiSuggestionCreateManyArgs>(args?: SelectSubset<T, AiSuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AiSuggestion.
     * @param {AiSuggestionDeleteArgs} args - Arguments to delete one AiSuggestion.
     * @example
     * // Delete one AiSuggestion
     * const AiSuggestion = await prisma.aiSuggestion.delete({
     *   where: {
     *     // ... filter to delete one AiSuggestion
     *   }
     * })
     * 
     */
    delete<T extends AiSuggestionDeleteArgs>(args: SelectSubset<T, AiSuggestionDeleteArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiSuggestion.
     * @param {AiSuggestionUpdateArgs} args - Arguments to update one AiSuggestion.
     * @example
     * // Update one AiSuggestion
     * const aiSuggestion = await prisma.aiSuggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiSuggestionUpdateArgs>(args: SelectSubset<T, AiSuggestionUpdateArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiSuggestions.
     * @param {AiSuggestionDeleteManyArgs} args - Arguments to filter AiSuggestions to delete.
     * @example
     * // Delete a few AiSuggestions
     * const { count } = await prisma.aiSuggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiSuggestionDeleteManyArgs>(args?: SelectSubset<T, AiSuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiSuggestions
     * const aiSuggestion = await prisma.aiSuggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiSuggestionUpdateManyArgs>(args: SelectSubset<T, AiSuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiSuggestion.
     * @param {AiSuggestionUpsertArgs} args - Arguments to update or create a AiSuggestion.
     * @example
     * // Update or create a AiSuggestion
     * const aiSuggestion = await prisma.aiSuggestion.upsert({
     *   create: {
     *     // ... data to create a AiSuggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiSuggestion we want to update
     *   }
     * })
     */
    upsert<T extends AiSuggestionUpsertArgs>(args: SelectSubset<T, AiSuggestionUpsertArgs<ExtArgs>>): Prisma__AiSuggestionClient<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiSuggestions that matches the filter.
     * @param {AiSuggestionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const aiSuggestion = await prisma.aiSuggestion.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AiSuggestionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a AiSuggestion.
     * @param {AiSuggestionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const aiSuggestion = await prisma.aiSuggestion.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AiSuggestionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of AiSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionCountArgs} args - Arguments to filter AiSuggestions to count.
     * @example
     * // Count the number of AiSuggestions
     * const count = await prisma.aiSuggestion.count({
     *   where: {
     *     // ... the filter for the AiSuggestions we want to count
     *   }
     * })
    **/
    count<T extends AiSuggestionCountArgs>(
      args?: Subset<T, AiSuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiSuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiSuggestionAggregateArgs>(args: Subset<T, AiSuggestionAggregateArgs>): Prisma.PrismaPromise<GetAiSuggestionAggregateType<T>>

    /**
     * Group by AiSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSuggestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiSuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiSuggestionGroupByArgs['orderBy'] }
        : { orderBy?: AiSuggestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiSuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiSuggestion model
   */
  readonly fields: AiSuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiSuggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiSuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    template<T extends AiSuggestion$templateArgs<ExtArgs> = {}>(args?: Subset<T, AiSuggestion$templateArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiSuggestion model
   */
  interface AiSuggestionFieldRefs {
    readonly id: FieldRef<"AiSuggestion", 'String'>
    readonly leadId: FieldRef<"AiSuggestion", 'String'>
    readonly suggestion: FieldRef<"AiSuggestion", 'String'>
    readonly type: FieldRef<"AiSuggestion", 'String'>
    readonly status: FieldRef<"AiSuggestion", 'SuggestionStatus'>
    readonly priority: FieldRef<"AiSuggestion", 'Int'>
    readonly done: FieldRef<"AiSuggestion", 'Boolean'>
    readonly isViewed: FieldRef<"AiSuggestion", 'Boolean'>
    readonly reasoning: FieldRef<"AiSuggestion", 'String'>
    readonly templateId: FieldRef<"AiSuggestion", 'String'>
    readonly createdAt: FieldRef<"AiSuggestion", 'DateTime'>
    readonly updatedAt: FieldRef<"AiSuggestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiSuggestion findUnique
   */
  export type AiSuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which AiSuggestion to fetch.
     */
    where: AiSuggestionWhereUniqueInput
  }

  /**
   * AiSuggestion findUniqueOrThrow
   */
  export type AiSuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which AiSuggestion to fetch.
     */
    where: AiSuggestionWhereUniqueInput
  }

  /**
   * AiSuggestion findFirst
   */
  export type AiSuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which AiSuggestion to fetch.
     */
    where?: AiSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSuggestions to fetch.
     */
    orderBy?: AiSuggestionOrderByWithRelationInput | AiSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiSuggestions.
     */
    cursor?: AiSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiSuggestions.
     */
    distinct?: AiSuggestionScalarFieldEnum | AiSuggestionScalarFieldEnum[]
  }

  /**
   * AiSuggestion findFirstOrThrow
   */
  export type AiSuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which AiSuggestion to fetch.
     */
    where?: AiSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSuggestions to fetch.
     */
    orderBy?: AiSuggestionOrderByWithRelationInput | AiSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiSuggestions.
     */
    cursor?: AiSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiSuggestions.
     */
    distinct?: AiSuggestionScalarFieldEnum | AiSuggestionScalarFieldEnum[]
  }

  /**
   * AiSuggestion findMany
   */
  export type AiSuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which AiSuggestions to fetch.
     */
    where?: AiSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSuggestions to fetch.
     */
    orderBy?: AiSuggestionOrderByWithRelationInput | AiSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiSuggestions.
     */
    cursor?: AiSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSuggestions.
     */
    skip?: number
    distinct?: AiSuggestionScalarFieldEnum | AiSuggestionScalarFieldEnum[]
  }

  /**
   * AiSuggestion create
   */
  export type AiSuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * The data needed to create a AiSuggestion.
     */
    data: XOR<AiSuggestionCreateInput, AiSuggestionUncheckedCreateInput>
  }

  /**
   * AiSuggestion createMany
   */
  export type AiSuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiSuggestions.
     */
    data: AiSuggestionCreateManyInput | AiSuggestionCreateManyInput[]
  }

  /**
   * AiSuggestion update
   */
  export type AiSuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * The data needed to update a AiSuggestion.
     */
    data: XOR<AiSuggestionUpdateInput, AiSuggestionUncheckedUpdateInput>
    /**
     * Choose, which AiSuggestion to update.
     */
    where: AiSuggestionWhereUniqueInput
  }

  /**
   * AiSuggestion updateMany
   */
  export type AiSuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiSuggestions.
     */
    data: XOR<AiSuggestionUpdateManyMutationInput, AiSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which AiSuggestions to update
     */
    where?: AiSuggestionWhereInput
    /**
     * Limit how many AiSuggestions to update.
     */
    limit?: number
  }

  /**
   * AiSuggestion upsert
   */
  export type AiSuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * The filter to search for the AiSuggestion to update in case it exists.
     */
    where: AiSuggestionWhereUniqueInput
    /**
     * In case the AiSuggestion found by the `where` argument doesn't exist, create a new AiSuggestion with this data.
     */
    create: XOR<AiSuggestionCreateInput, AiSuggestionUncheckedCreateInput>
    /**
     * In case the AiSuggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiSuggestionUpdateInput, AiSuggestionUncheckedUpdateInput>
  }

  /**
   * AiSuggestion delete
   */
  export type AiSuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    /**
     * Filter which AiSuggestion to delete.
     */
    where: AiSuggestionWhereUniqueInput
  }

  /**
   * AiSuggestion deleteMany
   */
  export type AiSuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiSuggestions to delete
     */
    where?: AiSuggestionWhereInput
    /**
     * Limit how many AiSuggestions to delete.
     */
    limit?: number
  }

  /**
   * AiSuggestion findRaw
   */
  export type AiSuggestionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AiSuggestion aggregateRaw
   */
  export type AiSuggestionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AiSuggestion.template
   */
  export type AiSuggestion$templateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    where?: MessageTemplateWhereInput
  }

  /**
   * AiSuggestion without action
   */
  export type AiSuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    userId: number
    stats: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    userId?: true
    stats?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    userId: string | null
    stats: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    userId?: boolean
    stats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    steps?: boolean | Campaign$stepsArgs<ExtArgs>
    leads?: boolean | Campaign$leadsArgs<ExtArgs>
    user?: boolean | Campaign$userArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>



  export type CampaignSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    userId?: boolean
    stats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "userId" | "stats" | "createdAt" | "updatedAt", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | Campaign$stepsArgs<ExtArgs>
    leads?: boolean | Campaign$leadsArgs<ExtArgs>
    user?: boolean | Campaign$userArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      steps: Prisma.$CampaignStepPayload<ExtArgs>[]
      leads: Prisma.$LeadPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      userId: string | null
      stats: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * @param {CampaignFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const campaign = await prisma.campaign.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CampaignFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Campaign.
     * @param {CampaignAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const campaign = await prisma.campaign.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CampaignAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends Campaign$stepsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leads<T extends Campaign$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends Campaign$userArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly description: FieldRef<"Campaign", 'String'>
    readonly isActive: FieldRef<"Campaign", 'Boolean'>
    readonly userId: FieldRef<"Campaign", 'String'>
    readonly stats: FieldRef<"Campaign", 'Json'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign findRaw
   */
  export type CampaignFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Campaign aggregateRaw
   */
  export type CampaignAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Campaign.steps
   */
  export type Campaign$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    where?: CampaignStepWhereInput
    orderBy?: CampaignStepOrderByWithRelationInput | CampaignStepOrderByWithRelationInput[]
    cursor?: CampaignStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignStepScalarFieldEnum | CampaignStepScalarFieldEnum[]
  }

  /**
   * Campaign.leads
   */
  export type Campaign$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Campaign.user
   */
  export type Campaign$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model CampaignStep
   */

  export type AggregateCampaignStep = {
    _count: CampaignStepCountAggregateOutputType | null
    _avg: CampaignStepAvgAggregateOutputType | null
    _sum: CampaignStepSumAggregateOutputType | null
    _min: CampaignStepMinAggregateOutputType | null
    _max: CampaignStepMaxAggregateOutputType | null
  }

  export type CampaignStepAvgAggregateOutputType = {
    waitDays: number | null
    order: number | null
  }

  export type CampaignStepSumAggregateOutputType = {
    waitDays: number | null
    order: number | null
  }

  export type CampaignStepMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    type: $Enums.StepType | null
    content: string | null
    templateId: string | null
    waitDays: number | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignStepMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    type: $Enums.StepType | null
    content: string | null
    templateId: string | null
    waitDays: number | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignStepCountAggregateOutputType = {
    id: number
    campaignId: number
    type: number
    content: number
    templateId: number
    waitDays: number
    order: number
    conditions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignStepAvgAggregateInputType = {
    waitDays?: true
    order?: true
  }

  export type CampaignStepSumAggregateInputType = {
    waitDays?: true
    order?: true
  }

  export type CampaignStepMinAggregateInputType = {
    id?: true
    campaignId?: true
    type?: true
    content?: true
    templateId?: true
    waitDays?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignStepMaxAggregateInputType = {
    id?: true
    campaignId?: true
    type?: true
    content?: true
    templateId?: true
    waitDays?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignStepCountAggregateInputType = {
    id?: true
    campaignId?: true
    type?: true
    content?: true
    templateId?: true
    waitDays?: true
    order?: true
    conditions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignStep to aggregate.
     */
    where?: CampaignStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSteps to fetch.
     */
    orderBy?: CampaignStepOrderByWithRelationInput | CampaignStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignSteps
    **/
    _count?: true | CampaignStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignStepMaxAggregateInputType
  }

  export type GetCampaignStepAggregateType<T extends CampaignStepAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignStep[P]>
      : GetScalarType<T[P], AggregateCampaignStep[P]>
  }




  export type CampaignStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignStepWhereInput
    orderBy?: CampaignStepOrderByWithAggregationInput | CampaignStepOrderByWithAggregationInput[]
    by: CampaignStepScalarFieldEnum[] | CampaignStepScalarFieldEnum
    having?: CampaignStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignStepCountAggregateInputType | true
    _avg?: CampaignStepAvgAggregateInputType
    _sum?: CampaignStepSumAggregateInputType
    _min?: CampaignStepMinAggregateInputType
    _max?: CampaignStepMaxAggregateInputType
  }

  export type CampaignStepGroupByOutputType = {
    id: string
    campaignId: string
    type: $Enums.StepType
    content: string | null
    templateId: string | null
    waitDays: number
    order: number
    conditions: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CampaignStepCountAggregateOutputType | null
    _avg: CampaignStepAvgAggregateOutputType | null
    _sum: CampaignStepSumAggregateOutputType | null
    _min: CampaignStepMinAggregateOutputType | null
    _max: CampaignStepMaxAggregateOutputType | null
  }

  type GetCampaignStepGroupByPayload<T extends CampaignStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignStepGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignStepGroupByOutputType[P]>
        }
      >
    >


  export type CampaignStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    type?: boolean
    content?: boolean
    templateId?: boolean
    waitDays?: boolean
    order?: boolean
    conditions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    template?: boolean | CampaignStep$templateArgs<ExtArgs>
  }, ExtArgs["result"]["campaignStep"]>



  export type CampaignStepSelectScalar = {
    id?: boolean
    campaignId?: boolean
    type?: boolean
    content?: boolean
    templateId?: boolean
    waitDays?: boolean
    order?: boolean
    conditions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "type" | "content" | "templateId" | "waitDays" | "order" | "conditions" | "createdAt" | "updatedAt", ExtArgs["result"]["campaignStep"]>
  export type CampaignStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    template?: boolean | CampaignStep$templateArgs<ExtArgs>
  }

  export type $CampaignStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignStep"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      template: Prisma.$MessageTemplatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      type: $Enums.StepType
      content: string | null
      templateId: string | null
      waitDays: number
      order: number
      conditions: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaignStep"]>
    composites: {}
  }

  type CampaignStepGetPayload<S extends boolean | null | undefined | CampaignStepDefaultArgs> = $Result.GetResult<Prisma.$CampaignStepPayload, S>

  type CampaignStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignStepCountAggregateInputType | true
    }

  export interface CampaignStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignStep'], meta: { name: 'CampaignStep' } }
    /**
     * Find zero or one CampaignStep that matches the filter.
     * @param {CampaignStepFindUniqueArgs} args - Arguments to find a CampaignStep
     * @example
     * // Get one CampaignStep
     * const campaignStep = await prisma.campaignStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignStepFindUniqueArgs>(args: SelectSubset<T, CampaignStepFindUniqueArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignStepFindUniqueOrThrowArgs} args - Arguments to find a CampaignStep
     * @example
     * // Get one CampaignStep
     * const campaignStep = await prisma.campaignStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignStepFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepFindFirstArgs} args - Arguments to find a CampaignStep
     * @example
     * // Get one CampaignStep
     * const campaignStep = await prisma.campaignStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignStepFindFirstArgs>(args?: SelectSubset<T, CampaignStepFindFirstArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepFindFirstOrThrowArgs} args - Arguments to find a CampaignStep
     * @example
     * // Get one CampaignStep
     * const campaignStep = await prisma.campaignStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignStepFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignSteps
     * const campaignSteps = await prisma.campaignStep.findMany()
     * 
     * // Get first 10 CampaignSteps
     * const campaignSteps = await prisma.campaignStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignStepWithIdOnly = await prisma.campaignStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignStepFindManyArgs>(args?: SelectSubset<T, CampaignStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignStep.
     * @param {CampaignStepCreateArgs} args - Arguments to create a CampaignStep.
     * @example
     * // Create one CampaignStep
     * const CampaignStep = await prisma.campaignStep.create({
     *   data: {
     *     // ... data to create a CampaignStep
     *   }
     * })
     * 
     */
    create<T extends CampaignStepCreateArgs>(args: SelectSubset<T, CampaignStepCreateArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignSteps.
     * @param {CampaignStepCreateManyArgs} args - Arguments to create many CampaignSteps.
     * @example
     * // Create many CampaignSteps
     * const campaignStep = await prisma.campaignStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignStepCreateManyArgs>(args?: SelectSubset<T, CampaignStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CampaignStep.
     * @param {CampaignStepDeleteArgs} args - Arguments to delete one CampaignStep.
     * @example
     * // Delete one CampaignStep
     * const CampaignStep = await prisma.campaignStep.delete({
     *   where: {
     *     // ... filter to delete one CampaignStep
     *   }
     * })
     * 
     */
    delete<T extends CampaignStepDeleteArgs>(args: SelectSubset<T, CampaignStepDeleteArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignStep.
     * @param {CampaignStepUpdateArgs} args - Arguments to update one CampaignStep.
     * @example
     * // Update one CampaignStep
     * const campaignStep = await prisma.campaignStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignStepUpdateArgs>(args: SelectSubset<T, CampaignStepUpdateArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignSteps.
     * @param {CampaignStepDeleteManyArgs} args - Arguments to filter CampaignSteps to delete.
     * @example
     * // Delete a few CampaignSteps
     * const { count } = await prisma.campaignStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignStepDeleteManyArgs>(args?: SelectSubset<T, CampaignStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignSteps
     * const campaignStep = await prisma.campaignStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignStepUpdateManyArgs>(args: SelectSubset<T, CampaignStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CampaignStep.
     * @param {CampaignStepUpsertArgs} args - Arguments to update or create a CampaignStep.
     * @example
     * // Update or create a CampaignStep
     * const campaignStep = await prisma.campaignStep.upsert({
     *   create: {
     *     // ... data to create a CampaignStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignStep we want to update
     *   }
     * })
     */
    upsert<T extends CampaignStepUpsertArgs>(args: SelectSubset<T, CampaignStepUpsertArgs<ExtArgs>>): Prisma__CampaignStepClient<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignSteps that matches the filter.
     * @param {CampaignStepFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const campaignStep = await prisma.campaignStep.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CampaignStepFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CampaignStep.
     * @param {CampaignStepAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const campaignStep = await prisma.campaignStep.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CampaignStepAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CampaignSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepCountArgs} args - Arguments to filter CampaignSteps to count.
     * @example
     * // Count the number of CampaignSteps
     * const count = await prisma.campaignStep.count({
     *   where: {
     *     // ... the filter for the CampaignSteps we want to count
     *   }
     * })
    **/
    count<T extends CampaignStepCountArgs>(
      args?: Subset<T, CampaignStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignStepAggregateArgs>(args: Subset<T, CampaignStepAggregateArgs>): Prisma.PrismaPromise<GetCampaignStepAggregateType<T>>

    /**
     * Group by CampaignStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignStepGroupByArgs['orderBy'] }
        : { orderBy?: CampaignStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignStep model
   */
  readonly fields: CampaignStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    template<T extends CampaignStep$templateArgs<ExtArgs> = {}>(args?: Subset<T, CampaignStep$templateArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CampaignStep model
   */
  interface CampaignStepFieldRefs {
    readonly id: FieldRef<"CampaignStep", 'String'>
    readonly campaignId: FieldRef<"CampaignStep", 'String'>
    readonly type: FieldRef<"CampaignStep", 'StepType'>
    readonly content: FieldRef<"CampaignStep", 'String'>
    readonly templateId: FieldRef<"CampaignStep", 'String'>
    readonly waitDays: FieldRef<"CampaignStep", 'Int'>
    readonly order: FieldRef<"CampaignStep", 'Int'>
    readonly conditions: FieldRef<"CampaignStep", 'Json'>
    readonly createdAt: FieldRef<"CampaignStep", 'DateTime'>
    readonly updatedAt: FieldRef<"CampaignStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignStep findUnique
   */
  export type CampaignStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * Filter, which CampaignStep to fetch.
     */
    where: CampaignStepWhereUniqueInput
  }

  /**
   * CampaignStep findUniqueOrThrow
   */
  export type CampaignStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * Filter, which CampaignStep to fetch.
     */
    where: CampaignStepWhereUniqueInput
  }

  /**
   * CampaignStep findFirst
   */
  export type CampaignStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * Filter, which CampaignStep to fetch.
     */
    where?: CampaignStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSteps to fetch.
     */
    orderBy?: CampaignStepOrderByWithRelationInput | CampaignStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignSteps.
     */
    cursor?: CampaignStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignSteps.
     */
    distinct?: CampaignStepScalarFieldEnum | CampaignStepScalarFieldEnum[]
  }

  /**
   * CampaignStep findFirstOrThrow
   */
  export type CampaignStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * Filter, which CampaignStep to fetch.
     */
    where?: CampaignStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSteps to fetch.
     */
    orderBy?: CampaignStepOrderByWithRelationInput | CampaignStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignSteps.
     */
    cursor?: CampaignStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignSteps.
     */
    distinct?: CampaignStepScalarFieldEnum | CampaignStepScalarFieldEnum[]
  }

  /**
   * CampaignStep findMany
   */
  export type CampaignStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * Filter, which CampaignSteps to fetch.
     */
    where?: CampaignStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSteps to fetch.
     */
    orderBy?: CampaignStepOrderByWithRelationInput | CampaignStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignSteps.
     */
    cursor?: CampaignStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSteps.
     */
    skip?: number
    distinct?: CampaignStepScalarFieldEnum | CampaignStepScalarFieldEnum[]
  }

  /**
   * CampaignStep create
   */
  export type CampaignStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignStep.
     */
    data: XOR<CampaignStepCreateInput, CampaignStepUncheckedCreateInput>
  }

  /**
   * CampaignStep createMany
   */
  export type CampaignStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignSteps.
     */
    data: CampaignStepCreateManyInput | CampaignStepCreateManyInput[]
  }

  /**
   * CampaignStep update
   */
  export type CampaignStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignStep.
     */
    data: XOR<CampaignStepUpdateInput, CampaignStepUncheckedUpdateInput>
    /**
     * Choose, which CampaignStep to update.
     */
    where: CampaignStepWhereUniqueInput
  }

  /**
   * CampaignStep updateMany
   */
  export type CampaignStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignSteps.
     */
    data: XOR<CampaignStepUpdateManyMutationInput, CampaignStepUncheckedUpdateManyInput>
    /**
     * Filter which CampaignSteps to update
     */
    where?: CampaignStepWhereInput
    /**
     * Limit how many CampaignSteps to update.
     */
    limit?: number
  }

  /**
   * CampaignStep upsert
   */
  export type CampaignStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignStep to update in case it exists.
     */
    where: CampaignStepWhereUniqueInput
    /**
     * In case the CampaignStep found by the `where` argument doesn't exist, create a new CampaignStep with this data.
     */
    create: XOR<CampaignStepCreateInput, CampaignStepUncheckedCreateInput>
    /**
     * In case the CampaignStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignStepUpdateInput, CampaignStepUncheckedUpdateInput>
  }

  /**
   * CampaignStep delete
   */
  export type CampaignStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    /**
     * Filter which CampaignStep to delete.
     */
    where: CampaignStepWhereUniqueInput
  }

  /**
   * CampaignStep deleteMany
   */
  export type CampaignStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignSteps to delete
     */
    where?: CampaignStepWhereInput
    /**
     * Limit how many CampaignSteps to delete.
     */
    limit?: number
  }

  /**
   * CampaignStep findRaw
   */
  export type CampaignStepFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CampaignStep aggregateRaw
   */
  export type CampaignStepAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CampaignStep.template
   */
  export type CampaignStep$templateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    where?: MessageTemplateWhereInput
  }

  /**
   * CampaignStep without action
   */
  export type CampaignStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
  }


  /**
   * Model MessageTemplate
   */

  export type AggregateMessageTemplate = {
    _count: MessageTemplateCountAggregateOutputType | null
    _min: MessageTemplateMinAggregateOutputType | null
    _max: MessageTemplateMaxAggregateOutputType | null
  }

  export type MessageTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    subject: string | null
    type: $Enums.TemplateType | null
    userId: string | null
    aiGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    subject: string | null
    type: $Enums.TemplateType | null
    userId: string | null
    aiGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageTemplateCountAggregateOutputType = {
    id: number
    name: number
    content: number
    subject: number
    type: number
    tags: number
    userId: number
    aiGenerated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageTemplateMinAggregateInputType = {
    id?: true
    name?: true
    content?: true
    subject?: true
    type?: true
    userId?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    content?: true
    subject?: true
    type?: true
    userId?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageTemplateCountAggregateInputType = {
    id?: true
    name?: true
    content?: true
    subject?: true
    type?: true
    tags?: true
    userId?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageTemplate to aggregate.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageTemplates
    **/
    _count?: true | MessageTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageTemplateMaxAggregateInputType
  }

  export type GetMessageTemplateAggregateType<T extends MessageTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageTemplate[P]>
      : GetScalarType<T[P], AggregateMessageTemplate[P]>
  }




  export type MessageTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageTemplateWhereInput
    orderBy?: MessageTemplateOrderByWithAggregationInput | MessageTemplateOrderByWithAggregationInput[]
    by: MessageTemplateScalarFieldEnum[] | MessageTemplateScalarFieldEnum
    having?: MessageTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageTemplateCountAggregateInputType | true
    _min?: MessageTemplateMinAggregateInputType
    _max?: MessageTemplateMaxAggregateInputType
  }

  export type MessageTemplateGroupByOutputType = {
    id: string
    name: string
    content: string
    subject: string | null
    type: $Enums.TemplateType
    tags: string[]
    userId: string | null
    aiGenerated: boolean
    createdAt: Date
    updatedAt: Date
    _count: MessageTemplateCountAggregateOutputType | null
    _min: MessageTemplateMinAggregateOutputType | null
    _max: MessageTemplateMaxAggregateOutputType | null
  }

  type GetMessageTemplateGroupByPayload<T extends MessageTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], MessageTemplateGroupByOutputType[P]>
        }
      >
    >


  export type MessageTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    subject?: boolean
    type?: boolean
    tags?: boolean
    userId?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | MessageTemplate$userArgs<ExtArgs>
    suggestions?: boolean | MessageTemplate$suggestionsArgs<ExtArgs>
    campaignSteps?: boolean | MessageTemplate$campaignStepsArgs<ExtArgs>
    _count?: boolean | MessageTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageTemplate"]>



  export type MessageTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    content?: boolean
    subject?: boolean
    type?: boolean
    tags?: boolean
    userId?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "content" | "subject" | "type" | "tags" | "userId" | "aiGenerated" | "createdAt" | "updatedAt", ExtArgs["result"]["messageTemplate"]>
  export type MessageTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MessageTemplate$userArgs<ExtArgs>
    suggestions?: boolean | MessageTemplate$suggestionsArgs<ExtArgs>
    campaignSteps?: boolean | MessageTemplate$campaignStepsArgs<ExtArgs>
    _count?: boolean | MessageTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MessageTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageTemplate"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      suggestions: Prisma.$AiSuggestionPayload<ExtArgs>[]
      campaignSteps: Prisma.$CampaignStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      content: string
      subject: string | null
      type: $Enums.TemplateType
      tags: string[]
      userId: string | null
      aiGenerated: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["messageTemplate"]>
    composites: {}
  }

  type MessageTemplateGetPayload<S extends boolean | null | undefined | MessageTemplateDefaultArgs> = $Result.GetResult<Prisma.$MessageTemplatePayload, S>

  type MessageTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageTemplateCountAggregateInputType | true
    }

  export interface MessageTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageTemplate'], meta: { name: 'MessageTemplate' } }
    /**
     * Find zero or one MessageTemplate that matches the filter.
     * @param {MessageTemplateFindUniqueArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageTemplateFindUniqueArgs>(args: SelectSubset<T, MessageTemplateFindUniqueArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageTemplateFindUniqueOrThrowArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateFindFirstArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageTemplateFindFirstArgs>(args?: SelectSubset<T, MessageTemplateFindFirstArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateFindFirstOrThrowArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageTemplates
     * const messageTemplates = await prisma.messageTemplate.findMany()
     * 
     * // Get first 10 MessageTemplates
     * const messageTemplates = await prisma.messageTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageTemplateWithIdOnly = await prisma.messageTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageTemplateFindManyArgs>(args?: SelectSubset<T, MessageTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageTemplate.
     * @param {MessageTemplateCreateArgs} args - Arguments to create a MessageTemplate.
     * @example
     * // Create one MessageTemplate
     * const MessageTemplate = await prisma.messageTemplate.create({
     *   data: {
     *     // ... data to create a MessageTemplate
     *   }
     * })
     * 
     */
    create<T extends MessageTemplateCreateArgs>(args: SelectSubset<T, MessageTemplateCreateArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageTemplates.
     * @param {MessageTemplateCreateManyArgs} args - Arguments to create many MessageTemplates.
     * @example
     * // Create many MessageTemplates
     * const messageTemplate = await prisma.messageTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageTemplateCreateManyArgs>(args?: SelectSubset<T, MessageTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MessageTemplate.
     * @param {MessageTemplateDeleteArgs} args - Arguments to delete one MessageTemplate.
     * @example
     * // Delete one MessageTemplate
     * const MessageTemplate = await prisma.messageTemplate.delete({
     *   where: {
     *     // ... filter to delete one MessageTemplate
     *   }
     * })
     * 
     */
    delete<T extends MessageTemplateDeleteArgs>(args: SelectSubset<T, MessageTemplateDeleteArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageTemplate.
     * @param {MessageTemplateUpdateArgs} args - Arguments to update one MessageTemplate.
     * @example
     * // Update one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageTemplateUpdateArgs>(args: SelectSubset<T, MessageTemplateUpdateArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageTemplates.
     * @param {MessageTemplateDeleteManyArgs} args - Arguments to filter MessageTemplates to delete.
     * @example
     * // Delete a few MessageTemplates
     * const { count } = await prisma.messageTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageTemplateDeleteManyArgs>(args?: SelectSubset<T, MessageTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageTemplates
     * const messageTemplate = await prisma.messageTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageTemplateUpdateManyArgs>(args: SelectSubset<T, MessageTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageTemplate.
     * @param {MessageTemplateUpsertArgs} args - Arguments to update or create a MessageTemplate.
     * @example
     * // Update or create a MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.upsert({
     *   create: {
     *     // ... data to create a MessageTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageTemplate we want to update
     *   }
     * })
     */
    upsert<T extends MessageTemplateUpsertArgs>(args: SelectSubset<T, MessageTemplateUpsertArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageTemplates that matches the filter.
     * @param {MessageTemplateFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const messageTemplate = await prisma.messageTemplate.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageTemplateFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MessageTemplate.
     * @param {MessageTemplateAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const messageTemplate = await prisma.messageTemplate.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageTemplateAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MessageTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateCountArgs} args - Arguments to filter MessageTemplates to count.
     * @example
     * // Count the number of MessageTemplates
     * const count = await prisma.messageTemplate.count({
     *   where: {
     *     // ... the filter for the MessageTemplates we want to count
     *   }
     * })
    **/
    count<T extends MessageTemplateCountArgs>(
      args?: Subset<T, MessageTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageTemplateAggregateArgs>(args: Subset<T, MessageTemplateAggregateArgs>): Prisma.PrismaPromise<GetMessageTemplateAggregateType<T>>

    /**
     * Group by MessageTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageTemplateGroupByArgs['orderBy'] }
        : { orderBy?: MessageTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageTemplate model
   */
  readonly fields: MessageTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends MessageTemplate$userArgs<ExtArgs> = {}>(args?: Subset<T, MessageTemplate$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    suggestions<T extends MessageTemplate$suggestionsArgs<ExtArgs> = {}>(args?: Subset<T, MessageTemplate$suggestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaignSteps<T extends MessageTemplate$campaignStepsArgs<ExtArgs> = {}>(args?: Subset<T, MessageTemplate$campaignStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageTemplate model
   */
  interface MessageTemplateFieldRefs {
    readonly id: FieldRef<"MessageTemplate", 'String'>
    readonly name: FieldRef<"MessageTemplate", 'String'>
    readonly content: FieldRef<"MessageTemplate", 'String'>
    readonly subject: FieldRef<"MessageTemplate", 'String'>
    readonly type: FieldRef<"MessageTemplate", 'TemplateType'>
    readonly tags: FieldRef<"MessageTemplate", 'String[]'>
    readonly userId: FieldRef<"MessageTemplate", 'String'>
    readonly aiGenerated: FieldRef<"MessageTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"MessageTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"MessageTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageTemplate findUnique
   */
  export type MessageTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate findUniqueOrThrow
   */
  export type MessageTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate findFirst
   */
  export type MessageTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageTemplates.
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageTemplates.
     */
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * MessageTemplate findFirstOrThrow
   */
  export type MessageTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageTemplates.
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageTemplates.
     */
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * MessageTemplate findMany
   */
  export type MessageTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplates to fetch.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageTemplates.
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * MessageTemplate create
   */
  export type MessageTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageTemplate.
     */
    data: XOR<MessageTemplateCreateInput, MessageTemplateUncheckedCreateInput>
  }

  /**
   * MessageTemplate createMany
   */
  export type MessageTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageTemplates.
     */
    data: MessageTemplateCreateManyInput | MessageTemplateCreateManyInput[]
  }

  /**
   * MessageTemplate update
   */
  export type MessageTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageTemplate.
     */
    data: XOR<MessageTemplateUpdateInput, MessageTemplateUncheckedUpdateInput>
    /**
     * Choose, which MessageTemplate to update.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate updateMany
   */
  export type MessageTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageTemplates.
     */
    data: XOR<MessageTemplateUpdateManyMutationInput, MessageTemplateUncheckedUpdateManyInput>
    /**
     * Filter which MessageTemplates to update
     */
    where?: MessageTemplateWhereInput
    /**
     * Limit how many MessageTemplates to update.
     */
    limit?: number
  }

  /**
   * MessageTemplate upsert
   */
  export type MessageTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageTemplate to update in case it exists.
     */
    where: MessageTemplateWhereUniqueInput
    /**
     * In case the MessageTemplate found by the `where` argument doesn't exist, create a new MessageTemplate with this data.
     */
    create: XOR<MessageTemplateCreateInput, MessageTemplateUncheckedCreateInput>
    /**
     * In case the MessageTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageTemplateUpdateInput, MessageTemplateUncheckedUpdateInput>
  }

  /**
   * MessageTemplate delete
   */
  export type MessageTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter which MessageTemplate to delete.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate deleteMany
   */
  export type MessageTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageTemplates to delete
     */
    where?: MessageTemplateWhereInput
    /**
     * Limit how many MessageTemplates to delete.
     */
    limit?: number
  }

  /**
   * MessageTemplate findRaw
   */
  export type MessageTemplateFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageTemplate aggregateRaw
   */
  export type MessageTemplateAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageTemplate.user
   */
  export type MessageTemplate$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * MessageTemplate.suggestions
   */
  export type MessageTemplate$suggestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSuggestion
     */
    select?: AiSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiSuggestion
     */
    omit?: AiSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSuggestionInclude<ExtArgs> | null
    where?: AiSuggestionWhereInput
    orderBy?: AiSuggestionOrderByWithRelationInput | AiSuggestionOrderByWithRelationInput[]
    cursor?: AiSuggestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiSuggestionScalarFieldEnum | AiSuggestionScalarFieldEnum[]
  }

  /**
   * MessageTemplate.campaignSteps
   */
  export type MessageTemplate$campaignStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignStep
     */
    select?: CampaignStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignStep
     */
    omit?: CampaignStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignStepInclude<ExtArgs> | null
    where?: CampaignStepWhereInput
    orderBy?: CampaignStepOrderByWithRelationInput | CampaignStepOrderByWithRelationInput[]
    cursor?: CampaignStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignStepScalarFieldEnum | CampaignStepScalarFieldEnum[]
  }

  /**
   * MessageTemplate without action
   */
  export type MessageTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
  }


  /**
   * Model DashboardMetric
   */

  export type AggregateDashboardMetric = {
    _count: DashboardMetricCountAggregateOutputType | null
    _min: DashboardMetricMinAggregateOutputType | null
    _max: DashboardMetricMaxAggregateOutputType | null
  }

  export type DashboardMetricMinAggregateOutputType = {
    id: string | null
    name: string | null
    periodStart: Date | null
    periodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DashboardMetricMaxAggregateOutputType = {
    id: string | null
    name: string | null
    periodStart: Date | null
    periodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DashboardMetricCountAggregateOutputType = {
    id: number
    name: number
    value: number
    periodStart: number
    periodEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DashboardMetricMinAggregateInputType = {
    id?: true
    name?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DashboardMetricMaxAggregateInputType = {
    id?: true
    name?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DashboardMetricCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DashboardMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardMetric to aggregate.
     */
    where?: DashboardMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardMetrics to fetch.
     */
    orderBy?: DashboardMetricOrderByWithRelationInput | DashboardMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DashboardMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DashboardMetrics
    **/
    _count?: true | DashboardMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DashboardMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DashboardMetricMaxAggregateInputType
  }

  export type GetDashboardMetricAggregateType<T extends DashboardMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateDashboardMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDashboardMetric[P]>
      : GetScalarType<T[P], AggregateDashboardMetric[P]>
  }




  export type DashboardMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardMetricWhereInput
    orderBy?: DashboardMetricOrderByWithAggregationInput | DashboardMetricOrderByWithAggregationInput[]
    by: DashboardMetricScalarFieldEnum[] | DashboardMetricScalarFieldEnum
    having?: DashboardMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DashboardMetricCountAggregateInputType | true
    _min?: DashboardMetricMinAggregateInputType
    _max?: DashboardMetricMaxAggregateInputType
  }

  export type DashboardMetricGroupByOutputType = {
    id: string
    name: string
    value: JsonValue
    periodStart: Date
    periodEnd: Date
    createdAt: Date
    updatedAt: Date
    _count: DashboardMetricCountAggregateOutputType | null
    _min: DashboardMetricMinAggregateOutputType | null
    _max: DashboardMetricMaxAggregateOutputType | null
  }

  type GetDashboardMetricGroupByPayload<T extends DashboardMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DashboardMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DashboardMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DashboardMetricGroupByOutputType[P]>
            : GetScalarType<T[P], DashboardMetricGroupByOutputType[P]>
        }
      >
    >


  export type DashboardMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dashboardMetric"]>



  export type DashboardMetricSelectScalar = {
    id?: boolean
    name?: boolean
    value?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DashboardMetricOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "value" | "periodStart" | "periodEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["dashboardMetric"]>

  export type $DashboardMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DashboardMetric"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      value: Prisma.JsonValue
      periodStart: Date
      periodEnd: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dashboardMetric"]>
    composites: {}
  }

  type DashboardMetricGetPayload<S extends boolean | null | undefined | DashboardMetricDefaultArgs> = $Result.GetResult<Prisma.$DashboardMetricPayload, S>

  type DashboardMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DashboardMetricFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DashboardMetricCountAggregateInputType | true
    }

  export interface DashboardMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DashboardMetric'], meta: { name: 'DashboardMetric' } }
    /**
     * Find zero or one DashboardMetric that matches the filter.
     * @param {DashboardMetricFindUniqueArgs} args - Arguments to find a DashboardMetric
     * @example
     * // Get one DashboardMetric
     * const dashboardMetric = await prisma.dashboardMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DashboardMetricFindUniqueArgs>(args: SelectSubset<T, DashboardMetricFindUniqueArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DashboardMetric that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DashboardMetricFindUniqueOrThrowArgs} args - Arguments to find a DashboardMetric
     * @example
     * // Get one DashboardMetric
     * const dashboardMetric = await prisma.dashboardMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DashboardMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, DashboardMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricFindFirstArgs} args - Arguments to find a DashboardMetric
     * @example
     * // Get one DashboardMetric
     * const dashboardMetric = await prisma.dashboardMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DashboardMetricFindFirstArgs>(args?: SelectSubset<T, DashboardMetricFindFirstArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricFindFirstOrThrowArgs} args - Arguments to find a DashboardMetric
     * @example
     * // Get one DashboardMetric
     * const dashboardMetric = await prisma.dashboardMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DashboardMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, DashboardMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DashboardMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DashboardMetrics
     * const dashboardMetrics = await prisma.dashboardMetric.findMany()
     * 
     * // Get first 10 DashboardMetrics
     * const dashboardMetrics = await prisma.dashboardMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dashboardMetricWithIdOnly = await prisma.dashboardMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DashboardMetricFindManyArgs>(args?: SelectSubset<T, DashboardMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DashboardMetric.
     * @param {DashboardMetricCreateArgs} args - Arguments to create a DashboardMetric.
     * @example
     * // Create one DashboardMetric
     * const DashboardMetric = await prisma.dashboardMetric.create({
     *   data: {
     *     // ... data to create a DashboardMetric
     *   }
     * })
     * 
     */
    create<T extends DashboardMetricCreateArgs>(args: SelectSubset<T, DashboardMetricCreateArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DashboardMetrics.
     * @param {DashboardMetricCreateManyArgs} args - Arguments to create many DashboardMetrics.
     * @example
     * // Create many DashboardMetrics
     * const dashboardMetric = await prisma.dashboardMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DashboardMetricCreateManyArgs>(args?: SelectSubset<T, DashboardMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DashboardMetric.
     * @param {DashboardMetricDeleteArgs} args - Arguments to delete one DashboardMetric.
     * @example
     * // Delete one DashboardMetric
     * const DashboardMetric = await prisma.dashboardMetric.delete({
     *   where: {
     *     // ... filter to delete one DashboardMetric
     *   }
     * })
     * 
     */
    delete<T extends DashboardMetricDeleteArgs>(args: SelectSubset<T, DashboardMetricDeleteArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DashboardMetric.
     * @param {DashboardMetricUpdateArgs} args - Arguments to update one DashboardMetric.
     * @example
     * // Update one DashboardMetric
     * const dashboardMetric = await prisma.dashboardMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DashboardMetricUpdateArgs>(args: SelectSubset<T, DashboardMetricUpdateArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DashboardMetrics.
     * @param {DashboardMetricDeleteManyArgs} args - Arguments to filter DashboardMetrics to delete.
     * @example
     * // Delete a few DashboardMetrics
     * const { count } = await prisma.dashboardMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DashboardMetricDeleteManyArgs>(args?: SelectSubset<T, DashboardMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DashboardMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DashboardMetrics
     * const dashboardMetric = await prisma.dashboardMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DashboardMetricUpdateManyArgs>(args: SelectSubset<T, DashboardMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DashboardMetric.
     * @param {DashboardMetricUpsertArgs} args - Arguments to update or create a DashboardMetric.
     * @example
     * // Update or create a DashboardMetric
     * const dashboardMetric = await prisma.dashboardMetric.upsert({
     *   create: {
     *     // ... data to create a DashboardMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DashboardMetric we want to update
     *   }
     * })
     */
    upsert<T extends DashboardMetricUpsertArgs>(args: SelectSubset<T, DashboardMetricUpsertArgs<ExtArgs>>): Prisma__DashboardMetricClient<$Result.GetResult<Prisma.$DashboardMetricPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DashboardMetrics that matches the filter.
     * @param {DashboardMetricFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const dashboardMetric = await prisma.dashboardMetric.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: DashboardMetricFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a DashboardMetric.
     * @param {DashboardMetricAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const dashboardMetric = await prisma.dashboardMetric.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: DashboardMetricAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of DashboardMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricCountArgs} args - Arguments to filter DashboardMetrics to count.
     * @example
     * // Count the number of DashboardMetrics
     * const count = await prisma.dashboardMetric.count({
     *   where: {
     *     // ... the filter for the DashboardMetrics we want to count
     *   }
     * })
    **/
    count<T extends DashboardMetricCountArgs>(
      args?: Subset<T, DashboardMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DashboardMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DashboardMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DashboardMetricAggregateArgs>(args: Subset<T, DashboardMetricAggregateArgs>): Prisma.PrismaPromise<GetDashboardMetricAggregateType<T>>

    /**
     * Group by DashboardMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardMetricGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DashboardMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DashboardMetricGroupByArgs['orderBy'] }
        : { orderBy?: DashboardMetricGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DashboardMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboardMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DashboardMetric model
   */
  readonly fields: DashboardMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DashboardMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DashboardMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DashboardMetric model
   */
  interface DashboardMetricFieldRefs {
    readonly id: FieldRef<"DashboardMetric", 'String'>
    readonly name: FieldRef<"DashboardMetric", 'String'>
    readonly value: FieldRef<"DashboardMetric", 'Json'>
    readonly periodStart: FieldRef<"DashboardMetric", 'DateTime'>
    readonly periodEnd: FieldRef<"DashboardMetric", 'DateTime'>
    readonly createdAt: FieldRef<"DashboardMetric", 'DateTime'>
    readonly updatedAt: FieldRef<"DashboardMetric", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DashboardMetric findUnique
   */
  export type DashboardMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * Filter, which DashboardMetric to fetch.
     */
    where: DashboardMetricWhereUniqueInput
  }

  /**
   * DashboardMetric findUniqueOrThrow
   */
  export type DashboardMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * Filter, which DashboardMetric to fetch.
     */
    where: DashboardMetricWhereUniqueInput
  }

  /**
   * DashboardMetric findFirst
   */
  export type DashboardMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * Filter, which DashboardMetric to fetch.
     */
    where?: DashboardMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardMetrics to fetch.
     */
    orderBy?: DashboardMetricOrderByWithRelationInput | DashboardMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardMetrics.
     */
    cursor?: DashboardMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardMetrics.
     */
    distinct?: DashboardMetricScalarFieldEnum | DashboardMetricScalarFieldEnum[]
  }

  /**
   * DashboardMetric findFirstOrThrow
   */
  export type DashboardMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * Filter, which DashboardMetric to fetch.
     */
    where?: DashboardMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardMetrics to fetch.
     */
    orderBy?: DashboardMetricOrderByWithRelationInput | DashboardMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardMetrics.
     */
    cursor?: DashboardMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardMetrics.
     */
    distinct?: DashboardMetricScalarFieldEnum | DashboardMetricScalarFieldEnum[]
  }

  /**
   * DashboardMetric findMany
   */
  export type DashboardMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * Filter, which DashboardMetrics to fetch.
     */
    where?: DashboardMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardMetrics to fetch.
     */
    orderBy?: DashboardMetricOrderByWithRelationInput | DashboardMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DashboardMetrics.
     */
    cursor?: DashboardMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardMetrics.
     */
    skip?: number
    distinct?: DashboardMetricScalarFieldEnum | DashboardMetricScalarFieldEnum[]
  }

  /**
   * DashboardMetric create
   */
  export type DashboardMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * The data needed to create a DashboardMetric.
     */
    data: XOR<DashboardMetricCreateInput, DashboardMetricUncheckedCreateInput>
  }

  /**
   * DashboardMetric createMany
   */
  export type DashboardMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DashboardMetrics.
     */
    data: DashboardMetricCreateManyInput | DashboardMetricCreateManyInput[]
  }

  /**
   * DashboardMetric update
   */
  export type DashboardMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * The data needed to update a DashboardMetric.
     */
    data: XOR<DashboardMetricUpdateInput, DashboardMetricUncheckedUpdateInput>
    /**
     * Choose, which DashboardMetric to update.
     */
    where: DashboardMetricWhereUniqueInput
  }

  /**
   * DashboardMetric updateMany
   */
  export type DashboardMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DashboardMetrics.
     */
    data: XOR<DashboardMetricUpdateManyMutationInput, DashboardMetricUncheckedUpdateManyInput>
    /**
     * Filter which DashboardMetrics to update
     */
    where?: DashboardMetricWhereInput
    /**
     * Limit how many DashboardMetrics to update.
     */
    limit?: number
  }

  /**
   * DashboardMetric upsert
   */
  export type DashboardMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * The filter to search for the DashboardMetric to update in case it exists.
     */
    where: DashboardMetricWhereUniqueInput
    /**
     * In case the DashboardMetric found by the `where` argument doesn't exist, create a new DashboardMetric with this data.
     */
    create: XOR<DashboardMetricCreateInput, DashboardMetricUncheckedCreateInput>
    /**
     * In case the DashboardMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DashboardMetricUpdateInput, DashboardMetricUncheckedUpdateInput>
  }

  /**
   * DashboardMetric delete
   */
  export type DashboardMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
    /**
     * Filter which DashboardMetric to delete.
     */
    where: DashboardMetricWhereUniqueInput
  }

  /**
   * DashboardMetric deleteMany
   */
  export type DashboardMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardMetrics to delete
     */
    where?: DashboardMetricWhereInput
    /**
     * Limit how many DashboardMetrics to delete.
     */
    limit?: number
  }

  /**
   * DashboardMetric findRaw
   */
  export type DashboardMetricFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * DashboardMetric aggregateRaw
   */
  export type DashboardMetricAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * DashboardMetric without action
   */
  export type DashboardMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardMetric
     */
    select?: DashboardMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardMetric
     */
    omit?: DashboardMetricOmit<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    priority: number | null
  }

  export type TaskSumAggregateOutputType = {
    priority: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    dueDate: Date | null
    priority: number | null
    status: $Enums.TaskStatus | null
    leadId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    dueDate: Date | null
    priority: number | null
    status: $Enums.TaskStatus | null
    leadId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    dueDate: number
    priority: number
    status: number
    leadId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    priority?: true
  }

  export type TaskSumAggregateInputType = {
    priority?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueDate?: true
    priority?: true
    status?: true
    leadId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueDate?: true
    priority?: true
    status?: true
    leadId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueDate?: true
    priority?: true
    status?: true
    leadId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string | null
    dueDate: Date | null
    priority: number
    status: $Enums.TaskStatus
    leadId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    priority?: boolean
    status?: boolean
    leadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | Task$leadArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>



  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    priority?: boolean
    status?: boolean
    leadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "dueDate" | "priority" | "status" | "leadId" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | Task$leadArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      dueDate: Date | null
      priority: number
      status: $Enums.TaskStatus
      leadId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * @param {TaskFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const task = await prisma.task.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TaskFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Task.
     * @param {TaskAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const task = await prisma.task.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TaskAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends Task$leadArgs<ExtArgs> = {}>(args?: Subset<T, Task$leadArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly priority: FieldRef<"Task", 'Int'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly leadId: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task findRaw
   */
  export type TaskFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Task aggregateRaw
   */
  export type TaskAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Task.lead
   */
  export type Task$leadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: $Enums.NotificationType | null
    isRead: boolean | null
    relatedId: string | null
    relatedType: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: $Enums.NotificationType | null
    isRead: boolean | null
    relatedId: string | null
    relatedType: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    isRead: number
    relatedId: number
    relatedType: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    relatedId?: true
    relatedType?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    relatedId?: true
    relatedType?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    relatedId?: true
    relatedType?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead: boolean
    relatedId: string | null
    relatedType: string | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    relatedId?: boolean
    relatedType?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>



  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    relatedId?: boolean
    relatedType?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "type" | "isRead" | "relatedId" | "relatedType" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: $Enums.NotificationType
      isRead: boolean
      relatedId: string | null
      relatedType: string | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * @param {NotificationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const notification = await prisma.notification.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NotificationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Notification.
     * @param {NotificationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const notification = await prisma.notification.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NotificationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly relatedId: FieldRef<"Notification", 'String'>
    readonly relatedType: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification findRaw
   */
  export type NotificationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification aggregateRaw
   */
  export type NotificationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model ExportJob
   */

  export type AggregateExportJob = {
    _count: ExportJobCountAggregateOutputType | null
    _min: ExportJobMinAggregateOutputType | null
    _max: ExportJobMaxAggregateOutputType | null
  }

  export type ExportJobMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.ExportType | null
    status: $Enums.JobStatus | null
    url: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type ExportJobMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.ExportType | null
    status: $Enums.JobStatus | null
    url: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type ExportJobCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    filters: number
    status: number
    url: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type ExportJobMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    url?: true
    createdAt?: true
    completedAt?: true
  }

  export type ExportJobMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    url?: true
    createdAt?: true
    completedAt?: true
  }

  export type ExportJobCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    filters?: true
    status?: true
    url?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type ExportJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExportJob to aggregate.
     */
    where?: ExportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportJobs to fetch.
     */
    orderBy?: ExportJobOrderByWithRelationInput | ExportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExportJobs
    **/
    _count?: true | ExportJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExportJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExportJobMaxAggregateInputType
  }

  export type GetExportJobAggregateType<T extends ExportJobAggregateArgs> = {
        [P in keyof T & keyof AggregateExportJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExportJob[P]>
      : GetScalarType<T[P], AggregateExportJob[P]>
  }




  export type ExportJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExportJobWhereInput
    orderBy?: ExportJobOrderByWithAggregationInput | ExportJobOrderByWithAggregationInput[]
    by: ExportJobScalarFieldEnum[] | ExportJobScalarFieldEnum
    having?: ExportJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExportJobCountAggregateInputType | true
    _min?: ExportJobMinAggregateInputType
    _max?: ExportJobMaxAggregateInputType
  }

  export type ExportJobGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.ExportType
    filters: JsonValue | null
    status: $Enums.JobStatus
    url: string | null
    createdAt: Date
    completedAt: Date | null
    _count: ExportJobCountAggregateOutputType | null
    _min: ExportJobMinAggregateOutputType | null
    _max: ExportJobMaxAggregateOutputType | null
  }

  type GetExportJobGroupByPayload<T extends ExportJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExportJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExportJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExportJobGroupByOutputType[P]>
            : GetScalarType<T[P], ExportJobGroupByOutputType[P]>
        }
      >
    >


  export type ExportJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    filters?: boolean
    status?: boolean
    url?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["exportJob"]>



  export type ExportJobSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    filters?: boolean
    status?: boolean
    url?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type ExportJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "filters" | "status" | "url" | "createdAt" | "completedAt", ExtArgs["result"]["exportJob"]>

  export type $ExportJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExportJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.ExportType
      filters: Prisma.JsonValue | null
      status: $Enums.JobStatus
      url: string | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["exportJob"]>
    composites: {}
  }

  type ExportJobGetPayload<S extends boolean | null | undefined | ExportJobDefaultArgs> = $Result.GetResult<Prisma.$ExportJobPayload, S>

  type ExportJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExportJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExportJobCountAggregateInputType | true
    }

  export interface ExportJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExportJob'], meta: { name: 'ExportJob' } }
    /**
     * Find zero or one ExportJob that matches the filter.
     * @param {ExportJobFindUniqueArgs} args - Arguments to find a ExportJob
     * @example
     * // Get one ExportJob
     * const exportJob = await prisma.exportJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExportJobFindUniqueArgs>(args: SelectSubset<T, ExportJobFindUniqueArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExportJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExportJobFindUniqueOrThrowArgs} args - Arguments to find a ExportJob
     * @example
     * // Get one ExportJob
     * const exportJob = await prisma.exportJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExportJobFindUniqueOrThrowArgs>(args: SelectSubset<T, ExportJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExportJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobFindFirstArgs} args - Arguments to find a ExportJob
     * @example
     * // Get one ExportJob
     * const exportJob = await prisma.exportJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExportJobFindFirstArgs>(args?: SelectSubset<T, ExportJobFindFirstArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExportJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobFindFirstOrThrowArgs} args - Arguments to find a ExportJob
     * @example
     * // Get one ExportJob
     * const exportJob = await prisma.exportJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExportJobFindFirstOrThrowArgs>(args?: SelectSubset<T, ExportJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExportJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExportJobs
     * const exportJobs = await prisma.exportJob.findMany()
     * 
     * // Get first 10 ExportJobs
     * const exportJobs = await prisma.exportJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exportJobWithIdOnly = await prisma.exportJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExportJobFindManyArgs>(args?: SelectSubset<T, ExportJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExportJob.
     * @param {ExportJobCreateArgs} args - Arguments to create a ExportJob.
     * @example
     * // Create one ExportJob
     * const ExportJob = await prisma.exportJob.create({
     *   data: {
     *     // ... data to create a ExportJob
     *   }
     * })
     * 
     */
    create<T extends ExportJobCreateArgs>(args: SelectSubset<T, ExportJobCreateArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExportJobs.
     * @param {ExportJobCreateManyArgs} args - Arguments to create many ExportJobs.
     * @example
     * // Create many ExportJobs
     * const exportJob = await prisma.exportJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExportJobCreateManyArgs>(args?: SelectSubset<T, ExportJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ExportJob.
     * @param {ExportJobDeleteArgs} args - Arguments to delete one ExportJob.
     * @example
     * // Delete one ExportJob
     * const ExportJob = await prisma.exportJob.delete({
     *   where: {
     *     // ... filter to delete one ExportJob
     *   }
     * })
     * 
     */
    delete<T extends ExportJobDeleteArgs>(args: SelectSubset<T, ExportJobDeleteArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExportJob.
     * @param {ExportJobUpdateArgs} args - Arguments to update one ExportJob.
     * @example
     * // Update one ExportJob
     * const exportJob = await prisma.exportJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExportJobUpdateArgs>(args: SelectSubset<T, ExportJobUpdateArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExportJobs.
     * @param {ExportJobDeleteManyArgs} args - Arguments to filter ExportJobs to delete.
     * @example
     * // Delete a few ExportJobs
     * const { count } = await prisma.exportJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExportJobDeleteManyArgs>(args?: SelectSubset<T, ExportJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExportJobs
     * const exportJob = await prisma.exportJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExportJobUpdateManyArgs>(args: SelectSubset<T, ExportJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExportJob.
     * @param {ExportJobUpsertArgs} args - Arguments to update or create a ExportJob.
     * @example
     * // Update or create a ExportJob
     * const exportJob = await prisma.exportJob.upsert({
     *   create: {
     *     // ... data to create a ExportJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExportJob we want to update
     *   }
     * })
     */
    upsert<T extends ExportJobUpsertArgs>(args: SelectSubset<T, ExportJobUpsertArgs<ExtArgs>>): Prisma__ExportJobClient<$Result.GetResult<Prisma.$ExportJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExportJobs that matches the filter.
     * @param {ExportJobFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const exportJob = await prisma.exportJob.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ExportJobFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ExportJob.
     * @param {ExportJobAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const exportJob = await prisma.exportJob.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ExportJobAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ExportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobCountArgs} args - Arguments to filter ExportJobs to count.
     * @example
     * // Count the number of ExportJobs
     * const count = await prisma.exportJob.count({
     *   where: {
     *     // ... the filter for the ExportJobs we want to count
     *   }
     * })
    **/
    count<T extends ExportJobCountArgs>(
      args?: Subset<T, ExportJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExportJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExportJobAggregateArgs>(args: Subset<T, ExportJobAggregateArgs>): Prisma.PrismaPromise<GetExportJobAggregateType<T>>

    /**
     * Group by ExportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExportJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExportJobGroupByArgs['orderBy'] }
        : { orderBy?: ExportJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExportJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExportJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExportJob model
   */
  readonly fields: ExportJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExportJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExportJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExportJob model
   */
  interface ExportJobFieldRefs {
    readonly id: FieldRef<"ExportJob", 'String'>
    readonly userId: FieldRef<"ExportJob", 'String'>
    readonly type: FieldRef<"ExportJob", 'ExportType'>
    readonly filters: FieldRef<"ExportJob", 'Json'>
    readonly status: FieldRef<"ExportJob", 'JobStatus'>
    readonly url: FieldRef<"ExportJob", 'String'>
    readonly createdAt: FieldRef<"ExportJob", 'DateTime'>
    readonly completedAt: FieldRef<"ExportJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExportJob findUnique
   */
  export type ExportJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * Filter, which ExportJob to fetch.
     */
    where: ExportJobWhereUniqueInput
  }

  /**
   * ExportJob findUniqueOrThrow
   */
  export type ExportJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * Filter, which ExportJob to fetch.
     */
    where: ExportJobWhereUniqueInput
  }

  /**
   * ExportJob findFirst
   */
  export type ExportJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * Filter, which ExportJob to fetch.
     */
    where?: ExportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportJobs to fetch.
     */
    orderBy?: ExportJobOrderByWithRelationInput | ExportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExportJobs.
     */
    cursor?: ExportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExportJobs.
     */
    distinct?: ExportJobScalarFieldEnum | ExportJobScalarFieldEnum[]
  }

  /**
   * ExportJob findFirstOrThrow
   */
  export type ExportJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * Filter, which ExportJob to fetch.
     */
    where?: ExportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportJobs to fetch.
     */
    orderBy?: ExportJobOrderByWithRelationInput | ExportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExportJobs.
     */
    cursor?: ExportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExportJobs.
     */
    distinct?: ExportJobScalarFieldEnum | ExportJobScalarFieldEnum[]
  }

  /**
   * ExportJob findMany
   */
  export type ExportJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * Filter, which ExportJobs to fetch.
     */
    where?: ExportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportJobs to fetch.
     */
    orderBy?: ExportJobOrderByWithRelationInput | ExportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExportJobs.
     */
    cursor?: ExportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportJobs.
     */
    skip?: number
    distinct?: ExportJobScalarFieldEnum | ExportJobScalarFieldEnum[]
  }

  /**
   * ExportJob create
   */
  export type ExportJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * The data needed to create a ExportJob.
     */
    data: XOR<ExportJobCreateInput, ExportJobUncheckedCreateInput>
  }

  /**
   * ExportJob createMany
   */
  export type ExportJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExportJobs.
     */
    data: ExportJobCreateManyInput | ExportJobCreateManyInput[]
  }

  /**
   * ExportJob update
   */
  export type ExportJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * The data needed to update a ExportJob.
     */
    data: XOR<ExportJobUpdateInput, ExportJobUncheckedUpdateInput>
    /**
     * Choose, which ExportJob to update.
     */
    where: ExportJobWhereUniqueInput
  }

  /**
   * ExportJob updateMany
   */
  export type ExportJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExportJobs.
     */
    data: XOR<ExportJobUpdateManyMutationInput, ExportJobUncheckedUpdateManyInput>
    /**
     * Filter which ExportJobs to update
     */
    where?: ExportJobWhereInput
    /**
     * Limit how many ExportJobs to update.
     */
    limit?: number
  }

  /**
   * ExportJob upsert
   */
  export type ExportJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * The filter to search for the ExportJob to update in case it exists.
     */
    where: ExportJobWhereUniqueInput
    /**
     * In case the ExportJob found by the `where` argument doesn't exist, create a new ExportJob with this data.
     */
    create: XOR<ExportJobCreateInput, ExportJobUncheckedCreateInput>
    /**
     * In case the ExportJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExportJobUpdateInput, ExportJobUncheckedUpdateInput>
  }

  /**
   * ExportJob delete
   */
  export type ExportJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
    /**
     * Filter which ExportJob to delete.
     */
    where: ExportJobWhereUniqueInput
  }

  /**
   * ExportJob deleteMany
   */
  export type ExportJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExportJobs to delete
     */
    where?: ExportJobWhereInput
    /**
     * Limit how many ExportJobs to delete.
     */
    limit?: number
  }

  /**
   * ExportJob findRaw
   */
  export type ExportJobFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ExportJob aggregateRaw
   */
  export type ExportJobAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ExportJob without action
   */
  export type ExportJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportJob
     */
    select?: ExportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportJob
     */
    omit?: ExportJobOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    preferences: 'preferences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    linkedinUrl: 'linkedinUrl',
    company: 'company',
    position: 'position',
    notes: 'notes',
    stage: 'stage',
    tags: 'tags',
    score: 'score',
    userId: 'userId',
    campaignId: 'campaignId',
    lastActivity: 'lastActivity',
    lastContactedDate: 'lastContactedDate',
    nextContactDate: 'nextContactDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    type: 'type',
    content: 'content',
    subject: 'subject',
    attachment: 'attachment',
    sentiment: 'sentiment',
    date: 'date',
    followUp: 'followUp',
    hasFollowUp: 'hasFollowUp',
    followUpDone: 'followUpDone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const AiSuggestionScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    suggestion: 'suggestion',
    type: 'type',
    status: 'status',
    priority: 'priority',
    done: 'done',
    isViewed: 'isViewed',
    reasoning: 'reasoning',
    templateId: 'templateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiSuggestionScalarFieldEnum = (typeof AiSuggestionScalarFieldEnum)[keyof typeof AiSuggestionScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    userId: 'userId',
    stats: 'stats',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const CampaignStepScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    type: 'type',
    content: 'content',
    templateId: 'templateId',
    waitDays: 'waitDays',
    order: 'order',
    conditions: 'conditions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignStepScalarFieldEnum = (typeof CampaignStepScalarFieldEnum)[keyof typeof CampaignStepScalarFieldEnum]


  export const MessageTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    subject: 'subject',
    type: 'type',
    tags: 'tags',
    userId: 'userId',
    aiGenerated: 'aiGenerated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageTemplateScalarFieldEnum = (typeof MessageTemplateScalarFieldEnum)[keyof typeof MessageTemplateScalarFieldEnum]


  export const DashboardMetricScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DashboardMetricScalarFieldEnum = (typeof DashboardMetricScalarFieldEnum)[keyof typeof DashboardMetricScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    dueDate: 'dueDate',
    priority: 'priority',
    status: 'status',
    leadId: 'leadId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    relatedId: 'relatedId',
    relatedType: 'relatedType',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const ExportJobScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    filters: 'filters',
    status: 'status',
    url: 'url',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type ExportJobScalarFieldEnum = (typeof ExportJobScalarFieldEnum)[keyof typeof ExportJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'LeadStage'
   */
  export type EnumLeadStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStage'>
    


  /**
   * Reference to a field of type 'LeadStage[]'
   */
  export type ListEnumLeadStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStage[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ConversationType'
   */
  export type EnumConversationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationType'>
    


  /**
   * Reference to a field of type 'ConversationType[]'
   */
  export type ListEnumConversationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'SuggestionStatus'
   */
  export type EnumSuggestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuggestionStatus'>
    


  /**
   * Reference to a field of type 'SuggestionStatus[]'
   */
  export type ListEnumSuggestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuggestionStatus[]'>
    


  /**
   * Reference to a field of type 'StepType'
   */
  export type EnumStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StepType'>
    


  /**
   * Reference to a field of type 'StepType[]'
   */
  export type ListEnumStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StepType[]'>
    


  /**
   * Reference to a field of type 'TemplateType'
   */
  export type EnumTemplateTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TemplateType'>
    


  /**
   * Reference to a field of type 'TemplateType[]'
   */
  export type ListEnumTemplateTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TemplateType[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'ExportType'
   */
  export type EnumExportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExportType'>
    


  /**
   * Reference to a field of type 'ExportType[]'
   */
  export type ListEnumExportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExportType[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    email?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    email?: StringFilter<"PasswordReset"> | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
  }, "id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    email?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    preferences?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    leads?: LeadListRelationFilter
    notifications?: NotificationListRelationFilter
    campaigns?: CampaignListRelationFilter
    templates?: MessageTemplateListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leads?: LeadOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    campaigns?: CampaignOrderByRelationAggregateInput
    templates?: MessageTemplateOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    preferences?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    leads?: LeadListRelationFilter
    notifications?: NotificationListRelationFilter
    campaigns?: CampaignListRelationFilter
    templates?: MessageTemplateListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    preferences?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    name?: StringFilter<"Lead"> | string
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    company?: StringNullableFilter<"Lead"> | string | null
    position?: StringNullableFilter<"Lead"> | string | null
    notes?: StringNullableFilter<"Lead"> | string | null
    stage?: EnumLeadStageFilter<"Lead"> | $Enums.LeadStage
    tags?: StringNullableListFilter<"Lead">
    score?: IntNullableFilter<"Lead"> | number | null
    userId?: StringNullableFilter<"Lead"> | string | null
    campaignId?: StringNullableFilter<"Lead"> | string | null
    lastActivity?: DateTimeNullableFilter<"Lead"> | Date | string | null
    lastContactedDate?: DateTimeNullableFilter<"Lead"> | Date | string | null
    nextContactDate?: DateTimeNullableFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    campaign?: XOR<CampaignNullableScalarRelationFilter, CampaignWhereInput> | null
    conversations?: ConversationListRelationFilter
    suggestions?: AiSuggestionListRelationFilter
    tasks?: TaskListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    company?: SortOrder
    position?: SortOrder
    notes?: SortOrder
    stage?: SortOrder
    tags?: SortOrder
    score?: SortOrder
    userId?: SortOrder
    campaignId?: SortOrder
    lastActivity?: SortOrder
    lastContactedDate?: SortOrder
    nextContactDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    campaign?: CampaignOrderByWithRelationInput
    conversations?: ConversationOrderByRelationAggregateInput
    suggestions?: AiSuggestionOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    name?: StringFilter<"Lead"> | string
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    company?: StringNullableFilter<"Lead"> | string | null
    position?: StringNullableFilter<"Lead"> | string | null
    notes?: StringNullableFilter<"Lead"> | string | null
    stage?: EnumLeadStageFilter<"Lead"> | $Enums.LeadStage
    tags?: StringNullableListFilter<"Lead">
    score?: IntNullableFilter<"Lead"> | number | null
    userId?: StringNullableFilter<"Lead"> | string | null
    campaignId?: StringNullableFilter<"Lead"> | string | null
    lastActivity?: DateTimeNullableFilter<"Lead"> | Date | string | null
    lastContactedDate?: DateTimeNullableFilter<"Lead"> | Date | string | null
    nextContactDate?: DateTimeNullableFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    campaign?: XOR<CampaignNullableScalarRelationFilter, CampaignWhereInput> | null
    conversations?: ConversationListRelationFilter
    suggestions?: AiSuggestionListRelationFilter
    tasks?: TaskListRelationFilter
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    company?: SortOrder
    position?: SortOrder
    notes?: SortOrder
    stage?: SortOrder
    tags?: SortOrder
    score?: SortOrder
    userId?: SortOrder
    campaignId?: SortOrder
    lastActivity?: SortOrder
    lastContactedDate?: SortOrder
    nextContactDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    name?: StringWithAggregatesFilter<"Lead"> | string
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    company?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    position?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    stage?: EnumLeadStageWithAggregatesFilter<"Lead"> | $Enums.LeadStage
    tags?: StringNullableListFilter<"Lead">
    score?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    userId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    campaignId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    lastActivity?: DateTimeNullableWithAggregatesFilter<"Lead"> | Date | string | null
    lastContactedDate?: DateTimeNullableWithAggregatesFilter<"Lead"> | Date | string | null
    nextContactDate?: DateTimeNullableWithAggregatesFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    leadId?: StringFilter<"Conversation"> | string
    type?: EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType
    content?: StringFilter<"Conversation"> | string
    subject?: StringNullableFilter<"Conversation"> | string | null
    attachment?: StringNullableFilter<"Conversation"> | string | null
    sentiment?: StringNullableFilter<"Conversation"> | string | null
    date?: DateTimeFilter<"Conversation"> | Date | string
    followUp?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    hasFollowUp?: BoolFilter<"Conversation"> | boolean
    followUpDone?: BoolFilter<"Conversation"> | boolean
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    attachment?: SortOrder
    sentiment?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    hasFollowUp?: SortOrder
    followUpDone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    leadId?: StringFilter<"Conversation"> | string
    type?: EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType
    content?: StringFilter<"Conversation"> | string
    subject?: StringNullableFilter<"Conversation"> | string | null
    attachment?: StringNullableFilter<"Conversation"> | string | null
    sentiment?: StringNullableFilter<"Conversation"> | string | null
    date?: DateTimeFilter<"Conversation"> | Date | string
    followUp?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    hasFollowUp?: BoolFilter<"Conversation"> | boolean
    followUpDone?: BoolFilter<"Conversation"> | boolean
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    attachment?: SortOrder
    sentiment?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    hasFollowUp?: SortOrder
    followUpDone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    leadId?: StringWithAggregatesFilter<"Conversation"> | string
    type?: EnumConversationTypeWithAggregatesFilter<"Conversation"> | $Enums.ConversationType
    content?: StringWithAggregatesFilter<"Conversation"> | string
    subject?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    attachment?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    sentiment?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    date?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    followUp?: DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null
    hasFollowUp?: BoolWithAggregatesFilter<"Conversation"> | boolean
    followUpDone?: BoolWithAggregatesFilter<"Conversation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type AiSuggestionWhereInput = {
    AND?: AiSuggestionWhereInput | AiSuggestionWhereInput[]
    OR?: AiSuggestionWhereInput[]
    NOT?: AiSuggestionWhereInput | AiSuggestionWhereInput[]
    id?: StringFilter<"AiSuggestion"> | string
    leadId?: StringFilter<"AiSuggestion"> | string
    suggestion?: StringFilter<"AiSuggestion"> | string
    type?: StringFilter<"AiSuggestion"> | string
    status?: EnumSuggestionStatusFilter<"AiSuggestion"> | $Enums.SuggestionStatus
    priority?: IntFilter<"AiSuggestion"> | number
    done?: BoolFilter<"AiSuggestion"> | boolean
    isViewed?: BoolFilter<"AiSuggestion"> | boolean
    reasoning?: StringNullableFilter<"AiSuggestion"> | string | null
    templateId?: StringNullableFilter<"AiSuggestion"> | string | null
    createdAt?: DateTimeFilter<"AiSuggestion"> | Date | string
    updatedAt?: DateTimeFilter<"AiSuggestion"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    template?: XOR<MessageTemplateNullableScalarRelationFilter, MessageTemplateWhereInput> | null
  }

  export type AiSuggestionOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    suggestion?: SortOrder
    type?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    done?: SortOrder
    isViewed?: SortOrder
    reasoning?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
    template?: MessageTemplateOrderByWithRelationInput
  }

  export type AiSuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiSuggestionWhereInput | AiSuggestionWhereInput[]
    OR?: AiSuggestionWhereInput[]
    NOT?: AiSuggestionWhereInput | AiSuggestionWhereInput[]
    leadId?: StringFilter<"AiSuggestion"> | string
    suggestion?: StringFilter<"AiSuggestion"> | string
    type?: StringFilter<"AiSuggestion"> | string
    status?: EnumSuggestionStatusFilter<"AiSuggestion"> | $Enums.SuggestionStatus
    priority?: IntFilter<"AiSuggestion"> | number
    done?: BoolFilter<"AiSuggestion"> | boolean
    isViewed?: BoolFilter<"AiSuggestion"> | boolean
    reasoning?: StringNullableFilter<"AiSuggestion"> | string | null
    templateId?: StringNullableFilter<"AiSuggestion"> | string | null
    createdAt?: DateTimeFilter<"AiSuggestion"> | Date | string
    updatedAt?: DateTimeFilter<"AiSuggestion"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    template?: XOR<MessageTemplateNullableScalarRelationFilter, MessageTemplateWhereInput> | null
  }, "id">

  export type AiSuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    suggestion?: SortOrder
    type?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    done?: SortOrder
    isViewed?: SortOrder
    reasoning?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiSuggestionCountOrderByAggregateInput
    _avg?: AiSuggestionAvgOrderByAggregateInput
    _max?: AiSuggestionMaxOrderByAggregateInput
    _min?: AiSuggestionMinOrderByAggregateInput
    _sum?: AiSuggestionSumOrderByAggregateInput
  }

  export type AiSuggestionScalarWhereWithAggregatesInput = {
    AND?: AiSuggestionScalarWhereWithAggregatesInput | AiSuggestionScalarWhereWithAggregatesInput[]
    OR?: AiSuggestionScalarWhereWithAggregatesInput[]
    NOT?: AiSuggestionScalarWhereWithAggregatesInput | AiSuggestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiSuggestion"> | string
    leadId?: StringWithAggregatesFilter<"AiSuggestion"> | string
    suggestion?: StringWithAggregatesFilter<"AiSuggestion"> | string
    type?: StringWithAggregatesFilter<"AiSuggestion"> | string
    status?: EnumSuggestionStatusWithAggregatesFilter<"AiSuggestion"> | $Enums.SuggestionStatus
    priority?: IntWithAggregatesFilter<"AiSuggestion"> | number
    done?: BoolWithAggregatesFilter<"AiSuggestion"> | boolean
    isViewed?: BoolWithAggregatesFilter<"AiSuggestion"> | boolean
    reasoning?: StringNullableWithAggregatesFilter<"AiSuggestion"> | string | null
    templateId?: StringNullableWithAggregatesFilter<"AiSuggestion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AiSuggestion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiSuggestion"> | Date | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    isActive?: BoolFilter<"Campaign"> | boolean
    userId?: StringNullableFilter<"Campaign"> | string | null
    stats?: JsonNullableFilter<"Campaign">
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    steps?: CampaignStepListRelationFilter
    leads?: LeadListRelationFilter
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    userId?: SortOrder
    stats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    steps?: CampaignStepOrderByRelationAggregateInput
    leads?: LeadOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    isActive?: BoolFilter<"Campaign"> | boolean
    userId?: StringNullableFilter<"Campaign"> | string | null
    stats?: JsonNullableFilter<"Campaign">
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    steps?: CampaignStepListRelationFilter
    leads?: LeadListRelationFilter
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    userId?: SortOrder
    stats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    description?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    isActive?: BoolWithAggregatesFilter<"Campaign"> | boolean
    userId?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    stats?: JsonNullableWithAggregatesFilter<"Campaign">
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
  }

  export type CampaignStepWhereInput = {
    AND?: CampaignStepWhereInput | CampaignStepWhereInput[]
    OR?: CampaignStepWhereInput[]
    NOT?: CampaignStepWhereInput | CampaignStepWhereInput[]
    id?: StringFilter<"CampaignStep"> | string
    campaignId?: StringFilter<"CampaignStep"> | string
    type?: EnumStepTypeFilter<"CampaignStep"> | $Enums.StepType
    content?: StringNullableFilter<"CampaignStep"> | string | null
    templateId?: StringNullableFilter<"CampaignStep"> | string | null
    waitDays?: IntFilter<"CampaignStep"> | number
    order?: IntFilter<"CampaignStep"> | number
    conditions?: JsonNullableFilter<"CampaignStep">
    createdAt?: DateTimeFilter<"CampaignStep"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignStep"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    template?: XOR<MessageTemplateNullableScalarRelationFilter, MessageTemplateWhereInput> | null
  }

  export type CampaignStepOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    templateId?: SortOrder
    waitDays?: SortOrder
    order?: SortOrder
    conditions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    template?: MessageTemplateOrderByWithRelationInput
  }

  export type CampaignStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignStepWhereInput | CampaignStepWhereInput[]
    OR?: CampaignStepWhereInput[]
    NOT?: CampaignStepWhereInput | CampaignStepWhereInput[]
    campaignId?: StringFilter<"CampaignStep"> | string
    type?: EnumStepTypeFilter<"CampaignStep"> | $Enums.StepType
    content?: StringNullableFilter<"CampaignStep"> | string | null
    templateId?: StringNullableFilter<"CampaignStep"> | string | null
    waitDays?: IntFilter<"CampaignStep"> | number
    order?: IntFilter<"CampaignStep"> | number
    conditions?: JsonNullableFilter<"CampaignStep">
    createdAt?: DateTimeFilter<"CampaignStep"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignStep"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    template?: XOR<MessageTemplateNullableScalarRelationFilter, MessageTemplateWhereInput> | null
  }, "id">

  export type CampaignStepOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    templateId?: SortOrder
    waitDays?: SortOrder
    order?: SortOrder
    conditions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignStepCountOrderByAggregateInput
    _avg?: CampaignStepAvgOrderByAggregateInput
    _max?: CampaignStepMaxOrderByAggregateInput
    _min?: CampaignStepMinOrderByAggregateInput
    _sum?: CampaignStepSumOrderByAggregateInput
  }

  export type CampaignStepScalarWhereWithAggregatesInput = {
    AND?: CampaignStepScalarWhereWithAggregatesInput | CampaignStepScalarWhereWithAggregatesInput[]
    OR?: CampaignStepScalarWhereWithAggregatesInput[]
    NOT?: CampaignStepScalarWhereWithAggregatesInput | CampaignStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignStep"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignStep"> | string
    type?: EnumStepTypeWithAggregatesFilter<"CampaignStep"> | $Enums.StepType
    content?: StringNullableWithAggregatesFilter<"CampaignStep"> | string | null
    templateId?: StringNullableWithAggregatesFilter<"CampaignStep"> | string | null
    waitDays?: IntWithAggregatesFilter<"CampaignStep"> | number
    order?: IntWithAggregatesFilter<"CampaignStep"> | number
    conditions?: JsonNullableWithAggregatesFilter<"CampaignStep">
    createdAt?: DateTimeWithAggregatesFilter<"CampaignStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CampaignStep"> | Date | string
  }

  export type MessageTemplateWhereInput = {
    AND?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    OR?: MessageTemplateWhereInput[]
    NOT?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    id?: StringFilter<"MessageTemplate"> | string
    name?: StringFilter<"MessageTemplate"> | string
    content?: StringFilter<"MessageTemplate"> | string
    subject?: StringNullableFilter<"MessageTemplate"> | string | null
    type?: EnumTemplateTypeFilter<"MessageTemplate"> | $Enums.TemplateType
    tags?: StringNullableListFilter<"MessageTemplate">
    userId?: StringNullableFilter<"MessageTemplate"> | string | null
    aiGenerated?: BoolFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    suggestions?: AiSuggestionListRelationFilter
    campaignSteps?: CampaignStepListRelationFilter
  }

  export type MessageTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    userId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    suggestions?: AiSuggestionOrderByRelationAggregateInput
    campaignSteps?: CampaignStepOrderByRelationAggregateInput
  }

  export type MessageTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    OR?: MessageTemplateWhereInput[]
    NOT?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    name?: StringFilter<"MessageTemplate"> | string
    content?: StringFilter<"MessageTemplate"> | string
    subject?: StringNullableFilter<"MessageTemplate"> | string | null
    type?: EnumTemplateTypeFilter<"MessageTemplate"> | $Enums.TemplateType
    tags?: StringNullableListFilter<"MessageTemplate">
    userId?: StringNullableFilter<"MessageTemplate"> | string | null
    aiGenerated?: BoolFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    suggestions?: AiSuggestionListRelationFilter
    campaignSteps?: CampaignStepListRelationFilter
  }, "id">

  export type MessageTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    userId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageTemplateCountOrderByAggregateInput
    _max?: MessageTemplateMaxOrderByAggregateInput
    _min?: MessageTemplateMinOrderByAggregateInput
  }

  export type MessageTemplateScalarWhereWithAggregatesInput = {
    AND?: MessageTemplateScalarWhereWithAggregatesInput | MessageTemplateScalarWhereWithAggregatesInput[]
    OR?: MessageTemplateScalarWhereWithAggregatesInput[]
    NOT?: MessageTemplateScalarWhereWithAggregatesInput | MessageTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageTemplate"> | string
    name?: StringWithAggregatesFilter<"MessageTemplate"> | string
    content?: StringWithAggregatesFilter<"MessageTemplate"> | string
    subject?: StringNullableWithAggregatesFilter<"MessageTemplate"> | string | null
    type?: EnumTemplateTypeWithAggregatesFilter<"MessageTemplate"> | $Enums.TemplateType
    tags?: StringNullableListFilter<"MessageTemplate">
    userId?: StringNullableWithAggregatesFilter<"MessageTemplate"> | string | null
    aiGenerated?: BoolWithAggregatesFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MessageTemplate"> | Date | string
  }

  export type DashboardMetricWhereInput = {
    AND?: DashboardMetricWhereInput | DashboardMetricWhereInput[]
    OR?: DashboardMetricWhereInput[]
    NOT?: DashboardMetricWhereInput | DashboardMetricWhereInput[]
    id?: StringFilter<"DashboardMetric"> | string
    name?: StringFilter<"DashboardMetric"> | string
    value?: JsonFilter<"DashboardMetric">
    periodStart?: DateTimeFilter<"DashboardMetric"> | Date | string
    periodEnd?: DateTimeFilter<"DashboardMetric"> | Date | string
    createdAt?: DateTimeFilter<"DashboardMetric"> | Date | string
    updatedAt?: DateTimeFilter<"DashboardMetric"> | Date | string
  }

  export type DashboardMetricOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DashboardMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DashboardMetricWhereInput | DashboardMetricWhereInput[]
    OR?: DashboardMetricWhereInput[]
    NOT?: DashboardMetricWhereInput | DashboardMetricWhereInput[]
    name?: StringFilter<"DashboardMetric"> | string
    value?: JsonFilter<"DashboardMetric">
    periodStart?: DateTimeFilter<"DashboardMetric"> | Date | string
    periodEnd?: DateTimeFilter<"DashboardMetric"> | Date | string
    createdAt?: DateTimeFilter<"DashboardMetric"> | Date | string
    updatedAt?: DateTimeFilter<"DashboardMetric"> | Date | string
  }, "id">

  export type DashboardMetricOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DashboardMetricCountOrderByAggregateInput
    _max?: DashboardMetricMaxOrderByAggregateInput
    _min?: DashboardMetricMinOrderByAggregateInput
  }

  export type DashboardMetricScalarWhereWithAggregatesInput = {
    AND?: DashboardMetricScalarWhereWithAggregatesInput | DashboardMetricScalarWhereWithAggregatesInput[]
    OR?: DashboardMetricScalarWhereWithAggregatesInput[]
    NOT?: DashboardMetricScalarWhereWithAggregatesInput | DashboardMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DashboardMetric"> | string
    name?: StringWithAggregatesFilter<"DashboardMetric"> | string
    value?: JsonWithAggregatesFilter<"DashboardMetric">
    periodStart?: DateTimeWithAggregatesFilter<"DashboardMetric"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"DashboardMetric"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"DashboardMetric"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DashboardMetric"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: IntFilter<"Task"> | number
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    leadId?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    lead?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: IntFilter<"Task"> | number
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    leadId?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    lead?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    priority?: IntWithAggregatesFilter<"Task"> | number
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    leadId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    relatedId?: StringNullableFilter<"Notification"> | string | null
    relatedType?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    relatedId?: SortOrder
    relatedType?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    relatedId?: StringNullableFilter<"Notification"> | string | null
    relatedType?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    relatedId?: SortOrder
    relatedType?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    relatedId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    relatedType?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ExportJobWhereInput = {
    AND?: ExportJobWhereInput | ExportJobWhereInput[]
    OR?: ExportJobWhereInput[]
    NOT?: ExportJobWhereInput | ExportJobWhereInput[]
    id?: StringFilter<"ExportJob"> | string
    userId?: StringFilter<"ExportJob"> | string
    type?: EnumExportTypeFilter<"ExportJob"> | $Enums.ExportType
    filters?: JsonNullableFilter<"ExportJob">
    status?: EnumJobStatusFilter<"ExportJob"> | $Enums.JobStatus
    url?: StringNullableFilter<"ExportJob"> | string | null
    createdAt?: DateTimeFilter<"ExportJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ExportJob"> | Date | string | null
  }

  export type ExportJobOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    filters?: SortOrder
    status?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ExportJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExportJobWhereInput | ExportJobWhereInput[]
    OR?: ExportJobWhereInput[]
    NOT?: ExportJobWhereInput | ExportJobWhereInput[]
    userId?: StringFilter<"ExportJob"> | string
    type?: EnumExportTypeFilter<"ExportJob"> | $Enums.ExportType
    filters?: JsonNullableFilter<"ExportJob">
    status?: EnumJobStatusFilter<"ExportJob"> | $Enums.JobStatus
    url?: StringNullableFilter<"ExportJob"> | string | null
    createdAt?: DateTimeFilter<"ExportJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ExportJob"> | Date | string | null
  }, "id">

  export type ExportJobOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    filters?: SortOrder
    status?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    _count?: ExportJobCountOrderByAggregateInput
    _max?: ExportJobMaxOrderByAggregateInput
    _min?: ExportJobMinOrderByAggregateInput
  }

  export type ExportJobScalarWhereWithAggregatesInput = {
    AND?: ExportJobScalarWhereWithAggregatesInput | ExportJobScalarWhereWithAggregatesInput[]
    OR?: ExportJobScalarWhereWithAggregatesInput[]
    NOT?: ExportJobScalarWhereWithAggregatesInput | ExportJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExportJob"> | string
    userId?: StringWithAggregatesFilter<"ExportJob"> | string
    type?: EnumExportTypeWithAggregatesFilter<"ExportJob"> | $Enums.ExportType
    filters?: JsonNullableWithAggregatesFilter<"ExportJob">
    status?: EnumJobStatusWithAggregatesFilter<"ExportJob"> | $Enums.JobStatus
    url?: StringNullableWithAggregatesFilter<"ExportJob"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExportJob"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ExportJob"> | Date | string | null
  }

  export type PasswordResetCreateInput = {
    id?: string
    email: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    email: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    campaigns?: CampaignCreateNestedManyWithoutUserInput
    templates?: MessageTemplateCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutUserInput
    templates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutLeadsInput
    campaign?: CampaignCreateNestedOneWithoutLeadsInput
    conversations?: ConversationCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionCreateNestedManyWithoutLeadInput
    tasks?: TaskCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutLeadInput
    tasks?: TaskUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutLeadsNestedInput
    campaign?: CampaignUpdateOneWithoutLeadsNestedInput
    conversations?: ConversationUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutLeadNestedInput
    tasks?: TaskUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutLeadNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    type: $Enums.ConversationType
    content: string
    subject?: string | null
    attachment?: string | null
    sentiment?: string | null
    date?: Date | string
    followUp?: Date | string | null
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    leadId: string
    type: $Enums.ConversationType
    content: string
    subject?: string | null
    attachment?: string | null
    sentiment?: string | null
    date?: Date | string
    followUp?: Date | string | null
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyInput = {
    id?: string
    leadId: string
    type: $Enums.ConversationType
    content: string
    subject?: string | null
    attachment?: string | null
    sentiment?: string | null
    date?: Date | string
    followUp?: Date | string | null
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionCreateInput = {
    id?: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutSuggestionsInput
    template?: MessageTemplateCreateNestedOneWithoutSuggestionsInput
  }

  export type AiSuggestionUncheckedCreateInput = {
    id?: string
    leadId: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSuggestionUpdateInput = {
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutSuggestionsNestedInput
    template?: MessageTemplateUpdateOneWithoutSuggestionsNestedInput
  }

  export type AiSuggestionUncheckedUpdateInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionCreateManyInput = {
    id?: string
    leadId: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSuggestionUpdateManyMutationInput = {
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionUncheckedUpdateManyInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: CampaignStepCreateNestedManyWithoutCampaignInput
    leads?: LeadCreateNestedManyWithoutCampaignInput
    user?: UserCreateNestedOneWithoutCampaignsInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    userId?: string | null
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: CampaignStepUncheckedCreateNestedManyWithoutCampaignInput
    leads?: LeadUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: CampaignStepUpdateManyWithoutCampaignNestedInput
    leads?: LeadUpdateManyWithoutCampaignNestedInput
    user?: UserUpdateOneWithoutCampaignsNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: CampaignStepUncheckedUpdateManyWithoutCampaignNestedInput
    leads?: LeadUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    userId?: string | null
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepCreateInput = {
    id?: string
    type: $Enums.StepType
    content?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutStepsInput
    template?: MessageTemplateCreateNestedOneWithoutCampaignStepsInput
  }

  export type CampaignStepUncheckedCreateInput = {
    id?: string
    campaignId: string
    type: $Enums.StepType
    content?: string | null
    templateId?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignStepUpdateInput = {
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutStepsNestedInput
    template?: MessageTemplateUpdateOneWithoutCampaignStepsNestedInput
  }

  export type CampaignStepUncheckedUpdateInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepCreateManyInput = {
    id?: string
    campaignId: string
    type: $Enums.StepType
    content?: string | null
    templateId?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignStepUpdateManyMutationInput = {
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepUncheckedUpdateManyInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateCreateInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTemplatesInput
    suggestions?: AiSuggestionCreateNestedManyWithoutTemplateInput
    campaignSteps?: CampaignStepCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateUncheckedCreateInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    userId?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutTemplateInput
    campaignSteps?: CampaignStepUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTemplatesNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutTemplateNestedInput
    campaignSteps?: CampaignStepUpdateManyWithoutTemplateNestedInput
  }

  export type MessageTemplateUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutTemplateNestedInput
    campaignSteps?: CampaignStepUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type MessageTemplateCreateManyInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    userId?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardMetricCreateInput = {
    id?: string
    name: string
    value: InputJsonValue
    periodStart: Date | string
    periodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardMetricUncheckedCreateInput = {
    id?: string
    name: string
    value: InputJsonValue
    periodStart: Date | string
    periodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardMetricUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardMetricUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardMetricCreateManyInput = {
    id?: string
    name: string
    value: InputJsonValue
    periodStart: Date | string
    periodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardMetricUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardMetricUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority?: number
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lead?: LeadCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority?: number
    status?: $Enums.TaskStatus
    leadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority?: number
    status?: $Enums.TaskStatus
    leadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    relatedId?: string | null
    relatedType?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    relatedId?: string | null
    relatedType?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    relatedId?: string | null
    relatedType?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportJobCreateInput = {
    id?: string
    userId: string
    type: $Enums.ExportType
    filters?: InputJsonValue | null
    status?: $Enums.JobStatus
    url?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ExportJobUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.ExportType
    filters?: InputJsonValue | null
    status?: $Enums.JobStatus
    url?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ExportJobUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumExportTypeFieldUpdateOperationsInput | $Enums.ExportType
    filters?: InputJsonValue | InputJsonValue | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportJobUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumExportTypeFieldUpdateOperationsInput | $Enums.ExportType
    filters?: InputJsonValue | InputJsonValue | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportJobCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.ExportType
    filters?: InputJsonValue | null
    status?: $Enums.JobStatus
    url?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ExportJobUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumExportTypeFieldUpdateOperationsInput | $Enums.ExportType
    filters?: InputJsonValue | InputJsonValue | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportJobUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumExportTypeFieldUpdateOperationsInput | $Enums.ExportType
    filters?: InputJsonValue | InputJsonValue | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type MessageTemplateListRelationFilter = {
    every?: MessageTemplateWhereInput
    some?: MessageTemplateWhereInput
    none?: MessageTemplateWhereInput
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type EnumLeadStageFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStage | EnumLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStageFilter<$PrismaModel> | $Enums.LeadStage
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CampaignNullableScalarRelationFilter = {
    is?: CampaignWhereInput | null
    isNot?: CampaignWhereInput | null
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type AiSuggestionListRelationFilter = {
    every?: AiSuggestionWhereInput
    some?: AiSuggestionWhereInput
    none?: AiSuggestionWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiSuggestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    company?: SortOrder
    position?: SortOrder
    notes?: SortOrder
    stage?: SortOrder
    tags?: SortOrder
    score?: SortOrder
    userId?: SortOrder
    campaignId?: SortOrder
    lastActivity?: SortOrder
    lastContactedDate?: SortOrder
    nextContactDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    company?: SortOrder
    position?: SortOrder
    notes?: SortOrder
    stage?: SortOrder
    score?: SortOrder
    userId?: SortOrder
    campaignId?: SortOrder
    lastActivity?: SortOrder
    lastContactedDate?: SortOrder
    nextContactDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    company?: SortOrder
    position?: SortOrder
    notes?: SortOrder
    stage?: SortOrder
    score?: SortOrder
    userId?: SortOrder
    campaignId?: SortOrder
    lastActivity?: SortOrder
    lastContactedDate?: SortOrder
    nextContactDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumLeadStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStage | EnumLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStageWithAggregatesFilter<$PrismaModel> | $Enums.LeadStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadStageFilter<$PrismaModel>
    _max?: NestedEnumLeadStageFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumConversationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeFilter<$PrismaModel> | $Enums.ConversationType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    attachment?: SortOrder
    sentiment?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    hasFollowUp?: SortOrder
    followUpDone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    attachment?: SortOrder
    sentiment?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    hasFollowUp?: SortOrder
    followUpDone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    attachment?: SortOrder
    sentiment?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    hasFollowUp?: SortOrder
    followUpDone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConversationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationTypeFilter<$PrismaModel>
    _max?: NestedEnumConversationTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumSuggestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SuggestionStatus | EnumSuggestionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuggestionStatusFilter<$PrismaModel> | $Enums.SuggestionStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MessageTemplateNullableScalarRelationFilter = {
    is?: MessageTemplateWhereInput | null
    isNot?: MessageTemplateWhereInput | null
  }

  export type AiSuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    suggestion?: SortOrder
    type?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    done?: SortOrder
    isViewed?: SortOrder
    reasoning?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiSuggestionAvgOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type AiSuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    suggestion?: SortOrder
    type?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    done?: SortOrder
    isViewed?: SortOrder
    reasoning?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiSuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    suggestion?: SortOrder
    type?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    done?: SortOrder
    isViewed?: SortOrder
    reasoning?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiSuggestionSumOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type EnumSuggestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SuggestionStatus | EnumSuggestionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuggestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SuggestionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSuggestionStatusFilter<$PrismaModel>
    _max?: NestedEnumSuggestionStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CampaignStepListRelationFilter = {
    every?: CampaignStepWhereInput
    some?: CampaignStepWhereInput
    none?: CampaignStepWhereInput
  }

  export type CampaignStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    userId?: SortOrder
    stats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStepTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeFilter<$PrismaModel> | $Enums.StepType
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type CampaignStepCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    templateId?: SortOrder
    waitDays?: SortOrder
    order?: SortOrder
    conditions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignStepAvgOrderByAggregateInput = {
    waitDays?: SortOrder
    order?: SortOrder
  }

  export type CampaignStepMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    templateId?: SortOrder
    waitDays?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignStepMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    templateId?: SortOrder
    waitDays?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignStepSumOrderByAggregateInput = {
    waitDays?: SortOrder
    order?: SortOrder
  }

  export type EnumStepTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeWithAggregatesFilter<$PrismaModel> | $Enums.StepType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStepTypeFilter<$PrismaModel>
    _max?: NestedEnumStepTypeFilter<$PrismaModel>
  }

  export type EnumTemplateTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateType | EnumTemplateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateTypeFilter<$PrismaModel> | $Enums.TemplateType
  }

  export type MessageTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    userId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    type?: SortOrder
    userId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    subject?: SortOrder
    type?: SortOrder
    userId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTemplateTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateType | EnumTemplateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateTypeWithAggregatesFilter<$PrismaModel> | $Enums.TemplateType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTemplateTypeFilter<$PrismaModel>
    _max?: NestedEnumTemplateTypeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type DashboardMetricCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DashboardMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DashboardMetricMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type LeadNullableScalarRelationFilter = {
    is?: LeadWhereInput | null
    isNot?: LeadWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    relatedId?: SortOrder
    relatedType?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    relatedId?: SortOrder
    relatedType?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    relatedId?: SortOrder
    relatedType?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type EnumExportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportType | EnumExportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExportTypeFilter<$PrismaModel> | $Enums.ExportType
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type ExportJobCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    filters?: SortOrder
    status?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ExportJobMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ExportJobMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type EnumExportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportType | EnumExportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExportTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExportTypeFilter<$PrismaModel>
    _max?: NestedEnumExportTypeFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LeadCreateNestedManyWithoutUserInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutUserInput = {
    create?: XOR<CampaignCreateWithoutUserInput, CampaignUncheckedCreateWithoutUserInput> | CampaignCreateWithoutUserInput[] | CampaignUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutUserInput | CampaignCreateOrConnectWithoutUserInput[]
    createMany?: CampaignCreateManyUserInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type MessageTemplateCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CampaignCreateWithoutUserInput, CampaignUncheckedCreateWithoutUserInput> | CampaignCreateWithoutUserInput[] | CampaignUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutUserInput | CampaignCreateOrConnectWithoutUserInput[]
    createMany?: CampaignCreateManyUserInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type MessageTemplateUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type LeadUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutUserInput | LeadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutUserInput | LeadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutUserInput | LeadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutUserNestedInput = {
    create?: XOR<CampaignCreateWithoutUserInput, CampaignUncheckedCreateWithoutUserInput> | CampaignCreateWithoutUserInput[] | CampaignUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutUserInput | CampaignCreateOrConnectWithoutUserInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutUserInput | CampaignUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CampaignCreateManyUserInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutUserInput | CampaignUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutUserInput | CampaignUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type MessageTemplateUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    upsert?: MessageTemplateUpsertWithWhereUniqueWithoutUserInput | MessageTemplateUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    set?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    disconnect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    delete?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    update?: MessageTemplateUpdateWithWhereUniqueWithoutUserInput | MessageTemplateUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageTemplateUpdateManyWithWhereWithoutUserInput | MessageTemplateUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutUserInput | LeadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutUserInput | LeadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutUserInput | LeadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CampaignCreateWithoutUserInput, CampaignUncheckedCreateWithoutUserInput> | CampaignCreateWithoutUserInput[] | CampaignUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutUserInput | CampaignCreateOrConnectWithoutUserInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutUserInput | CampaignUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CampaignCreateManyUserInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutUserInput | CampaignUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutUserInput | CampaignUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type MessageTemplateUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    upsert?: MessageTemplateUpsertWithWhereUniqueWithoutUserInput | MessageTemplateUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    set?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    disconnect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    delete?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    update?: MessageTemplateUpdateWithWhereUniqueWithoutUserInput | MessageTemplateUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageTemplateUpdateManyWithWhereWithoutUserInput | MessageTemplateUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
  }

  export type LeadCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutLeadsInput = {
    create?: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeadsInput
    connect?: UserWhereUniqueInput
  }

  export type CampaignCreateNestedOneWithoutLeadsInput = {
    create?: XOR<CampaignCreateWithoutLeadsInput, CampaignUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutLeadsInput
    connect?: CampaignWhereUniqueInput
  }

  export type ConversationCreateNestedManyWithoutLeadInput = {
    create?: XOR<ConversationCreateWithoutLeadInput, ConversationUncheckedCreateWithoutLeadInput> | ConversationCreateWithoutLeadInput[] | ConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLeadInput | ConversationCreateOrConnectWithoutLeadInput[]
    createMany?: ConversationCreateManyLeadInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type AiSuggestionCreateNestedManyWithoutLeadInput = {
    create?: XOR<AiSuggestionCreateWithoutLeadInput, AiSuggestionUncheckedCreateWithoutLeadInput> | AiSuggestionCreateWithoutLeadInput[] | AiSuggestionUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutLeadInput | AiSuggestionCreateOrConnectWithoutLeadInput[]
    createMany?: AiSuggestionCreateManyLeadInputEnvelope
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutLeadInput = {
    create?: XOR<TaskCreateWithoutLeadInput, TaskUncheckedCreateWithoutLeadInput> | TaskCreateWithoutLeadInput[] | TaskUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLeadInput | TaskCreateOrConnectWithoutLeadInput[]
    createMany?: TaskCreateManyLeadInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<ConversationCreateWithoutLeadInput, ConversationUncheckedCreateWithoutLeadInput> | ConversationCreateWithoutLeadInput[] | ConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLeadInput | ConversationCreateOrConnectWithoutLeadInput[]
    createMany?: ConversationCreateManyLeadInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type AiSuggestionUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<AiSuggestionCreateWithoutLeadInput, AiSuggestionUncheckedCreateWithoutLeadInput> | AiSuggestionCreateWithoutLeadInput[] | AiSuggestionUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutLeadInput | AiSuggestionCreateOrConnectWithoutLeadInput[]
    createMany?: AiSuggestionCreateManyLeadInputEnvelope
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<TaskCreateWithoutLeadInput, TaskUncheckedCreateWithoutLeadInput> | TaskCreateWithoutLeadInput[] | TaskUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLeadInput | TaskCreateOrConnectWithoutLeadInput[]
    createMany?: TaskCreateManyLeadInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type EnumLeadStageFieldUpdateOperationsInput = {
    set?: $Enums.LeadStage
  }

  export type LeadUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type UserUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeadsInput
    upsert?: UserUpsertWithoutLeadsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLeadsInput, UserUpdateWithoutLeadsInput>, UserUncheckedUpdateWithoutLeadsInput>
  }

  export type CampaignUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<CampaignCreateWithoutLeadsInput, CampaignUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutLeadsInput
    upsert?: CampaignUpsertWithoutLeadsInput
    disconnect?: boolean
    delete?: CampaignWhereInput | boolean
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutLeadsInput, CampaignUpdateWithoutLeadsInput>, CampaignUncheckedUpdateWithoutLeadsInput>
  }

  export type ConversationUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ConversationCreateWithoutLeadInput, ConversationUncheckedCreateWithoutLeadInput> | ConversationCreateWithoutLeadInput[] | ConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLeadInput | ConversationCreateOrConnectWithoutLeadInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLeadInput | ConversationUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ConversationCreateManyLeadInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLeadInput | ConversationUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLeadInput | ConversationUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type AiSuggestionUpdateManyWithoutLeadNestedInput = {
    create?: XOR<AiSuggestionCreateWithoutLeadInput, AiSuggestionUncheckedCreateWithoutLeadInput> | AiSuggestionCreateWithoutLeadInput[] | AiSuggestionUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutLeadInput | AiSuggestionCreateOrConnectWithoutLeadInput[]
    upsert?: AiSuggestionUpsertWithWhereUniqueWithoutLeadInput | AiSuggestionUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: AiSuggestionCreateManyLeadInputEnvelope
    set?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    disconnect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    delete?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    update?: AiSuggestionUpdateWithWhereUniqueWithoutLeadInput | AiSuggestionUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: AiSuggestionUpdateManyWithWhereWithoutLeadInput | AiSuggestionUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: AiSuggestionScalarWhereInput | AiSuggestionScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutLeadNestedInput = {
    create?: XOR<TaskCreateWithoutLeadInput, TaskUncheckedCreateWithoutLeadInput> | TaskCreateWithoutLeadInput[] | TaskUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLeadInput | TaskCreateOrConnectWithoutLeadInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLeadInput | TaskUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: TaskCreateManyLeadInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLeadInput | TaskUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLeadInput | TaskUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ConversationCreateWithoutLeadInput, ConversationUncheckedCreateWithoutLeadInput> | ConversationCreateWithoutLeadInput[] | ConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLeadInput | ConversationCreateOrConnectWithoutLeadInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLeadInput | ConversationUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ConversationCreateManyLeadInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLeadInput | ConversationUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLeadInput | ConversationUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type AiSuggestionUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<AiSuggestionCreateWithoutLeadInput, AiSuggestionUncheckedCreateWithoutLeadInput> | AiSuggestionCreateWithoutLeadInput[] | AiSuggestionUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutLeadInput | AiSuggestionCreateOrConnectWithoutLeadInput[]
    upsert?: AiSuggestionUpsertWithWhereUniqueWithoutLeadInput | AiSuggestionUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: AiSuggestionCreateManyLeadInputEnvelope
    set?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    disconnect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    delete?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    update?: AiSuggestionUpdateWithWhereUniqueWithoutLeadInput | AiSuggestionUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: AiSuggestionUpdateManyWithWhereWithoutLeadInput | AiSuggestionUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: AiSuggestionScalarWhereInput | AiSuggestionScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<TaskCreateWithoutLeadInput, TaskUncheckedCreateWithoutLeadInput> | TaskCreateWithoutLeadInput[] | TaskUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLeadInput | TaskCreateOrConnectWithoutLeadInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLeadInput | TaskUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: TaskCreateManyLeadInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLeadInput | TaskUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLeadInput | TaskUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutConversationsInput = {
    create?: XOR<LeadCreateWithoutConversationsInput, LeadUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutConversationsInput
    connect?: LeadWhereUniqueInput
  }

  export type EnumConversationTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConversationType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LeadUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<LeadCreateWithoutConversationsInput, LeadUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutConversationsInput
    upsert?: LeadUpsertWithoutConversationsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutConversationsInput, LeadUpdateWithoutConversationsInput>, LeadUncheckedUpdateWithoutConversationsInput>
  }

  export type LeadCreateNestedOneWithoutSuggestionsInput = {
    create?: XOR<LeadCreateWithoutSuggestionsInput, LeadUncheckedCreateWithoutSuggestionsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutSuggestionsInput
    connect?: LeadWhereUniqueInput
  }

  export type MessageTemplateCreateNestedOneWithoutSuggestionsInput = {
    create?: XOR<MessageTemplateCreateWithoutSuggestionsInput, MessageTemplateUncheckedCreateWithoutSuggestionsInput>
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutSuggestionsInput
    connect?: MessageTemplateWhereUniqueInput
  }

  export type EnumSuggestionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SuggestionStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeadUpdateOneRequiredWithoutSuggestionsNestedInput = {
    create?: XOR<LeadCreateWithoutSuggestionsInput, LeadUncheckedCreateWithoutSuggestionsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutSuggestionsInput
    upsert?: LeadUpsertWithoutSuggestionsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutSuggestionsInput, LeadUpdateWithoutSuggestionsInput>, LeadUncheckedUpdateWithoutSuggestionsInput>
  }

  export type MessageTemplateUpdateOneWithoutSuggestionsNestedInput = {
    create?: XOR<MessageTemplateCreateWithoutSuggestionsInput, MessageTemplateUncheckedCreateWithoutSuggestionsInput>
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutSuggestionsInput
    upsert?: MessageTemplateUpsertWithoutSuggestionsInput
    disconnect?: boolean
    delete?: MessageTemplateWhereInput | boolean
    connect?: MessageTemplateWhereUniqueInput
    update?: XOR<XOR<MessageTemplateUpdateToOneWithWhereWithoutSuggestionsInput, MessageTemplateUpdateWithoutSuggestionsInput>, MessageTemplateUncheckedUpdateWithoutSuggestionsInput>
  }

  export type CampaignStepCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignStepCreateWithoutCampaignInput, CampaignStepUncheckedCreateWithoutCampaignInput> | CampaignStepCreateWithoutCampaignInput[] | CampaignStepUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutCampaignInput | CampaignStepCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignStepCreateManyCampaignInputEnvelope
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
  }

  export type LeadCreateNestedManyWithoutCampaignInput = {
    create?: XOR<LeadCreateWithoutCampaignInput, LeadUncheckedCreateWithoutCampaignInput> | LeadCreateWithoutCampaignInput[] | LeadUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCampaignInput | LeadCreateOrConnectWithoutCampaignInput[]
    createMany?: LeadCreateManyCampaignInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsInput
    connect?: UserWhereUniqueInput
  }

  export type CampaignStepUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignStepCreateWithoutCampaignInput, CampaignStepUncheckedCreateWithoutCampaignInput> | CampaignStepCreateWithoutCampaignInput[] | CampaignStepUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutCampaignInput | CampaignStepCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignStepCreateManyCampaignInputEnvelope
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<LeadCreateWithoutCampaignInput, LeadUncheckedCreateWithoutCampaignInput> | LeadCreateWithoutCampaignInput[] | LeadUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCampaignInput | LeadCreateOrConnectWithoutCampaignInput[]
    createMany?: LeadCreateManyCampaignInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type CampaignStepUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignStepCreateWithoutCampaignInput, CampaignStepUncheckedCreateWithoutCampaignInput> | CampaignStepCreateWithoutCampaignInput[] | CampaignStepUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutCampaignInput | CampaignStepCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignStepUpsertWithWhereUniqueWithoutCampaignInput | CampaignStepUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignStepCreateManyCampaignInputEnvelope
    set?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    disconnect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    delete?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    update?: CampaignStepUpdateWithWhereUniqueWithoutCampaignInput | CampaignStepUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignStepUpdateManyWithWhereWithoutCampaignInput | CampaignStepUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignStepScalarWhereInput | CampaignStepScalarWhereInput[]
  }

  export type LeadUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<LeadCreateWithoutCampaignInput, LeadUncheckedCreateWithoutCampaignInput> | LeadCreateWithoutCampaignInput[] | LeadUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCampaignInput | LeadCreateOrConnectWithoutCampaignInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutCampaignInput | LeadUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: LeadCreateManyCampaignInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutCampaignInput | LeadUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutCampaignInput | LeadUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type UserUpdateOneWithoutCampaignsNestedInput = {
    create?: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsInput
    upsert?: UserUpsertWithoutCampaignsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCampaignsInput, UserUpdateWithoutCampaignsInput>, UserUncheckedUpdateWithoutCampaignsInput>
  }

  export type CampaignStepUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignStepCreateWithoutCampaignInput, CampaignStepUncheckedCreateWithoutCampaignInput> | CampaignStepCreateWithoutCampaignInput[] | CampaignStepUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutCampaignInput | CampaignStepCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignStepUpsertWithWhereUniqueWithoutCampaignInput | CampaignStepUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignStepCreateManyCampaignInputEnvelope
    set?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    disconnect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    delete?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    update?: CampaignStepUpdateWithWhereUniqueWithoutCampaignInput | CampaignStepUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignStepUpdateManyWithWhereWithoutCampaignInput | CampaignStepUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignStepScalarWhereInput | CampaignStepScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<LeadCreateWithoutCampaignInput, LeadUncheckedCreateWithoutCampaignInput> | LeadCreateWithoutCampaignInput[] | LeadUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCampaignInput | LeadCreateOrConnectWithoutCampaignInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutCampaignInput | LeadUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: LeadCreateManyCampaignInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutCampaignInput | LeadUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutCampaignInput | LeadUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutStepsInput = {
    create?: XOR<CampaignCreateWithoutStepsInput, CampaignUncheckedCreateWithoutStepsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutStepsInput
    connect?: CampaignWhereUniqueInput
  }

  export type MessageTemplateCreateNestedOneWithoutCampaignStepsInput = {
    create?: XOR<MessageTemplateCreateWithoutCampaignStepsInput, MessageTemplateUncheckedCreateWithoutCampaignStepsInput>
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutCampaignStepsInput
    connect?: MessageTemplateWhereUniqueInput
  }

  export type EnumStepTypeFieldUpdateOperationsInput = {
    set?: $Enums.StepType
  }

  export type CampaignUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<CampaignCreateWithoutStepsInput, CampaignUncheckedCreateWithoutStepsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutStepsInput
    upsert?: CampaignUpsertWithoutStepsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutStepsInput, CampaignUpdateWithoutStepsInput>, CampaignUncheckedUpdateWithoutStepsInput>
  }

  export type MessageTemplateUpdateOneWithoutCampaignStepsNestedInput = {
    create?: XOR<MessageTemplateCreateWithoutCampaignStepsInput, MessageTemplateUncheckedCreateWithoutCampaignStepsInput>
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutCampaignStepsInput
    upsert?: MessageTemplateUpsertWithoutCampaignStepsInput
    disconnect?: boolean
    delete?: MessageTemplateWhereInput | boolean
    connect?: MessageTemplateWhereUniqueInput
    update?: XOR<XOR<MessageTemplateUpdateToOneWithWhereWithoutCampaignStepsInput, MessageTemplateUpdateWithoutCampaignStepsInput>, MessageTemplateUncheckedUpdateWithoutCampaignStepsInput>
  }

  export type MessageTemplateCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTemplatesInput
    connect?: UserWhereUniqueInput
  }

  export type AiSuggestionCreateNestedManyWithoutTemplateInput = {
    create?: XOR<AiSuggestionCreateWithoutTemplateInput, AiSuggestionUncheckedCreateWithoutTemplateInput> | AiSuggestionCreateWithoutTemplateInput[] | AiSuggestionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutTemplateInput | AiSuggestionCreateOrConnectWithoutTemplateInput[]
    createMany?: AiSuggestionCreateManyTemplateInputEnvelope
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
  }

  export type CampaignStepCreateNestedManyWithoutTemplateInput = {
    create?: XOR<CampaignStepCreateWithoutTemplateInput, CampaignStepUncheckedCreateWithoutTemplateInput> | CampaignStepCreateWithoutTemplateInput[] | CampaignStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutTemplateInput | CampaignStepCreateOrConnectWithoutTemplateInput[]
    createMany?: CampaignStepCreateManyTemplateInputEnvelope
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
  }

  export type AiSuggestionUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<AiSuggestionCreateWithoutTemplateInput, AiSuggestionUncheckedCreateWithoutTemplateInput> | AiSuggestionCreateWithoutTemplateInput[] | AiSuggestionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutTemplateInput | AiSuggestionCreateOrConnectWithoutTemplateInput[]
    createMany?: AiSuggestionCreateManyTemplateInputEnvelope
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
  }

  export type CampaignStepUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<CampaignStepCreateWithoutTemplateInput, CampaignStepUncheckedCreateWithoutTemplateInput> | CampaignStepCreateWithoutTemplateInput[] | CampaignStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutTemplateInput | CampaignStepCreateOrConnectWithoutTemplateInput[]
    createMany?: CampaignStepCreateManyTemplateInputEnvelope
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
  }

  export type EnumTemplateTypeFieldUpdateOperationsInput = {
    set?: $Enums.TemplateType
  }

  export type MessageTemplateUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutTemplatesNestedInput = {
    create?: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTemplatesInput
    upsert?: UserUpsertWithoutTemplatesInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTemplatesInput, UserUpdateWithoutTemplatesInput>, UserUncheckedUpdateWithoutTemplatesInput>
  }

  export type AiSuggestionUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<AiSuggestionCreateWithoutTemplateInput, AiSuggestionUncheckedCreateWithoutTemplateInput> | AiSuggestionCreateWithoutTemplateInput[] | AiSuggestionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutTemplateInput | AiSuggestionCreateOrConnectWithoutTemplateInput[]
    upsert?: AiSuggestionUpsertWithWhereUniqueWithoutTemplateInput | AiSuggestionUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: AiSuggestionCreateManyTemplateInputEnvelope
    set?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    disconnect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    delete?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    update?: AiSuggestionUpdateWithWhereUniqueWithoutTemplateInput | AiSuggestionUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: AiSuggestionUpdateManyWithWhereWithoutTemplateInput | AiSuggestionUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: AiSuggestionScalarWhereInput | AiSuggestionScalarWhereInput[]
  }

  export type CampaignStepUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<CampaignStepCreateWithoutTemplateInput, CampaignStepUncheckedCreateWithoutTemplateInput> | CampaignStepCreateWithoutTemplateInput[] | CampaignStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutTemplateInput | CampaignStepCreateOrConnectWithoutTemplateInput[]
    upsert?: CampaignStepUpsertWithWhereUniqueWithoutTemplateInput | CampaignStepUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: CampaignStepCreateManyTemplateInputEnvelope
    set?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    disconnect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    delete?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    update?: CampaignStepUpdateWithWhereUniqueWithoutTemplateInput | CampaignStepUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: CampaignStepUpdateManyWithWhereWithoutTemplateInput | CampaignStepUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: CampaignStepScalarWhereInput | CampaignStepScalarWhereInput[]
  }

  export type AiSuggestionUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<AiSuggestionCreateWithoutTemplateInput, AiSuggestionUncheckedCreateWithoutTemplateInput> | AiSuggestionCreateWithoutTemplateInput[] | AiSuggestionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: AiSuggestionCreateOrConnectWithoutTemplateInput | AiSuggestionCreateOrConnectWithoutTemplateInput[]
    upsert?: AiSuggestionUpsertWithWhereUniqueWithoutTemplateInput | AiSuggestionUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: AiSuggestionCreateManyTemplateInputEnvelope
    set?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    disconnect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    delete?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    connect?: AiSuggestionWhereUniqueInput | AiSuggestionWhereUniqueInput[]
    update?: AiSuggestionUpdateWithWhereUniqueWithoutTemplateInput | AiSuggestionUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: AiSuggestionUpdateManyWithWhereWithoutTemplateInput | AiSuggestionUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: AiSuggestionScalarWhereInput | AiSuggestionScalarWhereInput[]
  }

  export type CampaignStepUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<CampaignStepCreateWithoutTemplateInput, CampaignStepUncheckedCreateWithoutTemplateInput> | CampaignStepCreateWithoutTemplateInput[] | CampaignStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CampaignStepCreateOrConnectWithoutTemplateInput | CampaignStepCreateOrConnectWithoutTemplateInput[]
    upsert?: CampaignStepUpsertWithWhereUniqueWithoutTemplateInput | CampaignStepUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: CampaignStepCreateManyTemplateInputEnvelope
    set?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    disconnect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    delete?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    connect?: CampaignStepWhereUniqueInput | CampaignStepWhereUniqueInput[]
    update?: CampaignStepUpdateWithWhereUniqueWithoutTemplateInput | CampaignStepUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: CampaignStepUpdateManyWithWhereWithoutTemplateInput | CampaignStepUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: CampaignStepScalarWhereInput | CampaignStepScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutTasksInput = {
    create?: XOR<LeadCreateWithoutTasksInput, LeadUncheckedCreateWithoutTasksInput>
    connectOrCreate?: LeadCreateOrConnectWithoutTasksInput
    connect?: LeadWhereUniqueInput
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type LeadUpdateOneWithoutTasksNestedInput = {
    create?: XOR<LeadCreateWithoutTasksInput, LeadUncheckedCreateWithoutTasksInput>
    connectOrCreate?: LeadCreateOrConnectWithoutTasksInput
    upsert?: LeadUpsertWithoutTasksInput
    disconnect?: boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutTasksInput, LeadUpdateWithoutTasksInput>, LeadUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type EnumExportTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExportType
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedEnumLeadStageFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStage | EnumLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStageFilter<$PrismaModel> | $Enums.LeadStage
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumLeadStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStage | EnumLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStage[] | ListEnumLeadStageFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStageWithAggregatesFilter<$PrismaModel> | $Enums.LeadStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadStageFilter<$PrismaModel>
    _max?: NestedEnumLeadStageFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumConversationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeFilter<$PrismaModel> | $Enums.ConversationType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationTypeFilter<$PrismaModel>
    _max?: NestedEnumConversationTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumSuggestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SuggestionStatus | EnumSuggestionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuggestionStatusFilter<$PrismaModel> | $Enums.SuggestionStatus
  }

  export type NestedEnumSuggestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SuggestionStatus | EnumSuggestionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuggestionStatus[] | ListEnumSuggestionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuggestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SuggestionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSuggestionStatusFilter<$PrismaModel>
    _max?: NestedEnumSuggestionStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStepTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeFilter<$PrismaModel> | $Enums.StepType
  }

  export type NestedEnumStepTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeWithAggregatesFilter<$PrismaModel> | $Enums.StepType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStepTypeFilter<$PrismaModel>
    _max?: NestedEnumStepTypeFilter<$PrismaModel>
  }

  export type NestedEnumTemplateTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateType | EnumTemplateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateTypeFilter<$PrismaModel> | $Enums.TemplateType
  }

  export type NestedEnumTemplateTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateType | EnumTemplateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateType[] | ListEnumTemplateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateTypeWithAggregatesFilter<$PrismaModel> | $Enums.TemplateType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTemplateTypeFilter<$PrismaModel>
    _max?: NestedEnumTemplateTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumExportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportType | EnumExportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExportTypeFilter<$PrismaModel> | $Enums.ExportType
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumExportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportType | EnumExportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportType[] | ListEnumExportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExportTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExportTypeFilter<$PrismaModel>
    _max?: NestedEnumExportTypeFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type LeadCreateWithoutUserInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign?: CampaignCreateNestedOneWithoutLeadsInput
    conversations?: ConversationCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionCreateNestedManyWithoutLeadInput
    tasks?: TaskCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutLeadInput
    tasks?: TaskUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutUserInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput>
  }

  export type LeadCreateManyUserInputEnvelope = {
    data: LeadCreateManyUserInput | LeadCreateManyUserInput[]
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    relatedId?: string | null
    relatedType?: string | null
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    relatedId?: string | null
    relatedType?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
  }

  export type CampaignCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: CampaignStepCreateNestedManyWithoutCampaignInput
    leads?: LeadCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: CampaignStepUncheckedCreateNestedManyWithoutCampaignInput
    leads?: LeadUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutUserInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutUserInput, CampaignUncheckedCreateWithoutUserInput>
  }

  export type CampaignCreateManyUserInputEnvelope = {
    data: CampaignCreateManyUserInput | CampaignCreateManyUserInput[]
  }

  export type MessageTemplateCreateWithoutUserInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    suggestions?: AiSuggestionCreateNestedManyWithoutTemplateInput
    campaignSteps?: CampaignStepCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutTemplateInput
    campaignSteps?: CampaignStepUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateCreateOrConnectWithoutUserInput = {
    where: MessageTemplateWhereUniqueInput
    create: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput>
  }

  export type MessageTemplateCreateManyUserInputEnvelope = {
    data: MessageTemplateCreateManyUserInput | MessageTemplateCreateManyUserInput[]
  }

  export type LeadUpsertWithWhereUniqueWithoutUserInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutUserInput, LeadUncheckedUpdateWithoutUserInput>
    create: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutUserInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutUserInput, LeadUncheckedUpdateWithoutUserInput>
  }

  export type LeadUpdateManyWithWhereWithoutUserInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutUserInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    name?: StringFilter<"Lead"> | string
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    company?: StringNullableFilter<"Lead"> | string | null
    position?: StringNullableFilter<"Lead"> | string | null
    notes?: StringNullableFilter<"Lead"> | string | null
    stage?: EnumLeadStageFilter<"Lead"> | $Enums.LeadStage
    tags?: StringNullableListFilter<"Lead">
    score?: IntNullableFilter<"Lead"> | number | null
    userId?: StringNullableFilter<"Lead"> | string | null
    campaignId?: StringNullableFilter<"Lead"> | string | null
    lastActivity?: DateTimeNullableFilter<"Lead"> | Date | string | null
    lastContactedDate?: DateTimeNullableFilter<"Lead"> | Date | string | null
    nextContactDate?: DateTimeNullableFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    relatedId?: StringNullableFilter<"Notification"> | string | null
    relatedType?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutUserInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutUserInput, CampaignUncheckedUpdateWithoutUserInput>
    create: XOR<CampaignCreateWithoutUserInput, CampaignUncheckedCreateWithoutUserInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutUserInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutUserInput, CampaignUncheckedUpdateWithoutUserInput>
  }

  export type CampaignUpdateManyWithWhereWithoutUserInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutUserInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    isActive?: BoolFilter<"Campaign"> | boolean
    userId?: StringNullableFilter<"Campaign"> | string | null
    stats?: JsonNullableFilter<"Campaign">
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }

  export type MessageTemplateUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageTemplateWhereUniqueInput
    update: XOR<MessageTemplateUpdateWithoutUserInput, MessageTemplateUncheckedUpdateWithoutUserInput>
    create: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput>
  }

  export type MessageTemplateUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageTemplateWhereUniqueInput
    data: XOR<MessageTemplateUpdateWithoutUserInput, MessageTemplateUncheckedUpdateWithoutUserInput>
  }

  export type MessageTemplateUpdateManyWithWhereWithoutUserInput = {
    where: MessageTemplateScalarWhereInput
    data: XOR<MessageTemplateUpdateManyMutationInput, MessageTemplateUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageTemplateScalarWhereInput = {
    AND?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
    OR?: MessageTemplateScalarWhereInput[]
    NOT?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
    id?: StringFilter<"MessageTemplate"> | string
    name?: StringFilter<"MessageTemplate"> | string
    content?: StringFilter<"MessageTemplate"> | string
    subject?: StringNullableFilter<"MessageTemplate"> | string | null
    type?: EnumTemplateTypeFilter<"MessageTemplate"> | $Enums.TemplateType
    tags?: StringNullableListFilter<"MessageTemplate">
    userId?: StringNullableFilter<"MessageTemplate"> | string | null
    aiGenerated?: BoolFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"MessageTemplate"> | Date | string
  }

  export type UserCreateWithoutLeadsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutUserInput
    campaigns?: CampaignCreateNestedManyWithoutUserInput
    templates?: MessageTemplateCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLeadsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutUserInput
    templates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLeadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
  }

  export type CampaignCreateWithoutLeadsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: CampaignStepCreateNestedManyWithoutCampaignInput
    user?: UserCreateNestedOneWithoutCampaignsInput
  }

  export type CampaignUncheckedCreateWithoutLeadsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    userId?: string | null
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: CampaignStepUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutLeadsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutLeadsInput, CampaignUncheckedCreateWithoutLeadsInput>
  }

  export type ConversationCreateWithoutLeadInput = {
    id?: string
    type: $Enums.ConversationType
    content: string
    subject?: string | null
    attachment?: string | null
    sentiment?: string | null
    date?: Date | string
    followUp?: Date | string | null
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUncheckedCreateWithoutLeadInput = {
    id?: string
    type: $Enums.ConversationType
    content: string
    subject?: string | null
    attachment?: string | null
    sentiment?: string | null
    date?: Date | string
    followUp?: Date | string | null
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutLeadInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutLeadInput, ConversationUncheckedCreateWithoutLeadInput>
  }

  export type ConversationCreateManyLeadInputEnvelope = {
    data: ConversationCreateManyLeadInput | ConversationCreateManyLeadInput[]
  }

  export type AiSuggestionCreateWithoutLeadInput = {
    id?: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template?: MessageTemplateCreateNestedOneWithoutSuggestionsInput
  }

  export type AiSuggestionUncheckedCreateWithoutLeadInput = {
    id?: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSuggestionCreateOrConnectWithoutLeadInput = {
    where: AiSuggestionWhereUniqueInput
    create: XOR<AiSuggestionCreateWithoutLeadInput, AiSuggestionUncheckedCreateWithoutLeadInput>
  }

  export type AiSuggestionCreateManyLeadInputEnvelope = {
    data: AiSuggestionCreateManyLeadInput | AiSuggestionCreateManyLeadInput[]
  }

  export type TaskCreateWithoutLeadInput = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority?: number
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUncheckedCreateWithoutLeadInput = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority?: number
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutLeadInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLeadInput, TaskUncheckedCreateWithoutLeadInput>
  }

  export type TaskCreateManyLeadInputEnvelope = {
    data: TaskCreateManyLeadInput | TaskCreateManyLeadInput[]
  }

  export type UserUpsertWithoutLeadsInput = {
    update: XOR<UserUpdateWithoutLeadsInput, UserUncheckedUpdateWithoutLeadsInput>
    create: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLeadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLeadsInput, UserUncheckedUpdateWithoutLeadsInput>
  }

  export type UserUpdateWithoutLeadsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLeadsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignUpsertWithoutLeadsInput = {
    update: XOR<CampaignUpdateWithoutLeadsInput, CampaignUncheckedUpdateWithoutLeadsInput>
    create: XOR<CampaignCreateWithoutLeadsInput, CampaignUncheckedCreateWithoutLeadsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutLeadsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutLeadsInput, CampaignUncheckedUpdateWithoutLeadsInput>
  }

  export type CampaignUpdateWithoutLeadsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: CampaignStepUpdateManyWithoutCampaignNestedInput
    user?: UserUpdateOneWithoutCampaignsNestedInput
  }

  export type CampaignUncheckedUpdateWithoutLeadsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: CampaignStepUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type ConversationUpsertWithWhereUniqueWithoutLeadInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutLeadInput, ConversationUncheckedUpdateWithoutLeadInput>
    create: XOR<ConversationCreateWithoutLeadInput, ConversationUncheckedCreateWithoutLeadInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutLeadInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutLeadInput, ConversationUncheckedUpdateWithoutLeadInput>
  }

  export type ConversationUpdateManyWithWhereWithoutLeadInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutLeadInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    leadId?: StringFilter<"Conversation"> | string
    type?: EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType
    content?: StringFilter<"Conversation"> | string
    subject?: StringNullableFilter<"Conversation"> | string | null
    attachment?: StringNullableFilter<"Conversation"> | string | null
    sentiment?: StringNullableFilter<"Conversation"> | string | null
    date?: DateTimeFilter<"Conversation"> | Date | string
    followUp?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    hasFollowUp?: BoolFilter<"Conversation"> | boolean
    followUpDone?: BoolFilter<"Conversation"> | boolean
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type AiSuggestionUpsertWithWhereUniqueWithoutLeadInput = {
    where: AiSuggestionWhereUniqueInput
    update: XOR<AiSuggestionUpdateWithoutLeadInput, AiSuggestionUncheckedUpdateWithoutLeadInput>
    create: XOR<AiSuggestionCreateWithoutLeadInput, AiSuggestionUncheckedCreateWithoutLeadInput>
  }

  export type AiSuggestionUpdateWithWhereUniqueWithoutLeadInput = {
    where: AiSuggestionWhereUniqueInput
    data: XOR<AiSuggestionUpdateWithoutLeadInput, AiSuggestionUncheckedUpdateWithoutLeadInput>
  }

  export type AiSuggestionUpdateManyWithWhereWithoutLeadInput = {
    where: AiSuggestionScalarWhereInput
    data: XOR<AiSuggestionUpdateManyMutationInput, AiSuggestionUncheckedUpdateManyWithoutLeadInput>
  }

  export type AiSuggestionScalarWhereInput = {
    AND?: AiSuggestionScalarWhereInput | AiSuggestionScalarWhereInput[]
    OR?: AiSuggestionScalarWhereInput[]
    NOT?: AiSuggestionScalarWhereInput | AiSuggestionScalarWhereInput[]
    id?: StringFilter<"AiSuggestion"> | string
    leadId?: StringFilter<"AiSuggestion"> | string
    suggestion?: StringFilter<"AiSuggestion"> | string
    type?: StringFilter<"AiSuggestion"> | string
    status?: EnumSuggestionStatusFilter<"AiSuggestion"> | $Enums.SuggestionStatus
    priority?: IntFilter<"AiSuggestion"> | number
    done?: BoolFilter<"AiSuggestion"> | boolean
    isViewed?: BoolFilter<"AiSuggestion"> | boolean
    reasoning?: StringNullableFilter<"AiSuggestion"> | string | null
    templateId?: StringNullableFilter<"AiSuggestion"> | string | null
    createdAt?: DateTimeFilter<"AiSuggestion"> | Date | string
    updatedAt?: DateTimeFilter<"AiSuggestion"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutLeadInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutLeadInput, TaskUncheckedUpdateWithoutLeadInput>
    create: XOR<TaskCreateWithoutLeadInput, TaskUncheckedCreateWithoutLeadInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutLeadInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutLeadInput, TaskUncheckedUpdateWithoutLeadInput>
  }

  export type TaskUpdateManyWithWhereWithoutLeadInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutLeadInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: IntFilter<"Task"> | number
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    leadId?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type LeadCreateWithoutConversationsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutLeadsInput
    campaign?: CampaignCreateNestedOneWithoutLeadsInput
    suggestions?: AiSuggestionCreateNestedManyWithoutLeadInput
    tasks?: TaskCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutConversationsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutLeadInput
    tasks?: TaskUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutConversationsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutConversationsInput, LeadUncheckedCreateWithoutConversationsInput>
  }

  export type LeadUpsertWithoutConversationsInput = {
    update: XOR<LeadUpdateWithoutConversationsInput, LeadUncheckedUpdateWithoutConversationsInput>
    create: XOR<LeadCreateWithoutConversationsInput, LeadUncheckedCreateWithoutConversationsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutConversationsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutConversationsInput, LeadUncheckedUpdateWithoutConversationsInput>
  }

  export type LeadUpdateWithoutConversationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutLeadsNestedInput
    campaign?: CampaignUpdateOneWithoutLeadsNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutLeadNestedInput
    tasks?: TaskUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutConversationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutLeadNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutSuggestionsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutLeadsInput
    campaign?: CampaignCreateNestedOneWithoutLeadsInput
    conversations?: ConversationCreateNestedManyWithoutLeadInput
    tasks?: TaskCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutSuggestionsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutLeadInput
    tasks?: TaskUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutSuggestionsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutSuggestionsInput, LeadUncheckedCreateWithoutSuggestionsInput>
  }

  export type MessageTemplateCreateWithoutSuggestionsInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTemplatesInput
    campaignSteps?: CampaignStepCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateUncheckedCreateWithoutSuggestionsInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    userId?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignSteps?: CampaignStepUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateCreateOrConnectWithoutSuggestionsInput = {
    where: MessageTemplateWhereUniqueInput
    create: XOR<MessageTemplateCreateWithoutSuggestionsInput, MessageTemplateUncheckedCreateWithoutSuggestionsInput>
  }

  export type LeadUpsertWithoutSuggestionsInput = {
    update: XOR<LeadUpdateWithoutSuggestionsInput, LeadUncheckedUpdateWithoutSuggestionsInput>
    create: XOR<LeadCreateWithoutSuggestionsInput, LeadUncheckedCreateWithoutSuggestionsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutSuggestionsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutSuggestionsInput, LeadUncheckedUpdateWithoutSuggestionsInput>
  }

  export type LeadUpdateWithoutSuggestionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutLeadsNestedInput
    campaign?: CampaignUpdateOneWithoutLeadsNestedInput
    conversations?: ConversationUpdateManyWithoutLeadNestedInput
    tasks?: TaskUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutSuggestionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutLeadNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type MessageTemplateUpsertWithoutSuggestionsInput = {
    update: XOR<MessageTemplateUpdateWithoutSuggestionsInput, MessageTemplateUncheckedUpdateWithoutSuggestionsInput>
    create: XOR<MessageTemplateCreateWithoutSuggestionsInput, MessageTemplateUncheckedCreateWithoutSuggestionsInput>
    where?: MessageTemplateWhereInput
  }

  export type MessageTemplateUpdateToOneWithWhereWithoutSuggestionsInput = {
    where?: MessageTemplateWhereInput
    data: XOR<MessageTemplateUpdateWithoutSuggestionsInput, MessageTemplateUncheckedUpdateWithoutSuggestionsInput>
  }

  export type MessageTemplateUpdateWithoutSuggestionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTemplatesNestedInput
    campaignSteps?: CampaignStepUpdateManyWithoutTemplateNestedInput
  }

  export type MessageTemplateUncheckedUpdateWithoutSuggestionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignSteps?: CampaignStepUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type CampaignStepCreateWithoutCampaignInput = {
    id?: string
    type: $Enums.StepType
    content?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template?: MessageTemplateCreateNestedOneWithoutCampaignStepsInput
  }

  export type CampaignStepUncheckedCreateWithoutCampaignInput = {
    id?: string
    type: $Enums.StepType
    content?: string | null
    templateId?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignStepCreateOrConnectWithoutCampaignInput = {
    where: CampaignStepWhereUniqueInput
    create: XOR<CampaignStepCreateWithoutCampaignInput, CampaignStepUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignStepCreateManyCampaignInputEnvelope = {
    data: CampaignStepCreateManyCampaignInput | CampaignStepCreateManyCampaignInput[]
  }

  export type LeadCreateWithoutCampaignInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutLeadsInput
    conversations?: ConversationCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionCreateNestedManyWithoutLeadInput
    tasks?: TaskCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutCampaignInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutLeadInput
    tasks?: TaskUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutCampaignInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutCampaignInput, LeadUncheckedCreateWithoutCampaignInput>
  }

  export type LeadCreateManyCampaignInputEnvelope = {
    data: LeadCreateManyCampaignInput | LeadCreateManyCampaignInput[]
  }

  export type UserCreateWithoutCampaignsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    templates?: MessageTemplateCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCampaignsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    templates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCampaignsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
  }

  export type CampaignStepUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignStepWhereUniqueInput
    update: XOR<CampaignStepUpdateWithoutCampaignInput, CampaignStepUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignStepCreateWithoutCampaignInput, CampaignStepUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignStepUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignStepWhereUniqueInput
    data: XOR<CampaignStepUpdateWithoutCampaignInput, CampaignStepUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignStepUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignStepScalarWhereInput
    data: XOR<CampaignStepUpdateManyMutationInput, CampaignStepUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignStepScalarWhereInput = {
    AND?: CampaignStepScalarWhereInput | CampaignStepScalarWhereInput[]
    OR?: CampaignStepScalarWhereInput[]
    NOT?: CampaignStepScalarWhereInput | CampaignStepScalarWhereInput[]
    id?: StringFilter<"CampaignStep"> | string
    campaignId?: StringFilter<"CampaignStep"> | string
    type?: EnumStepTypeFilter<"CampaignStep"> | $Enums.StepType
    content?: StringNullableFilter<"CampaignStep"> | string | null
    templateId?: StringNullableFilter<"CampaignStep"> | string | null
    waitDays?: IntFilter<"CampaignStep"> | number
    order?: IntFilter<"CampaignStep"> | number
    conditions?: JsonNullableFilter<"CampaignStep">
    createdAt?: DateTimeFilter<"CampaignStep"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignStep"> | Date | string
  }

  export type LeadUpsertWithWhereUniqueWithoutCampaignInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutCampaignInput, LeadUncheckedUpdateWithoutCampaignInput>
    create: XOR<LeadCreateWithoutCampaignInput, LeadUncheckedCreateWithoutCampaignInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutCampaignInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutCampaignInput, LeadUncheckedUpdateWithoutCampaignInput>
  }

  export type LeadUpdateManyWithWhereWithoutCampaignInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutCampaignInput>
  }

  export type UserUpsertWithoutCampaignsInput = {
    update: XOR<UserUpdateWithoutCampaignsInput, UserUncheckedUpdateWithoutCampaignsInput>
    create: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCampaignsInput, UserUncheckedUpdateWithoutCampaignsInput>
  }

  export type UserUpdateWithoutCampaignsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCampaignsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignCreateWithoutStepsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutCampaignInput
    user?: UserCreateNestedOneWithoutCampaignsInput
  }

  export type CampaignUncheckedCreateWithoutStepsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    userId?: string | null
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutStepsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutStepsInput, CampaignUncheckedCreateWithoutStepsInput>
  }

  export type MessageTemplateCreateWithoutCampaignStepsInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTemplatesInput
    suggestions?: AiSuggestionCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateUncheckedCreateWithoutCampaignStepsInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    userId?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type MessageTemplateCreateOrConnectWithoutCampaignStepsInput = {
    where: MessageTemplateWhereUniqueInput
    create: XOR<MessageTemplateCreateWithoutCampaignStepsInput, MessageTemplateUncheckedCreateWithoutCampaignStepsInput>
  }

  export type CampaignUpsertWithoutStepsInput = {
    update: XOR<CampaignUpdateWithoutStepsInput, CampaignUncheckedUpdateWithoutStepsInput>
    create: XOR<CampaignCreateWithoutStepsInput, CampaignUncheckedCreateWithoutStepsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutStepsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutStepsInput, CampaignUncheckedUpdateWithoutStepsInput>
  }

  export type CampaignUpdateWithoutStepsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutCampaignNestedInput
    user?: UserUpdateOneWithoutCampaignsNestedInput
  }

  export type CampaignUncheckedUpdateWithoutStepsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type MessageTemplateUpsertWithoutCampaignStepsInput = {
    update: XOR<MessageTemplateUpdateWithoutCampaignStepsInput, MessageTemplateUncheckedUpdateWithoutCampaignStepsInput>
    create: XOR<MessageTemplateCreateWithoutCampaignStepsInput, MessageTemplateUncheckedCreateWithoutCampaignStepsInput>
    where?: MessageTemplateWhereInput
  }

  export type MessageTemplateUpdateToOneWithWhereWithoutCampaignStepsInput = {
    where?: MessageTemplateWhereInput
    data: XOR<MessageTemplateUpdateWithoutCampaignStepsInput, MessageTemplateUncheckedUpdateWithoutCampaignStepsInput>
  }

  export type MessageTemplateUpdateWithoutCampaignStepsInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTemplatesNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutTemplateNestedInput
  }

  export type MessageTemplateUncheckedUpdateWithoutCampaignStepsInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type UserCreateWithoutTemplatesInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    campaigns?: CampaignCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTemplatesInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTemplatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
  }

  export type AiSuggestionCreateWithoutTemplateInput = {
    id?: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutSuggestionsInput
  }

  export type AiSuggestionUncheckedCreateWithoutTemplateInput = {
    id?: string
    leadId: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSuggestionCreateOrConnectWithoutTemplateInput = {
    where: AiSuggestionWhereUniqueInput
    create: XOR<AiSuggestionCreateWithoutTemplateInput, AiSuggestionUncheckedCreateWithoutTemplateInput>
  }

  export type AiSuggestionCreateManyTemplateInputEnvelope = {
    data: AiSuggestionCreateManyTemplateInput | AiSuggestionCreateManyTemplateInput[]
  }

  export type CampaignStepCreateWithoutTemplateInput = {
    id?: string
    type: $Enums.StepType
    content?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutStepsInput
  }

  export type CampaignStepUncheckedCreateWithoutTemplateInput = {
    id?: string
    campaignId: string
    type: $Enums.StepType
    content?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignStepCreateOrConnectWithoutTemplateInput = {
    where: CampaignStepWhereUniqueInput
    create: XOR<CampaignStepCreateWithoutTemplateInput, CampaignStepUncheckedCreateWithoutTemplateInput>
  }

  export type CampaignStepCreateManyTemplateInputEnvelope = {
    data: CampaignStepCreateManyTemplateInput | CampaignStepCreateManyTemplateInput[]
  }

  export type UserUpsertWithoutTemplatesInput = {
    update: XOR<UserUpdateWithoutTemplatesInput, UserUncheckedUpdateWithoutTemplatesInput>
    create: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTemplatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTemplatesInput, UserUncheckedUpdateWithoutTemplatesInput>
  }

  export type UserUpdateWithoutTemplatesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTemplatesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AiSuggestionUpsertWithWhereUniqueWithoutTemplateInput = {
    where: AiSuggestionWhereUniqueInput
    update: XOR<AiSuggestionUpdateWithoutTemplateInput, AiSuggestionUncheckedUpdateWithoutTemplateInput>
    create: XOR<AiSuggestionCreateWithoutTemplateInput, AiSuggestionUncheckedCreateWithoutTemplateInput>
  }

  export type AiSuggestionUpdateWithWhereUniqueWithoutTemplateInput = {
    where: AiSuggestionWhereUniqueInput
    data: XOR<AiSuggestionUpdateWithoutTemplateInput, AiSuggestionUncheckedUpdateWithoutTemplateInput>
  }

  export type AiSuggestionUpdateManyWithWhereWithoutTemplateInput = {
    where: AiSuggestionScalarWhereInput
    data: XOR<AiSuggestionUpdateManyMutationInput, AiSuggestionUncheckedUpdateManyWithoutTemplateInput>
  }

  export type CampaignStepUpsertWithWhereUniqueWithoutTemplateInput = {
    where: CampaignStepWhereUniqueInput
    update: XOR<CampaignStepUpdateWithoutTemplateInput, CampaignStepUncheckedUpdateWithoutTemplateInput>
    create: XOR<CampaignStepCreateWithoutTemplateInput, CampaignStepUncheckedCreateWithoutTemplateInput>
  }

  export type CampaignStepUpdateWithWhereUniqueWithoutTemplateInput = {
    where: CampaignStepWhereUniqueInput
    data: XOR<CampaignStepUpdateWithoutTemplateInput, CampaignStepUncheckedUpdateWithoutTemplateInput>
  }

  export type CampaignStepUpdateManyWithWhereWithoutTemplateInput = {
    where: CampaignStepScalarWhereInput
    data: XOR<CampaignStepUpdateManyMutationInput, CampaignStepUncheckedUpdateManyWithoutTemplateInput>
  }

  export type LeadCreateWithoutTasksInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutLeadsInput
    campaign?: CampaignCreateNestedOneWithoutLeadsInput
    conversations?: ConversationCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutLeadInput
    suggestions?: AiSuggestionUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutTasksInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutTasksInput, LeadUncheckedCreateWithoutTasksInput>
  }

  export type LeadUpsertWithoutTasksInput = {
    update: XOR<LeadUpdateWithoutTasksInput, LeadUncheckedUpdateWithoutTasksInput>
    create: XOR<LeadCreateWithoutTasksInput, LeadUncheckedCreateWithoutTasksInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutTasksInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutTasksInput, LeadUncheckedUpdateWithoutTasksInput>
  }

  export type LeadUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutLeadsNestedInput
    campaign?: CampaignUpdateOneWithoutLeadsNestedInput
    conversations?: ConversationUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutUserInput
    campaigns?: CampaignCreateNestedManyWithoutUserInput
    templates?: MessageTemplateCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    preferences?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutUserInput
    templates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutUserNestedInput
    templates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LeadCreateManyUserInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    campaignId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    relatedId?: string | null
    relatedType?: string | null
    createdAt?: Date | string
  }

  export type CampaignCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    stats?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateCreateManyUserInput = {
    id?: string
    name: string
    content: string
    subject?: string | null
    type: $Enums.TemplateType
    tags?: MessageTemplateCreatetagsInput | string[]
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneWithoutLeadsNestedInput
    conversations?: ConversationUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutLeadNestedInput
    tasks?: TaskUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutLeadNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    relatedId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: CampaignStepUpdateManyWithoutCampaignNestedInput
    leads?: LeadUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: CampaignStepUncheckedUpdateManyWithoutCampaignNestedInput
    leads?: LeadUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stats?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: AiSuggestionUpdateManyWithoutTemplateNestedInput
    campaignSteps?: CampaignStepUpdateManyWithoutTemplateNestedInput
  }

  export type MessageTemplateUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutTemplateNestedInput
    campaignSteps?: CampaignStepUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type MessageTemplateUncheckedUpdateManyWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTemplateTypeFieldUpdateOperationsInput | $Enums.TemplateType
    tags?: MessageTemplateUpdatetagsInput | string[]
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyLeadInput = {
    id?: string
    type: $Enums.ConversationType
    content: string
    subject?: string | null
    attachment?: string | null
    sentiment?: string | null
    date?: Date | string
    followUp?: Date | string | null
    hasFollowUp?: boolean
    followUpDone?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSuggestionCreateManyLeadInput = {
    id?: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyLeadInput = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority?: number
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateWithoutLeadInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateWithoutLeadInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyWithoutLeadInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    content?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hasFollowUp?: BoolFieldUpdateOperationsInput | boolean
    followUpDone?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionUpdateWithoutLeadInput = {
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: MessageTemplateUpdateOneWithoutSuggestionsNestedInput
  }

  export type AiSuggestionUncheckedUpdateWithoutLeadInput = {
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionUncheckedUpdateManyWithoutLeadInput = {
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepCreateManyCampaignInput = {
    id?: string
    type: $Enums.StepType
    content?: string | null
    templateId?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadCreateManyCampaignInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    company?: string | null
    position?: string | null
    notes?: string | null
    stage?: $Enums.LeadStage
    tags?: LeadCreatetagsInput | string[]
    score?: number | null
    userId?: string | null
    lastActivity?: Date | string | null
    lastContactedDate?: Date | string | null
    nextContactDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignStepUpdateWithoutCampaignInput = {
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: MessageTemplateUpdateOneWithoutCampaignStepsNestedInput
  }

  export type CampaignStepUncheckedUpdateWithoutCampaignInput = {
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepUncheckedUpdateManyWithoutCampaignInput = {
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUpdateWithoutCampaignInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutLeadsNestedInput
    conversations?: ConversationUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUpdateManyWithoutLeadNestedInput
    tasks?: TaskUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutCampaignInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutLeadNestedInput
    suggestions?: AiSuggestionUncheckedUpdateManyWithoutLeadNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutCampaignInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumLeadStageFieldUpdateOperationsInput | $Enums.LeadStage
    tags?: LeadUpdatetagsInput | string[]
    score?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastContactedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextContactDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionCreateManyTemplateInput = {
    id?: string
    leadId: string
    suggestion: string
    type: string
    status?: $Enums.SuggestionStatus
    priority?: number
    done?: boolean
    isViewed?: boolean
    reasoning?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignStepCreateManyTemplateInput = {
    id?: string
    campaignId: string
    type: $Enums.StepType
    content?: string | null
    waitDays?: number
    order: number
    conditions?: InputJsonValue | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSuggestionUpdateWithoutTemplateInput = {
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutSuggestionsNestedInput
  }

  export type AiSuggestionUncheckedUpdateWithoutTemplateInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSuggestionUncheckedUpdateManyWithoutTemplateInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus
    priority?: IntFieldUpdateOperationsInput | number
    done?: BoolFieldUpdateOperationsInput | boolean
    isViewed?: BoolFieldUpdateOperationsInput | boolean
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepUpdateWithoutTemplateInput = {
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutStepsNestedInput
  }

  export type CampaignStepUncheckedUpdateWithoutTemplateInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignStepUncheckedUpdateManyWithoutTemplateInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    type?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    content?: NullableStringFieldUpdateOperationsInput | string | null
    waitDays?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    conditions?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}