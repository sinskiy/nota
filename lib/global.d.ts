import { Dispatch, SetStateAction } from "react";

declare global {
  type SetState<T> = Dispatch<SetStateAction<T>>;
}
