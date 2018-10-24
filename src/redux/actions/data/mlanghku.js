import * as actions from '../actions';
import to from '../to';
import Parse from 'parse';
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID, process.env.PARSE_DOTNET_KEY);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER;

export function fetchUser(id, pw){
  return async function (dispatch){
    let err, res;
    const user = await Parse.User.logIn(id, pw);
    console.log(user);
    const timestamp = actions.timestamp();
    [err, res] = await to(Parse.Cloud.run('RenewUser', { timestamp: timestamp }));
    if(err){ console.log(err.message); return; }

    const data = JSON.parse(res);
    console.log(data);


  }
}
