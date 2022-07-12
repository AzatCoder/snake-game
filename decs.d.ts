interface ITimer {
  clear(): void;
  pause(): void;
  resume(): void;
}

interface IGroup extends ITimer {
  add(timer: ITimer): void;
}

declare module "pauseable" {
  export function setInterval(cb: () => void, ms: number): ITimer;
  export function setTimeout(cb: () => void, ms: number): ITimer;
  export function createGroup(): IGroup;
}
