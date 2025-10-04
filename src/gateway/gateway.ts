import { List } from "../../types";
import { LocalGateWay } from "./localGateway";

// const backendMode = process.env.BACKEND;
// const backendService = backendMode === 'remote' ? new RemoteGateWay() : new LocalGateWay();
const backendService = new LocalGateWay();

export async function getLists(): Promise<Array<List>> {
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
