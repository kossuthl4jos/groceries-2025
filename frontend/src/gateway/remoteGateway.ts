// const BACKED_HOST = process.env.REMOTE_BACKEND_HOST;

// export class RemoteGateWay {
//   getLists = async () => {
//     const res = await fetch(BACKED_HOST + '/list', {
//       method: 'GET',
//     });

//     if (res.status === 500 || !res.ok) {
//       console.error('could not fetch lists');
//     }

//     const json = await res.json();

//     return json;
//   };

//   addList = async (list: List) => {
//     const { id, ...listToSubmit } = list;

//     const res = await fetch(BACKED_HOST + '/list', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(listToSubmit),
//     });

//     if (res.status === 500 || !res.ok) {
//       console.error('could not save new list');
//     } else {
//       const json = await res.json();
//       return json;
//     }
//   };

//   deleteList = async (listId: string) => {
//     const res = await fetch(BACKED_HOST + `/list/${listId}`, {
//       method: 'DELETE',
//     });

//     if (res.status === 500 || !res.ok) {
//       console.error('could not delete slist');
//     }
//   };

//   updateList = async (list: List) => {
//     const { id, ...listToSubmit } = list;

//     const res = await fetch(BACKED_HOST + `/list/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(listToSubmit),
//     });

//     if (res.status === 500 || !res.ok) {
//       console.error('could not update list');
//     }
//   };

//   loginUser = async (user: { userName: string; password: string }) => {
//     const res = await fetch(BACKED_HOST + `/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });

//     if (res.status === 500 || !res.ok) {
//       console.error('Could not sign up user');
//     }
//     const json = await res.json();

//     return json;
//   };

//   signupUser = async (user: { userName: string; password: string }) => {
//     const res = await fetch(BACKED_HOST + `/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });

//     if (res.status === 500 || !res.ok) {
//       console.error('Could not sign up user');
//     }
//     const json = await res.json();

//     return json;
//   };
// }
