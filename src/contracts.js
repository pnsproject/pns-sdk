/**
 * 多绕一个 js 文件, 不然 TypeScript 检查 JSON 的性能太慢了
 */

import { abi as Ens } from "../abi/ENS.json";
import { abi as Registrar } from "../abi/Registrar.json";
import { abi as Resolver } from "../abi/Resolver.json";

export let EnsAbi = Ens;
export let RegistrarAbi = Registrar;
export let ResolverAbi = Resolver;
