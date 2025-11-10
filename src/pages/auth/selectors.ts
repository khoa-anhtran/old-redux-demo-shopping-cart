import { RootState } from "@/store/store";

export const selectToken = (state: RootState) => state.auth.token