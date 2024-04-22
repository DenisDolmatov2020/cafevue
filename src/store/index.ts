// В вашем файле vuex.store.ts
import { createStore } from 'vuex';

interface AuthState {
    isAuthenticated: boolean;
    authToken: string | null;
}

interface AuthMutations {
    setAuth(state: AuthState, token: string): void;
    clearAuth(state: AuthState): void;
}

interface AuthActions {
    login(context: AuthContext, token: string): void;
    logout(context: AuthContext): void;
}

interface AuthGetters {
    isAuthenticated(state: AuthState): boolean;
    authToken(state: AuthState): string | null;
}

interface AuthContext {
    commit<K extends keyof AuthMutations>(
        key: K,
        payload: Parameters<AuthMutations[K]>[1]
    ): ReturnType<AuthMutations[K]>;
}

export default createStore<AuthState>({
    state: (): AuthState => ({
        isAuthenticated: false,
        authToken: null,
    }),
    mutations: {
        setAuth(state, token) {
            state.isAuthenticated = true;
            state.authToken = token;
        },
        clearAuth(state) {
            state.isAuthenticated = false;
            state.authToken = null;
        },
    } as AuthMutations,
    actions: {
        login({ commit }, token) {
            commit('setAuth', token);
        },
        logout({ commit }) {
            commit('clearAuth');
        },
    } as AuthActions,
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        authToken: (state) => state.authToken,
    } as AuthGetters,
});
