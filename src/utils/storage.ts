const USER_CODE_KEY = "insaroad_userCode";

export const storage = {
  getUserCode(): string | null {
    return localStorage.getItem(USER_CODE_KEY);
  },
  setUserCode(code: string) {
    localStorage.setItem(USER_CODE_KEY, code);
  },
  clearUserCode() {
    localStorage.removeItem(USER_CODE_KEY);
  },
};