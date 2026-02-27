import { List } from "../../types";
import { LocalGateWay } from "./localGateway";
import { RemoteGateWay } from "./remoteGateway";

const BACKED_HOST = import.meta.env.VITE_REMOTE_BACKEND_HOST;
const backendService = BACKED_HOST
  ? new RemoteGateWay(BACKED_HOST)
  : new LocalGateWay();

export async function getLists(): Promise<List[]> {
  return await backendService.getLists();
}

export async function addList(list: List): Promise<List> {
  return await backendService.addList(list);
}

export async function deleteList(listId: string): Promise<void> {
  await backendService.deleteList(listId);
}

export async function updateList(list: List): Promise<void> {
  await backendService.updateList(list);
}

export async function loginUser(user: {
  userName: string;
  password: string;
}): Promise<any> {
  return await backendService.loginUser(user);
}

export async function signupUser(user: {
  userName: string;
  password: string;
}): Promise<any> {
  return await backendService.signupUser(user);
}
