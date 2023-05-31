type KeyboardEventHandler = (event: React.KeyboardEvent) => void
type Callback = (...args: string[]) => void

export const makeEnterAccessible = (
  cb: Callback,
  ...args: string[]
): KeyboardEventHandler => {
  const allowedKeys = ["Enter"]
  return (event: React.KeyboardEvent): void => {
    if (!allowedKeys.includes(event.key)) return
    cb(...args)
  }
}
