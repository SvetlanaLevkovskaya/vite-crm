export const truncatedMessage = (message: string | undefined) => {
  if (message && message.length > 99) {
    return `${message.slice(0, 99)}...`
  }
  return message
}
