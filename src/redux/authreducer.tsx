// authReducer.ts
export interface AuthState {
  accessToken: string | null;
  username: string | null;
  loading: boolean;
}

interface LoginAction {
  type: "LOGIN";
  payload: { access_token: string; username: string };
}

interface SignUpAction {
  type: "SIGNUP";
  payload: string;
}

interface LogoutAction {
  type: "LOGOUT";
}

type AuthActionTypes = LoginAction | LogoutAction | SignUpAction;

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  username: null,
  loading: true,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        accessToken: action.payload?.access_token,
        username: action.payload?.username,
      };
    case "SIGNUP":
      return {
        ...state,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
